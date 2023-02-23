import Algorithm from "./algorithm";

class AStar extends Algorithm {
    constructor(props) {
        super(props);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
        this._path = {
            [this.props.startPos]: {
                parent: null,
                g: 0,
                h: this.hCost(this.props.startPos, this.props.endPos),
            }
        };
        this._queue = [this.props.startPos];
    }

    fCost(pos) {
        // Total cost of the position
        let { g, h } = this._path[pos];
        const COST = g + h;
        return COST;
    }

    hCost(pos) {
        // Cost from the position to the end
        const [ROW, CELL] = pos;
        const [END_ROW, END_CELL] = this.props.endPos;

        let rowCost = Math.abs(ROW - END_ROW);
        let cellCost = Math.abs(CELL - END_CELL);

        // Set cost as current weight of the node
        let cost = this.cellWeight(pos) * 10;

        // Add 14 cost for each diagonal move and 10 cost for each horizontal or vertical move
        while(rowCost && cellCost) {
            rowCost--;
            cellCost--;
            cost += 14;
        }

        while(rowCost) {
            rowCost--;
            cost += 10;
        }

        while(cellCost) {
            cellCost--;
            cost += 10;
        }
        return cost;
    }

    gCost(pos) {
        // Cost from the start to the position
        const [ROW, CELL] = pos;
        const [START_ROW, START_CELL] = this.props.startPos;

        let rowCost = Math.abs(ROW - START_ROW);
        let colCost = Math.abs(CELL - START_CELL);

        // Set cost as current weight of the node
        let cost = this.cellWeight(pos) * 10;

        // Add 14 cost for each diagonal move and 10 cost for each horizontal or vertical move
        while(rowCost && colCost) {
            rowCost--;
            colCost--;
            cost += 14;
        }

        while(rowCost) {
            rowCost--;
            cost += 10;
        }

        while(colCost) {
            colCost--;
            cost += 10;
        }
        return cost;
    }

    get route() {
        let route = [];
        let pos = this.props.endPos;
        while(pos) {
            route.unshift(pos);
            pos = this._path[pos].parent;
        }
        // Return the route without the start/end position
        route.shift();
        route.pop();
        return route;
    }

    get head() {
        // Get the position with the lowest f cost, or if the f costs are equal, the lowest h cost
        let lowestFCost = Infinity;
        let lowestFCostPos = null;

        for(let pos of this._queue) {
            let fCost = this.fCost(pos);
            if(fCost < lowestFCost || fCost == lowestFCost && this.hCost(pos) < this.hCost(lowestFCostPos)) {
                lowestFCost = fCost;
                lowestFCostPos = pos;
            }
        }
        return lowestFCostPos;
    }

    dequeue(pos) {
        let index = this._queue.indexOf(pos);
        this._queue.splice(index, 1);
    }

    async run() {
        while(this._queue && this._queue.length) {
            let queuedPos = this.head;
            this.dequeue(queuedPos);

            for(let direction of this._directions) {
                let pos = this.position(queuedPos, direction);
        //        let stringifiedPosition = position.toString();

                // If the position is not movable, skip
                if(!this.canMove(pos)) { continue; }

                // Get the costs of the position
                let g = this.gCost(pos);
                let h = this.hCost(pos);
                let f = g + h;

                // If the position is already in the path, and the new cost is higher than the old cost, or if the position is visited, skip
                if(this._path[pos] && this._path[pos].f < f) { continue }

                // If the position is not in the path, add it
                if(this._path[pos] === undefined) {
                    this._path[pos] = {};

                    // Add the position to the queue and visited list
                    this._queue.push(pos);

                    if(!this.isEnd(pos)) {
                        this.setNext(pos);
                    }
                }
                // Add position costs to the path
                this._path[pos].parent = queuedPos;
                this._path[pos].g = g;
                this._path[pos].h = h;
            }

            // If it can't search any further, break
            if(this.head == null) { return }

            if(!this.isEnd(this.head)) {
                await this.setVisited(this.head);
            }

            // If the head is the end position, return the route
            if(this.isEnd(this.head)) {
                await this.showRoute(this.route);
                return;
            }
        }
    }
}











export default AStar;