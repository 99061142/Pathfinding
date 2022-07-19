export class Dfs {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Left, down, right and up
    
    constructor(board) {
        this.board = board;
        this.queue = [board.startPosition];
        this.visited = [String(board.startPosition)];
        this.path = [];
    }    

    get head() {
        return this.queue.at(-1);
    }

    enqueue(position) {
        this.queue.push(position);
    }

    dequeue() {
        return this.queue.pop();
    }

    isVisited(position) {
        return this.visited.includes(String(position));
    }

    isQueued(position) {        
        return this.queue.find(queuedPosition => String(queuedPosition) === String(position));
    }

    pathPositionIndex(position) {
        return this.path.findIndex(pathPosition => String(pathPosition) === String(position));
    }

    positionvisited(position) {
        return this.isVisited(position) || this.isQueued(position);
    }

    nextPathPositionIndex(position) {
        return this.pathPositionIndex(position) + 1;
    }

    isNeighbour(positionOne, positionTwo){
        // Check if the position is a neighbour of the other position
        return this.#directions.some(direction => {
            let neighbour = neighbourPosition(positionOne, direction);
            return String(neighbour) === String(positionTwo);
        });
    }

    neighbourIsEnd(position) {
        return this.#directions.some(direction => {
            let neighbour = neighbourPosition(position, direction);
            return this.board.isEndPosition(neighbour);
        });
    }

    canMoveToAnyNeighbour(position) {
        return this.#directions.some(direction => {
            let neighbour = neighbourPosition(position, direction);
            return this.board.empty(neighbour) && !this.positionvisited(neighbour);
        });
    }

    get firstNeigbourOfEndPosition() {
        // Return the first neighbour of the end position
        return this.path.find(position => { return this.neighbourIsEnd(position); });
    }

    pathToEndPosition() {    
        // Delete every path position in the list after the end position index
        let neighbourOfEndPosition = this.firstNeigbourOfEndPosition;
        let neighbourOfEndpositionIndex = this.nextPathPositionIndex(neighbourOfEndPosition);
        this.path.splice(neighbourOfEndpositionIndex, this.path.length);
    }

    nextPosition(position) {
        let nextPathPositionIndex = this.nextPathPositionIndex(position);
        return this.path[nextPathPositionIndex];
    }

    deleteIncorrectPositions() {
        for(let position of this.path.reverse()) {
            // Delete every next position if it isn't a neighbour of the current position
            while(this.nextPosition(position) && !this.isNeighbour(position, this.nextPosition(position))) {    
                this.path.splice(this.nextPathPositionIndex(position), 1);
            } 
        }
    }

    get fastestPath() {
        this.pathToEndPosition();
        this.deleteIncorrectPositions();
        return this.path; 
    }

    canMove(position) {
        return this.board.empty(position) && !this.positionvisited(position);
    }

    setVisited(position) {
        this.visited.push(String(position));
    }

    async run() {      
        while(this.queue && this.queue.length) {
            let position = this.dequeue();

            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction);

                // If neighbour is empty and not visited
                if(this.canMove(neighbour)) { 
                    if(!this.board.isEndPosition(neighbour)) { await this.board.next(neighbour); }
                    this.enqueue(neighbour);
                }
            }
            if(this.board.isEndPosition(this.head)) { return this.fastestPath; }
            if(!this.head) { return; } // Path couldn't go further
            if(this.canMoveToAnyNeighbour(this.head)) { this.path.push(this.head); } // If the position can move further
            this.board.found(this.head);
            this.setVisited(this.head);
            await this.board.sleep();
        }
    }
}