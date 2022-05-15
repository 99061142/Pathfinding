class Dfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left
    
    constructor() {
        this.queue = [BOARD.startPosition];
        this.path = [];
    }    

    get head() {
        return this.queue[0]; // Position to move from
    }

    async run() {
        while(this.queue && this.queue.length) {
            const [ROW, COL] = this.queue.shift(); // Position to move from + dequeue the position

            // For every neighbour
            for(let directionPosition of this.#directions) {
                const [DIRECTION_ROW, DIRECTION_COL] = directionPosition;
                const NEXT_ROW = ROW + DIRECTION_ROW;
                const NEXT_COL = COL + DIRECTION_COL;
                const POSITION = [NEXT_ROW, NEXT_COL];

                // If neighbour is empty, and not visited
                if(BOARD.empty(POSITION) && BOARD.element(POSITION).id !== "next") {
                    if(!BOARD.isEndPosition(POSITION)) {
                        BOARD.next(POSITION); // Node styling to "next"
                        await BOARD.sleep();        
                    }
                    this.queue.unshift(POSITION); // Add neighbour to the queue
                }
            }
            if(this.head) {
                // If position is end position
                if(BOARD.isEndPosition(this.head)) {
                    return this.path; // Return start -> end route
                }

                BOARD.found(this.head); // Node styling to "found"
            }
        }
    }
}


async function pathDfs() {
    return new Dfs().run(); // Return the start -> end path
}