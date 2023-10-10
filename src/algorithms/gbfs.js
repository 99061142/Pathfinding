import Algorithm from "./algorithm";

class Gbfs extends Algorithm {
    constructor(props) {
        super(props);
        this._path = {
            [props.startPos]: null
        };
        this._notMovablePositions = [props.startPos.join(',')];
        this._queue = [props.startPos];
    }

    get route() {
        // Loop from the position that found the end position to the position that has the start position as parent
        let parent = this._path[this.props.endPos];
        let path = [];
        while (!this.isStartPos(parent)) {
            path.push(parent);
            parent = this._path[parent];
        }
        return path
    }

    canMove(pos) {
        // If the cell isn't in bounds, not possible to reach (wall), or already queued / visited, return false, else true
        if (
            !this.cellInBounds(pos) || 
            this.cellWeight(pos) === Infinity ||
            this._notMovablePositions.includes(pos.join(','))
        ) {
            return false
        }
        return true
    }

    h(pos) {
        // ~ Cost to go to the end position from pos
        const [ROW, COL] = pos;
        const [END_ROW, END_COL] = this.props.endPos;
        const COL_COST = Math.abs(COL - END_COL);
        const ROW_COST = Math.abs(ROW - END_ROW);
        const COST = 1 * (COL_COST + ROW_COST);
        return COST + this.cellWeight(pos)
    }

    get head() {
        // Get the position in the queue with the lowest H cost
        let lowestFCost = Infinity;
        let pos = null;
        for(const queuedPos of this._queue) {
            const QUEUED_POS_F_COST = this.h(queuedPos);
            if(
                QUEUED_POS_F_COST < lowestFCost
            ) {
                lowestFCost = QUEUED_POS_F_COST;
                pos = queuedPos;
            }
        }
        return pos
    }

    queuedIndex(pos) {
        // Get the index of the position in the queue, otherwise return an error
        const [ROW, COL] = pos;
        for (const [i, pos] of this._queue.entries()) {
            const [QUEUED_ROW, QUEUED_COL] = pos
            if (ROW === QUEUED_ROW && COL === QUEUED_COL) {
                return i
            }
        }
        this.posOutOfBoundsError();
    }

    dequeue(pos) {
        const QUEUED_INDEX = this.queuedIndex(pos);
        this._queue.splice(QUEUED_INDEX, 1);
    }

    async run() {
        while (this._queue.length) {
            // Select the first position in the queue and dequeue it
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
                // If the position is not movable, continue
                if (!this.canMove(neighbour)) {
                    continue
                }

                // Save the neighbour parent
                this._path[neighbour] = CURRENT;

                // Queue the position, add the position to the "notMovablePositions" list
                // and set the element as 'queued' if the neighbour position isn't the end position
                this._queue.push(neighbour);
                if (!this.isEndPos(neighbour)) {
                    this._notMovablePositions.push(neighbour.join(','));
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

export default Gbfs;