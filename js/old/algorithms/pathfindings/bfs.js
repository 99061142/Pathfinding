export class Bfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor(board) {
        this.board = board;
        this.queue = [board.startPosition];
        this.path = {
            [board.startPosition]: null
        };
    }    

    get head() {
        return this.queue.at(0);
    }

    enqueue(position) {
        this.queue.push(position);
    }

    dequeue() {
        this.queue.shift();
    }

    setPath(position) {
        this.path[String(position)] = this.head;
    }

    isVisited(position) {
        return this.path.hasOwnProperty(String(position));
    }

    fastestPath() {
        let path = [];
        let parent = this.board.endPosition;

        while(parent) {
            path.push(parent);
            parent = this.path[String(parent)];
        }
        return path.slice(1, -1);
    }

    canMove(position) {
        return this.board.empty(position) && !this.isVisited(position);
    }

    async run() {
        while(this.queue && this.queue.length) {
            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(this.head, direction);

                if(!this.canMove(neighbour)) { continue; }  
                if(!this.board.isEndPosition(neighbour)) { await this.board.next(neighbour); }
                this.setPath(neighbour);
                this.enqueue(neighbour);
            }    
            this.dequeue();
            if(!this.head){ return; } // Path couldn't go further
            if(this.board.isEndPosition(this.head)) { return this.fastestPath(); }
            this.board.found(this.head);
            await this.board.sleep();
        }
    }
}