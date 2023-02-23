import Algorithm from "./algorithm";

class Bfs extends Algorithm {
    constructor(props) {
        super(props);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
        this._path = {
            [this.props.startPos]: null
        };
    }

    get route() {
        let parent = this.props.endPos;
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
        let queue = [this.props.startPos];

        while(queue && queue.length) {
            // Select the first position in the queue and remove it from the queue
            let queuedPos = queue.shift();

            for(let direction of this._directions) {
                // Get the neighbour position
                let pos = this.position(queuedPos, direction);

                // Skip if the algorithm can't move to the position
                if(!this.canMove(pos)) { continue; }

                // Push the position to the queue
                queue.push(pos);

                if(!this.isEnd(pos)) {
                    this.setNext(pos);
                }

                // Add the position to the path
                this._path[pos] = queuedPos;
            }
            if(!this.isStart(queuedPos)) {
                await this.setVisited(queuedPos);
            }

            // If the end position is found, return the path
            let nextQueuedPosition = queue[0];
            if(queue.length && this.isEnd(nextQueuedPosition)) {
                await this.showRoute(this.route);
                return
            }
        }   
    }
}

export default Bfs;