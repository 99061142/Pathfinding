import { Algorithm } from './algorithm.js';

export class Dfs extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // left bottom right up
        this._start = this.startPosition;
    }

    async run() {
        // Positions to check
        let queue = [this._start];

        while(queue && queue.length) {
            let queuedPosition = queue.pop();

            for(let direction of this._directions) {
                let position = this.position(queuedPosition, direction);

                // Skip if the position on the board is already checked or not empty
                if(!this.isMovable(position)) { continue; }

                // Push the position to the queue
                queue.push(position);
                this.node(position).next();
            }
            await this.node(queuedPosition).visited();

            // If the end position is found, return the path
            let nextQueuedPosition = queue[queue.length - 1];
            if(queue.length && this.node(nextQueuedPosition).isEnd()) {
                return
            }
        }
    }
}