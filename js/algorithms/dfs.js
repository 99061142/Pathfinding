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

    queue(position) {
        this.queue.push(position);
    }

    dequeue() {
        this.queue.pop();
    }

    positionvisited(position) {
        return this.visited.map(String).includes(String(position));
    }

    positionIndexInPath(position) {
        return this.path.map(String).indexOf(String(position));
    }

    queued(position) {        
        return this.queue.map(String).includes(String(position));   
    }

    neighbourIsEnd(position) {
        const [ROW, COL] = position;

        // Check if 1 of the optional directions is the end position
        for(let [DIRECTION_ROW, DIRECTION_COL] of this.#directions) {
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const POSITION = [NEXT_ROW, NEXT_COL];   
            
            if(String(POSITION) === String(BOARD.endPosition)){ return true; } // If the neighbour is the end position
        }    
        return false;        
    }

    isNeighbour(positionOne, positionTwo){
        const [ROW, COL] = positionOne;

        // Check if positionTwo is an neighbour of positionOne
        for(let [DIRECTION_ROW, DIRECTION_COL] of this.#directions) {
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const POSITION = [NEXT_ROW, NEXT_COL];   
            
            if(String(POSITION) === String(positionTwo)){ return true; } // If positionTwo is an neighbour of positionOne
        }    
        return false;
    }

    canMove(position) {
        const [ROW, COL] = position;
        
        // Check if the position can move to 1 of the possible directions
        for(let [DIRECTION_ROW, DIRECTION_COL] of this.#directions) {
            const NEXT_ROW = ROW + DIRECTION_ROW;
            const NEXT_COL = COL + DIRECTION_COL;
            const NEIGHBOUR_POSITION = [NEXT_ROW, NEXT_COL];   

            // If the position is empty, and not already visited or queued
            if(BOARD.empty(NEIGHBOUR_POSITION) && !this.positionvisited(NEIGHBOUR_POSITION) && !this.queued(NEIGHBOUR_POSITION)) { return true; }     
        }
        return false;
    }

    pathToEndPosition() {
        for(let position of this.path) {
            // If the neighbour is the end position
            if(this.neighbourIsEnd(position)) {  
                const INDEX = this.positionIndexInPath(position) + 1;

                this.path.splice(INDEX, this.path.length); // Delete every position after the end position
                break; 
            }
        }
    }

    fastestPath() {
        this.pathToEndPosition(); // Get the path until the end position
        
        for(let position of this.path.reverse()) {
            // Index and position of the next position
            let nextIndex = this.positionIndexInPath(position) + 1;
            let next = this.path[nextIndex];
        
            // While the next position isn't a neighbour of the position
            while(next && !this.isNeighbour(position, next)) {
                this.path.splice(nextIndex, 1); // Delete the next position

                // Index and position of the next position
                nextIndex = this.positionIndexInPath(position) + 1;
                next = this.path[nextIndex];
            }
        }
        return this.path; 
    }

    async run() {      
        // If queue isn't empty
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.queue.pop(); // Position to move from

            // For every optional direction
            for(let [DIRECTION_ROW, DIRECTION_COL] of this.#directions) {
                const NEXT_ROW = ROW + DIRECTION_ROW;
                const NEXT_COL = COL + DIRECTION_COL;
                const POSITION = [NEXT_ROW, NEXT_COL];

                // If neighbour is empty and not visited or queued
                if(BOARD.empty(POSITION) && !this.positionvisited(POSITION) && !this.queued(POSITION)) { 
                    if(!BOARD.isEndPosition(POSITION)) { await BOARD.next(POSITION); }
                    this.queue.push(POSITION);
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