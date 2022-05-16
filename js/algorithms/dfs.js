class Dfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor() {
        this.queue = [BOARD.startPosition];
        this.visited = [BOARD.startPosition.toString()];
        this.path = [];
    }    

    get head() {
        return this.queue[0]; // Position to move from
    }

    async run() {
        // If queue isn't empty
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.queue.shift(); // Position to move from

            for(let directionPosition of this.#directions) {
                const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
                const NEXT_ROW = ROW + DIRECTION_ROW;
                const NEXT_COL = COL + DIRECTION_COL;
                const POSITION = [NEXT_ROW, NEXT_COL];

                // If neighbour is empty and not visited
                if(BOARD.empty(POSITION) && !this.visited.includes(POSITION.toString())) {            
                    if(!BOARD.isEndPosition(POSITION)) {
                        BOARD.next(POSITION); // Update node styling
                        await BOARD.sleep();        
                    }
                    this.queue.unshift(POSITION); // Add neighbour to the queue
                    this.visited.push(POSITION.toString()) // Set position as visited
                }
            }
            
            // If queue isn't empty
            if(this.queue && this.queue.length) {
                if(BOARD.isEndPosition(this.head)) {
                    return this.path; // Return start to end route
                }

                BOARD.found(this.head); // Update node styling
            }
        }
    }
}


async function pathDfs() {
    return new Dfs().run(); // Return the start to end path
}