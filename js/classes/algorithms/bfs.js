import { Algorithm } from './algorithm.js';

export class Bfs extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
        this._start = this.startPosition;
        this._path = {
            [this._start]: null
        }
    }

    get route() {
        let parent = this.endPosition;
        let path = [];

        while(parent) {
            path.push(parent);
            parent = this._path[parent];
        }
        path = path.slice(1, -1);
        return path;
    }

    async run() {
        // Positions to check
        let queue = [this._start];

        while(queue && queue.length) {
            // Select the first position in the queue and remove it from the queue
            let queuedPosition = queue.shift();

            for(let direction of this._directions) {
                // Get the neighbour position
                let position = this.position(queuedPosition, direction);

                // Skip if the position on the board is already checked or not empty
                if(!this.isMovable(position)) { continue; }

                // Push the position to the queueS
                queue.push(position);
                this.node(position).next();

                // add the position to the path
                this._path[position] = queuedPosition;
            }
            await this.node(queuedPosition).visited();

            // If the end position is found, return the path
            let nextQueuedPosition = queue[0];
            if(queue.length && this.node(nextQueuedPosition).isEnd()) {
                await this.showRoute(this.route);
                return
            }
            
        }
    }
}