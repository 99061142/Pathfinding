import Algorithm from "./algorithm";

class Dijkstra extends Algorithm {
    constructor(props) {
        super(props);
        this._directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // left bottom right up
        this._queue = [this.startPos()];
        this._path = {
            [this.startPos()]: {
                parent: null,
                distance: 0
            }
        };
    }

    queuedIndex(pos) {
        pos = pos.toString();

        // Get the index of the position in the queue if it exists, otherwise return -1
        for(let [i, queuedPos] of this._queue.entries()) {
            queuedPos = queuedPos.toString();
            if(queuedPos === pos) { return i; }
        }
        return -1;
    }

    dequeue(pos) {
        const INDEX = this.queuedIndex(pos);
        this._queue.splice(INDEX, 1);
    }

    get head() {
        // Get the position with the lowest distance
        let lowest = Infinity;
        let pos = null;
        for(let queuedPos of this._queue) {
            let distance = this._path[queuedPos].distance;
            if(distance < lowest) {
                lowest = distance;
                pos = queuedPos;
            }
        }
        return pos;
    }

    get route() {
        let parent = this.endPos();
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
            let queuedPos = this.head;
            this.dequeue(queuedPos);

            // If the position is the end position, return the path
            if(this.isEnd(queuedPos)) {
                await this.showRoute(this.route);
                return
            }

            for(let direction of this._directions) {
                let pos = this.position(queuedPos, direction);

                // If the position is not movable, skip
                if(!this.canMove(pos)) { continue; }

                // Get the total distance of the position to the start position
                let parentDistance = this._path[queuedPos].distance;
                let posWeight = this.cellWeight(pos);
                let distance = parentDistance + posWeight;

                // If the current distance is higher than the saved distance, continue
                if(this._path[pos] && distance >= this._path[pos].distance)  { continue }

                // Add to path
                if(this._path[pos] === undefined) {
                    this._path[pos] = {};

                    // Add the position to the queue
                    this._queue.push(pos);

                    if(!this.isEnd(pos)) {
                        this.setNext(pos);
                    }
                }
                this._path[pos].distance = distance;
                this._path[pos].parent = queuedPos;
            }
            // If it can't search any further, break. else, set cell to visited
            if(this.head == null) { return }

            if(!this.isEnd(this.head)) {
                await this.setVisited(this.head);
            }
        }
    }
}

export default Dijkstra;