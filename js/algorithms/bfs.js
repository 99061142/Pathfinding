class Bfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor() {
        this.queue = [BOARD.startPosition]; // Positions to move from
        this.visited = [BOARD.startPosition]; // ALl the positions that are visited
        this.path = []; // Route from start to end position
    }    

    get head() {
        return this.queue[0]; // Least added position
    }
    
    positionVisited(position) {
        // Returns if the position the path is on was already visited
        for(let visitedPosition of this.visited) {
            if(visitedPosition.toString() === position.toString()) {
                return true;
            }
        }
        return false;
    }

    async run() {
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.queue.shift(); // Position to move from

            for(let directionPosition of this.#directions) {
                const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
                const NEXT_ROW = ROW + DIRECTION_ROW;
                const NEXT_COL = COL + DIRECTION_COL;
                const POSITION = [NEXT_ROW, NEXT_COL];
            
                // If neighbour is empty and not visited
                if(BOARD.empty(POSITION) && !this.positionVisited(POSITION)) {    
                    if(!BOARD.isEndPosition(POSITION)) { 
                        BOARD.next(POSITION);
                        await BOARD.sleep();
                    }
                    this.queue.push(POSITION);
                    this.visited.push(POSITION);
                }
            }
            if(!this.head){ return; } // Path couldn't go further
            
            // Return the path if the end position was found on the position the path is on
            if(BOARD.isEndPosition(this.head)) {
                return this.path;
            }
            BOARD.found(this.head);
        }
    }
}


async function pathBfs() {
    return new Bfs().run(); // Return the start to end path
}