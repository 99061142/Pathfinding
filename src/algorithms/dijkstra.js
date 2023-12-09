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
                await this.animateSearch();
                await this.animateRoute(this.route);
                return
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

                // Queue the position
                // and set the element as 'queued' if the neighbour position isn't the end position
                this._queue.push(neighbour);
                if (!this.isEndPos(neighbour)) {
                    // Push a list with the position and 'queued' to the animations list
                    // to show the user how the algorithm is working/
                    // The first list value is the position of the cell, and the second is the type what the cell gets
                    this.animations.push([
                        neighbour, 
                        "queued"
                    ]);
                }
            }

            if (!this.isStartPos(CURRENT)) {
                // Push a list with the position and 'visited' to the animations list 
                // to show the user how the algorithm is working
                // The first list value is the position of the cell, and the second is the type what the cell gets
                this.animations.push([
                    CURRENT,
                    "visited"
                ]);
            }
        }
        await this.animateSearch();
    }
}

export default Dijkstra;