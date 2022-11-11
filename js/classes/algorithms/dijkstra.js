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
        // Get queued position with the lowest distance
        let pathKeys = Object.keys(this._path);
        let lowestDistance = Infinity;
        let lowestDistancePosition = null;

        for(let position of pathKeys) {
            // Get the current distance of the position
            let distance = this._path[position].distance;

            // If the distance is lower than the lowest distance, and the position is in the queue, 
            // set the lowest distance to the current distance
            if(distance < lowestDistance && this.queuedIndex(position) !== -1) {
                lowestDistance = distance;
                lowestDistancePosition = position;
            }
        }
        // Return the position with the lowest distance
        lowestDistancePosition = lowestDistancePosition.split(',').map(Number);
        return lowestDistancePosition;
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

            // If the position is the end position, return the path
            if(this.node(queuedPosition).isEnd()) {
                await this.showRoute(this.route);
                return
            }

            for(let direction of this._directions) {
                let position = this.position(queuedPosition, direction);
                
                // Skip if the position on the board is already checked or not empty
                if(!this.isMovable(position)) { continue; }

                // Get the weight / total distance of the current position
                let node = this.node(position);
                let weight = node.currentWeight;
                let distance = this._path[queuedPosition].distance + weight;

                // Add the position to the path with the parent and distance
                this._path[position] = {
                    parent: queuedPosition,
                    distance: distance
                }
                // Push the position to the queue
                this._queue.push(position);
                this.node(position).next();
            }
            await this.node(queuedPosition).visited();

            // Remove the position from the queue
            this.dequeue(queuedPosition);
        }
    }
}