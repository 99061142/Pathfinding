class Dfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor() {
        this.queue = [BOARD.startPosition];
        this.visited = [BOARD.startPosition];
        this.path = [];
    }    

    get head() {
        return this.queue[this.queue.length - 1]; // Last added position
    }

    positionVisited(position) {
        // Returns if the position was already visited
        for(let visitedPosition of this.visited) {
            if(String(visitedPosition) === String(position)) { return true; }
        }
        return false;
    }

    canMove(position) {
        const [ROW, COL] = position;
        
        // Check if the position can move to 1 of the optional directions
        for(let directionPosition of this.#directions) {
            const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const POSITION = [NEXT_ROW, NEXT_COL];   

            // If position is empty and not already visited
            if(BOARD.empty(POSITION) && !this.positionVisited(POSITION)) { return true; }     
        }
        return false
    }

    PathPositionIndex(currentPosition) {
        for(let [i, position] of this.path.entries()) {
            // Return the index of the current position inside the path list
            if(String(position) === String(currentPosition)){ return i; }
        }
    }

    async run() {        
        // If queue isn't empty
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.queue.pop(); // Position to move from

            for(let directionPosition of this.#directions) {
                const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
                const NEXT_ROW = ROW + DIRECTION_ROW;
                const NEXT_COL = COL + DIRECTION_COL;
                const POSITION = [NEXT_ROW, NEXT_COL];

                // If neighbour is empty and not visited
                if(BOARD.empty(POSITION) && !this.positionVisited(POSITION)) {            
                    if(!BOARD.isEndPosition(POSITION)){ 
                        BOARD.next(POSITION);
                        await BOARD.sleep(); 
                    }
                    this.queue.push(POSITION);    
                }
            }
            if(!this.head) { return; } // Path couldn't go further
            if(BOARD.isEndPosition(this.head)) { return this.path; } // End position was found

            BOARD.found(this.head);
            this.path.push(this.head)
            this.visited.push(this.head)

            // If the position can't move further
            if(!this.canMove(this.head)) {
                const REVERSED_PATH = [...this.path].reverse()

                // For every position inside the path
                for(let position of REVERSED_PATH){                         
                    if(this.canMove(position)) { break; } // If the position can move further

                    // Delete position out of the path list
                    const PATH_POSITION_INDEX = this.PathPositionIndex(position);
                    this.path.splice(PATH_POSITION_INDEX, 1);
                }
            }
        }
    }
}


async function pathDfs() {
    return new Dfs().run(); // Return the start to end path
}