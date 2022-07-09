export class Dfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Left, down, right and up
    
    constructor(board) {
        this.queue = [board.startPosition];
        this.visited = [board.startPosition];
        this.path = [];
        this.board = board
    }    

    get head() {
        return this.queue[this.queue.length - 1]; // Last added position
    }

    enqueue(position) {
        this.queue.push(position);
    }

    dequeue() {
        return this.queue.pop();
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
        // Return if a neighbour is the end position
        return this.#directions.some(direction => {
            const NEIGHBOUR_POSITION = neighbourPosition(position, direction);
            return this.board.isEndPosition(NEIGHBOUR_POSITION);
        });
    }

    isNeighbour(positionOne, positionTwo){
        // Check if the position is a neighbour of the other position
        return this.#directions.some(direction => {
            const NEIGHBOUR_POSITION = neighbourPosition(positionOne, direction);
            return String(NEIGHBOUR_POSITION) === String(positionTwo);
        });
    }

    canMove(position) {
        // Check if the position can move to 1 of the possible directions
        return this.#directions.some(direction => {
            const NEIGHBOUR_POSITION = neighbourPosition(position, direction);
            return this.board.empty(NEIGHBOUR_POSITION) && !this.positionvisited(NEIGHBOUR_POSITION) && !this.queued(NEIGHBOUR_POSITION);
        });
    }

    firstNeigbourOfEndPosition() {
        // Return the first neighbour of the end position
        return this.path.find(position => { return this.neighbourIsEnd(position); });
    }

    pathToEndPosition() {    
        // Return the path to the end position
        const NEIGHBOUR_OF_END_POSITION = this.firstNeigbourOfEndPosition();
        this.path.splice(this.nextPositionIndex(NEIGHBOUR_OF_END_POSITION), this.path.length);
    }

    nextPositionIndex(position) {
        return this.positionIndexInPath(position) + 1;
    }

    nextPosition(position) {
        return this.path[this.nextPositionIndex(position)];
    }

    deleteIncorrectPositions() {
        for(let position of this.path.reverse()) {
            // Delete every next position if it isn't a neighbour of the current position
            while(this.nextPosition(position) && !this.isNeighbour(position, this.nextPosition(position))) {
                this.path.splice(this.nextPositionIndex(position), 1);
            } 
        }
    }

    fastestPath() {
        this.pathToEndPosition();
        this.deleteIncorrectPositions();
        return this.path; 
    }

    async run() {      
        while(this.queue && this.queue.length) {
            const POSITION = this.dequeue();

            // For every optional direction
            for(let direction of this.#directions) {
                const NEIGHBOUR_POSITION = neighbourPosition(POSITION, direction);

                // If neighbour is empty and not visited or queued
                if(this.board.empty(NEIGHBOUR_POSITION) && !this.positionvisited(NEIGHBOUR_POSITION) && !this.queued(NEIGHBOUR_POSITION)) { 
                    if(!this.board.isEndPosition(NEIGHBOUR_POSITION)) { await this.board.next(NEIGHBOUR_POSITION); }
                    this.enqueue(NEIGHBOUR_POSITION);
                }
            }
            if(!this.head) { return; } // Path couldn't go further
            if(this.board.isEndPosition(this.head)) { return this.fastestPath(); } // End position was found

            this.board.found(this.head);
            this.visited.push(this.head); // Position is visited
            if(this.canMove(this.head)) { this.path.push(this.head); } // If the position can move further
            await this.board.sleep();
        }
    }
}