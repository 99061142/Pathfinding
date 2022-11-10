import { Algorithm } from './algorithm.js';

export class Bfs extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    }

    async run() {
        let start = this.startPosition;

        while(true) {
            let queue = [start];
            let queuedPosition = queue.shift();

            for(let direction of this._directions) {
                let position = this.position(queuedPosition, direction);

                if(this.isMovable(position)) {
                    queue.push(position);
                }
            }
            break;
        }
    }
}