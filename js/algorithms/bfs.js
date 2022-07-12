export class Bfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor(board) {
        this.board = board;
        this.queue = [board.startPosition]; // Positions to move from
        this.path = {}; // Position of a node and the parent of it
    }    

    get head() {
        return this.queue[0]; // Least added position
    }

    enqueue(position) {
        this.queue.push(position);
    }

    dequeue() {
        return this.queue.shift();
    }

    visited(position) {
        return String(position) === String(this.board.startPosition) || this.path.hasOwnProperty(String(position));
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

    async run() {
        while(this.queue && this.queue.length) {
            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(this.head, direction);

                // If neighbour is empty and not visited
                if(this.board.empty(neighbour) && !this.visited(neighbour)) {    
                    if(!this.board.isEndPosition(neighbour)) { await this.board.next(neighbour); }
                    this.path[String(neighbour)] = this.head; // Add the position and the parent of the position
                    this.enqueue(neighbour);
                }    
            }    
            this.dequeue(); // Remove head from queue
            if(!this.head){ return; } // Path couldn't go further
            if(this.board.isEndPosition(this.head)) { return this.fastestPath(); }
            this.board.found(this.head);
            await this.board.sleep();
        }
    }
}