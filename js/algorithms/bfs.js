export class Bfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor(board) {
        this.queue = [board.startPosition]; // Positions to move from
        this.path = {}; // Position of a node and the parent of it
        this.board = board;
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
        return String(position) !== String(this.board.startPosition) && !this.path.hasOwnProperty(String(position));
    }

    fastestPath() {
        const PATH = [];
        let parent = this.board.endPosition;

        // Get the fastest path from the end to start position
        while(String(PATH[PATH.length - 1]) !== String(this.board.startPosition)) {    
            const POSITION = this.path[parent]; // Current position
            parent = this.path[POSITION]; // Parent position

            if(POSITION){ PATH.push(POSITION); }
            if(parent){ PATH.push(parent); }
        }
        return PATH.slice(0, -1); // Return the fastest path
    }

    async run() {
        // If queue isn't empty
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.dequeue(); // Position to move from

            // For every optional direction
            for(let [directionRow, directionCol] of this.#directions) {
                const NEXT_ROW = ROW + directionRow;
                const NEXT_COL = COL + directionCol;
                const POSITION = [NEXT_ROW, NEXT_COL];

                // If neighbour is empty and not visited
                if(this.board.empty(POSITION) && this.visited(POSITION)) {    
                    if(!this.board.isEndPosition(POSITION)) { await this.board.next(POSITION); }
                    this.path[String(POSITION)] = [ROW, COL]; // Add the position and the parent of the position
                    this.enqueue(POSITION);
                }    
            }    
            if(!this.head){ return; } // Path couldn't go further
            if(this.board.isEndPosition(this.head)) { return this.fastestPath(); }
            this.board.found(this.head);
        }
    }
}