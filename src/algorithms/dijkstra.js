import Algorithm from "./algorithm";

class Dijkstra extends Algorithm {
    constructor(props) {
        super(props);
        this._queue = [props.startPos];
        this._path = {
            [props.startPos]: {
                parent: null,
                distance: 0
            }
        };
    }

    queuedIndex(pos) {
        // Get the index of the position in the queue if it exists, otherwise return an error
        const [ROW, COL] = pos;
        for (const [i, pos] of this._queue.entries()) {
            const [QUEUED_ROW, QUEUED_COL] = pos
            if (ROW === QUEUED_ROW && COL === QUEUED_COL) {
                return i
            }
        }
        this.posOutOfBoundsError(pos);
    }

    dequeue(pos) {
        const INDEX = this.queuedIndex(pos);
        this._queue.splice(INDEX, 1);
    }

    get head() {
        // Get the position with the lowest distance to the start position
        let lowestDistance = Infinity;
        let pos = null;
        for (const queuedPos of this._queue) {
            const QUEUED_DISTANCE = this._path[queuedPos].distance;
            if (QUEUED_DISTANCE < lowestDistance) {
                lowestDistance = QUEUED_DISTANCE;
                pos = queuedPos;
            }
        }
        return pos
    }

    get route() {
        // Loop from the position that found the end position to the position that has the start position as parent
        let parent = this._path[this.props.endPos].parent;
        let route = [];
        while (!this.isStartPos(parent)) {
            route.push(parent);
            parent = this._path[parent].parent;
        }
        return route
    }

    canMove(pos) {
        // If the cell isn't in bounds or not possible to reach (wall), return false, else true
        if (
            !this.cellInBounds(pos) ||
            this.cellWeight(pos) === Infinity
        ) {
            return false
        }
        return true
    }
    

    async run() {
        while (this._queue.length) {
            // Get the queued position with the lowest distance from the start and dequeue it
            const CURRENT = this.head;
            this.dequeue(CURRENT);
            
            // If the current position is the end position, show and return the route
            if (this.isEndPos(CURRENT)) {
                const ROUTE = this.route;
                await this.showRoute(ROUTE);
                return ROUTE
            }

            const NEIGHBOURS = this.neighbours(CURRENT);
            for (const neighbour of NEIGHBOURS) {
                // If the position is not movable, skip
                if (!this.canMove(neighbour)) {
                    continue
                }

                // Get the total distance of the position to the start position
                // If the distance of the neighbour is equal or higher than the saved distance, continue
                const CURRENT_DISTANCE = this._path[CURRENT].distance;
                const NEIGHBOUR_DISTANCE = this.cellWeight(neighbour);
                const DISTANCE_TO_START = CURRENT_DISTANCE + NEIGHBOUR_DISTANCE;
                if (neighbour in this._path && DISTANCE_TO_START >= this._path[neighbour].distance) {
                    continue
                }
                
                // Save the neighbour parent and distance cost
                this._path[neighbour] = {
                    distance: DISTANCE_TO_START,
                    parent: CURRENT
                };

                // Queue the position and set the element as 'queued' if the neighbour position isn't the end position
                this._queue.push(neighbour);
                if (!this.isEndPos(neighbour)) {
                    this.setQueued(neighbour);
                }
            }

            // Set the element as 'visited' if the current position isn't the start position
            if (!this.isStartPos(CURRENT)) {
                await this.setVisited(CURRENT);
            }
        }
    }
}

export default Dijkstra;