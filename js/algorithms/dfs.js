class Dfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Left, down, right and up
    
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
            if(String(position) === String(visitedPosition)) { return true; }
        }
        return false;
    }

    PathPositionIndex(position) {
        // Returns the index of the position inside the path list
        for(let [i, pathPosition] of this.path.entries()) {
            if(String(pathPosition) === String(position)) { return i; } // If position is inside the path list
        }
    }

    isQueued(position) {        
        for(let queuedPosition of this.queue) {
            if(String(position) === String(queuedPosition)) { return true; } // If position is in the queue     
        }
        return false;
    }

    neighbourIsEnd(position) {
        const [ROW, COL] = position;

        // Check if 1 of the optional directions is the end position
        for(let directionPosition of this.#directions) {
            const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const POSITION = [NEXT_ROW, NEXT_COL];   
            
            if(String(POSITION) === String(BOARD.endPosition)){ return true; } // If a neighbour is the end position
        }    
        return false;        
    }

    isNeighbour(positionOne, positionTwo){
        const [ROW, COL] = positionOne;

        // Check if 1 of the optional directions is the end position
        for(let directionPosition of this.#directions) {
            const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const POSITION = [NEXT_ROW, NEXT_COL];   
            
            if(String(POSITION) === String(positionTwo)){ return true; } // If the second position is a neighbour of the first position
        }    
        return false;
    }

    deleteAfterEndPositions() {
        for(let [i, position] of this.path.entries()) {
            // If the neighbour is the end position
            if(this.neighbourIsEnd(position)) {                 
                this.path.splice(i + 1, this.path.length + 1); // Delete every position after the end position
                break; 
            }
        }
    }

    fastestPath() {
        this.deleteAfterEndPositions(); // Delete the positions that were found after the end position

        for(let position of this.path.reverse()) {
            // Index and position of the next position
            var nextIndex = this.PathPositionIndex(position) + 1;
            var next = this.path[nextIndex];

            // While the next position isn't a neighbour of the current position
            while(next && !this.isNeighbour(position, next)) {
                this.path.splice(nextIndex, 1); // Delete the next position

                // Index and position of the next position
                nextIndex = this.PathPositionIndex(position) + 1;
                next = this.path[nextIndex];
            }
        }
        return this.path;
    }

    canMove(position) {
        const [ROW, COL] = position;
        
        // Check if the position can move to 1 of the optional directions
        for(let directionPosition of this.#directions) {
            const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const POSITION = [NEXT_ROW, NEXT_COL];   

            // If the position isn't visited, isn't in the queue and is empty
            if(BOARD.empty(POSITION) && !this.positionVisited(POSITION) && !this.isQueued(POSITION)) { return true; }     
        }
        return false;
    }

    async run() {      
        // If queue isn't empty
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.queue.pop(); // Position to move from

            // For every optional direction
            for(let directionPosition of this.#directions) {
                const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
                const NEXT_ROW = ROW + DIRECTION_ROW;
                const NEXT_COL = COL + DIRECTION_COL;
                const POSITION = [NEXT_ROW, NEXT_COL];

                // If neighbour is empty and not visited and position wasn't queued already
                if(BOARD.empty(POSITION) && !this.positionVisited(POSITION)) { 
                    if(!this.isQueued(POSITION)){
                        if(!BOARD.isEndPosition(POSITION)) {
                            BOARD.next(POSITION);
                            await BOARD.sleep();
                        }
                        this.queue.push(POSITION);
                    }
                }
            }
            if(!this.head) { return; } // Path couldn't go further
            if(BOARD.isEndPosition(this.head)) { return this.fastestPath(); } // End position was found

            BOARD.found(this.head);
            this.visited.push(this.head); // Position is visited
            if(this.canMove(this.head)) { this.path.push(this.head); } // If the position can move further
            await BOARD.sleep();
        }
    }
}


async function pathDfs() {
    return new Dfs().run(); // Return the start to end path
}