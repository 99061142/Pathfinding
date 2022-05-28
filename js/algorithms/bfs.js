class Bfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor() {
        this.queue = [BOARD.startPosition]; // Positions to move from
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

    fastestPath() {
        const PATH = [];
        let parent = BOARD.endPosition;

        // Get the fastest path from the end to start position
        while(String(PATH[PATH.length - 1]) !== String(BOARD.startPosition)) {    
            const POSITION = this.path[parent]; // Current position
            parent = this.path[POSITION]; // Parent position

            PATH.push(POSITION);
            PATH.push(parent);
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
                const POSITION_STR = String(POSITION);
            
                // If neighbour is empty and not visited
                if(BOARD.empty(POSITION) && POSITION_STR !== String(BOARD.startPosition) && !this.path.hasOwnProperty(POSITION_STR)) {    
                    if(!BOARD.isEndPosition(POSITION)) { await BOARD.next(POSITION); }
                    this.path[POSITION_STR] = [ROW, COL]; // Add the position and the parent of the position
                    this.enqueue(POSITION);
                }    
            }        
            if(!this.head){ return; } // Path couldn't go further
            if(BOARD.isEndPosition(this.head)) { return this.fastestPath(); } // Is end position
            BOARD.found(this.head);
        }
    }
}


async function pathBfs() {
    return new Bfs().run(); // Return the start to end path
}