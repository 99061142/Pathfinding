import Algorithm from "./algorithm";

class Dfs extends Algorithm {
    constructor(props) {
        super(props);
        this._directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // left bottom right up
        this._path = {
            [this.startPos()]: null
        };
    }

    get route() {
        let parent = this.endPos();
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
        let queue = [this.startPos()];

        while(queue && queue.length) {
            let queuedPos = queue.pop();

            for(let direction of this._directions) {
                let pos = this.position(queuedPos, direction);

                // Skip if the algorithm can't move to the position
                if(!this.canMove(pos)) { continue; }

                // Push the position to the queue
                queue.push(pos);

                if(!this.isEnd(pos)) { 
                    this.setNext(pos);
                }

                // add the position to the path
                this._path[pos] = queuedPos;
            }
            if(!this.isStart(queuedPos)) {
                await this.setVisited(queuedPos);
            }

            // If the end position is found, return the path
            let nextQueuedPos = queue[queue.length - 1];
            if(queue.length && this.isEnd(nextQueuedPos)) {
                await this.showRoute(this.route);
                return
            }
        }
    }
}

export default Dfs;