import { Algorithm } from './algorithm.js';

export class Astar extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
        this._start = this.startPosition;
        this._path = {
            [this._start]: {
                parent: null,
                g: this.gCost(this._start),
                h: this.hCost(this._start, this.endPosition),
            }
        };
        this._queue = [this._start];
    }

    fCost(position) {
        // Total cost of the position
        let { g, h } = this._path[position];
        let cost = g + h;
        return cost;
    }

    hCost(position) {
        // Cost from the position to the end
        let [row, col] = position;
        let [endRow, endCol] = this.endPosition;

        let rowCost = Math.abs(row - endRow);
        let colCost = Math.abs(col - endCol);

        // Set cost as current weight of the node
        let cost = this.node(position).currentWeight * 10;


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

    gCost(position) {
        // Cost from the start to the position
        let [row, col] = position;
        let [startRow, startCol] = this._start;

        let rowCost = Math.abs(row - startRow);
        let colCost = Math.abs(col - startCol);

        // Set cost as current weight of the node
        let cost = this.node(position).currentWeight * 10;

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
        let position = this.endPosition;
        while(position) {
            route.unshift(position);
            position = this._path[position].parent;
        }
        return route;
    }

    get head() {
        // Get the position with the lowest f cost, or if the f costs are equal, the lowest h cost
        let lowestFCost = Infinity;
        let lowestFCostPosition = null;

        for(let position of this._queue) {
            let fCost = this.fCost(position);

            if(fCost < lowestFCost || fCost == lowestFCost && this.hCost(position) < this.hCost(lowestFCostPosition)) {
                lowestFCost = fCost;
                lowestFCostPosition = position;
            }
        }
        return lowestFCostPosition;
    }

    dequeue(position) {
        let index = this._queue.indexOf(position);
        this._queue.splice(index, 1);
    }


    async run() {
        while(this._queue && this._queue.length) {
            let queuedPosition = this.head
            this.dequeue(queuedPosition);

            for(let direction of this._directions) {
                let position = this.position(queuedPosition, direction);
                let stringifiedPosition = position.toString();

                // If the position is not movable, skip
                if(!this.isMovable(position)) { continue; }

                // Get the costs of the position
                let g = this.gCost(position);
                let h = this.hCost(position);
                let f = g + h;

                // If the position is already in the path, and the new cost is higher than the old cost, or if the position is visited, skip
                if(this._path[stringifiedPosition] && this._path[stringifiedPosition].f < f || this.visited.includes(stringifiedPosition)) { continue; }

                // If the position is not in the path, add it
                if(this._path[stringifiedPosition] === undefined) {
                    this._path[stringifiedPosition] = {};

                    // Add the position to the queue and visited list
                    this._queue.push(position);
                    this.node(position).next();
                    this.visited.push(stringifiedPosition);
                }
                // Add position costs to the path
                this._path[stringifiedPosition].parent = queuedPosition;
                this._path[stringifiedPosition].g = g;
                this._path[stringifiedPosition].h = h;
            }
            await this.node(this.head).visited();

            // If the head is the end position, return the route
            if(this.node(this.head).isEnd()) {
                await this.showRoute(this.route);
                return;
            }
        }
    }
}