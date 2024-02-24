import Algorithm from "./algorithm";

class AStar extends Algorithm {
    constructor(props) {
        super(props);
        this._queue = [props.startPos];
        this._path = {
            [props.startPos]: {
                parent: null,
                g: 0,
                f: this.h(props.startPos)
            }
        };
    }

    f(pos) {
        // ~ Cost from the start to end if it goes through the pos
        const COST = this.g(pos) + this.h(pos);
        return COST
    }

    g(pos) {
        // ~ Cost to go from start to pos
        const [ROW, COL] = pos;
        const [START_ROW, START_COL] = this.props.startPos;
        const COL_COST = Math.abs(COL - START_COL);
        const ROW_COST = Math.abs(ROW - START_ROW);
        const COST = 1 * (COL_COST + ROW_COST);
        return COST
    }

    h(pos) {
        // ~ Cost to go from pos to end
        const [ROW, COL] = pos;
        const [END_ROW, END_COL] = this.props.endPos;
        const COL_COST = Math.abs(COL - END_COL);
        const ROW_COST = Math.abs(ROW - END_ROW);
        const COST = 1 * (COL_COST + ROW_COST);
        return COST
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
        throw Error(`The pos ${pos} isn't queued.`);
    }

    dequeue(pos) {
        const QUEUED_INDEX = this.queuedIndex(pos);
        this._queue.splice(QUEUED_INDEX, 1);
    }

    get route() {
        // Loop from the position that found the end position to the position that has the start position as parent
        let route = [];
        let parent = this._path[this.props.endPos].parent;
        while(!this.isStartPos(parent)) {
            route.push(parent);
            parent = this._path[parent].parent;
        }
        return route
    }

    get head() {
        // Get the position in the queue with the lowest F cost or lowest H cost if the F costs are equal
        let lowestFCost = Infinity;
        let pos = null;
        for(const queuedPos of this._queue) {
            const QUEUED_POS_F_COST = this._path[queuedPos].f;
            if(
                QUEUED_POS_F_COST < lowestFCost ||
                (QUEUED_POS_F_COST === lowestFCost && this.h(pos) < this.h(queuedPos))
            ) {
                lowestFCost = QUEUED_POS_F_COST;
                pos = queuedPos;
            }
        }
        return pos
    }

    async run() {
        while(this._queue.length) {
            // Get the queued position with the lowest F cost and dequeue it
            const CURRENT = this.head;
            this.dequeue(CURRENT);

            // If the current position is the end position, show and return the route
            if(this.isEndPos(CURRENT)) {
                await this.animateSearch();
                await this.animateRoute(this.route);
                return
            }

            const NEIGHBOURS = this.neighbours(CURRENT);
            for(let neighbour of NEIGHBOURS) {
                // Get the tentative G score based on the saved G cost of the current position (parent of neighbour) + cell cost
                const TENTATIVE_G_SCORE = this._path[CURRENT].g + this.cellWeight(neighbour);
                
                // If the neighbour was already searched, and the saved G cost is higher than the tentative G cost, continue
                if(neighbour in this._path && this._path[neighbour].g <= TENTATIVE_G_SCORE) {
                    continue 
                }

                // Save the neighbour costs
                this._path[neighbour] = {
                    parent: CURRENT,
                    g: TENTATIVE_G_SCORE,
                    f: TENTATIVE_G_SCORE + this.h(neighbour)
                };

                // If the neighbour is in the queue, continue
                if(neighbour in this._queue) {
                    continue
                }

                // Queue the position
                // and set the element as 'queued' if the neighbour position isn't the end position
                this._queue.push(neighbour)

                if(!this.isEndPos(neighbour)) {
                    // Push a list with the position and type to the animations list to show the user how the algorithm is working.
                    // The first list value is the position of the cell, and the second is the type what the cell gets
                    this.animations.push([
                        neighbour,
                        "queued"
                    ]);
                }
            }

            if(!this.isStartPos(CURRENT)) {
                // Push a list with the position and type to the animations list to show the user how the algorithm is working.
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

export default AStar;