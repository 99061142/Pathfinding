import { Algorithm } from './algorithm.js';

export class Dijkstra extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // left bottom right up
        this._start = this.startPosition;
        this._queue = [this._start];
        this._path = {
            [this._start]: {
                parent: null,
                distance: 0
            }
        }
    }

    queuedIndex(position) {
        position = position.toString();

        // Get the index of the position in the queue if it exists, otherwise return -1
        for(let [i, queuedPosition] of this._queue.entries()) {
            queuedPosition = queuedPosition.toString();
            position = position.toString();
            if(queuedPosition === position) { return i; }
        }
        return -1;
    }

    dequeue(position) {
        // Remove the position from the queue
        let index = this.queuedIndex(position);
        this._queue.splice(index, 1);
    }

    get head() {
        // Get the position with the lowest distance
        let lowest = Infinity;
        let position = null;
        for(let queuedPosition of this._queue) {
            let distance = this._path[queuedPosition].distance;
            if(distance < lowest) {
                lowest = distance;
                position = queuedPosition;
            }
        }
        return position;
    }

    get route() {
        let parent = this.endPosition;
        let path = [];

        while(parent) {
            path.push(parent);
            parent = this._path[parent].parent;
        }
        path = path.slice(1, -1);
        return path;
    }

    async run() {
        while(this._queue && this._queue.length) {
            let queuedPosition = this.head;
            this.dequeue(queuedPosition);

            // If the position is the end position, return the path
            if(this.node(queuedPosition).isEnd()) {
                await this.showRoute(this.route);
                return
            }

            for(let direction of this._directions) {
                let position = this.position(queuedPosition, direction);
                let stringifiedPosition = position.toString();

                // If the position is not movable, skip
                if(!this.isMovable(position)) { continue; }

                // Get the total distance of the position to the start position
                let parentDistance = this._path[queuedPosition].distance;
                let positionWeight = this.node(position).currentWeight;
                let distance = parentDistance + positionWeight;

                // If the neighbour is not movable, or has a lower distance saved then the current distance, skip
                if(this._path[stringifiedPosition] && distance >= this._path[stringifiedPosition].distance || this.visited.includes(stringifiedPosition)) { continue; }  

                // Add to path
                if(this._path[stringifiedPosition] == undefined) {
                    this._path[stringifiedPosition] = {};

                    // Add the position to the queue and visited list
                    this._queue.push(position);
                    this.node(position).next();
                    this.visited.push(stringifiedPosition);
                }
                this._path[stringifiedPosition].distance = distance;
                this._path[stringifiedPosition].parent = queuedPosition;
            }
            // If it can't search any further, break
            if(this.head == null) { return }

            await this.node(this.head).visited();
        }
    }
}