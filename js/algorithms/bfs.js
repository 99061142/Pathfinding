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
        const PATH = [];
        let parent = this.board.endPosition;

        while(parent) {
            PATH.push(parent);
            parent = this.path[String(parent)];
        }
        return PATH.slice(1, -1);
    }

    async run() {
        while(this.queue && this.queue.length) {
            for(let direction of this.#directions) {
                const NEIGHBOUR_POSITION = neighbourPosition(this.head, direction);

                // If neighbour is empty and not visited
                if(this.board.empty(NEIGHBOUR_POSITION) && !this.visited(NEIGHBOUR_POSITION)) {    
                    if(!this.board.isEndPosition(NEIGHBOUR_POSITION)) { await this.board.next(NEIGHBOUR_POSITION); }
                    this.path[String(NEIGHBOUR_POSITION)] = this.head; // Add the position and the parent of the position
                    this.enqueue(NEIGHBOUR_POSITION);
                }    
            }    
            this.dequeue(); // Remove head from queue
            if(!this.head){ return; } // Path couldn't go further
            if(this.board.isEndPosition(this.head)) { return this.fastestPath(); }
            this.board.found(this.head);
        }
    }
}