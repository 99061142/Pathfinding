import { Algorithm } from './algorithm.js';

export class Bfs extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
        this._start = this.startPosition;
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
                await this.next(position);
            }

            // If the end position is found, return the path
            if(queue.length && this.isEnd(queue.at(0))) { 
                return
            }
            await this.visited(queuedPosition);
        }
    }
}