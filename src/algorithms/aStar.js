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
        const { g, h } = this._path[pos];
        const COST = g + h;
        return COST;
    }

    hCost(pos) {
        // Cost from the position to the end
        const [ROW, CELL] = pos;
        const [END_ROW, END_CELL] = this.props.endPos;
        let rowCost = Math.abs(ROW - END_ROW);
        let cellCost = Math.abs(CELL - END_CELL);
        let cost = this.cellWeight(pos) * 10; // Set cost as current weight of the node

        // Add 14 cost for each diagonal move and 10 cost for each horizontal or vertical move, and return the total cost
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
        let cellCost = Math.abs(CELL - START_CELL);
        let cost = this.cellWeight(pos) * 10; // Set cost as current weight of the node

        // Add 14 cost for each diagonal move and 10 cost for each horizontal or vertical move, adn return the total cost
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
        const INDEX = this._queue.indexOf(pos);
        this._queue.splice(INDEX, 1);
    }

    async run() {
        while(this._queue && this._queue.length) {
            const QUEUED_POS = this.head;
            this.dequeue(QUEUED_POS);

            for(const DIRECTION of this._directions) {
                const POS = this.position(QUEUED_POS, DIRECTION);

                // If the position is not movable, skip
                if(!this.canMove(POS)) { continue; }

                // Get the costs of the position
                const G = this.gCost(POS);
                const H = this.hCost(POS);
                const F = G + H;

                // If the position is already in the path, and the new cost is higher than the old cost, or if the position is visited, skip
                if(this._path[POS] && this._path[POS].f < F) { continue }

                // If the position is not in the path, add it
                if(this._path[POS] === undefined) {
                    this._path[POS] = {};

                    // Add the position to the queue and visited list
                    this._queue.push(POS);

                    if(!this.isEnd(POS)) {
                        this.setNext(POS);
                    }
                }
                // Add position costs to the path
                this._path[POS].parent = QUEUED_POS;
                this._path[POS].g = G;
                this._path[POS].h = H;
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