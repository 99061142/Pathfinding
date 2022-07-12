export class Astar {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    constructor(board) {
        this.board = board;
        this.path = this.createPathList();
        this.unvisited = this.nodePositions;
        this.queue = [board.startPosition];
    }

    get nodePositions() {
        return Object.keys(this.path).map(position => position.split(',').map(Number)); // Return every position on the board
    }

    createPathList() {
        // Add every position on the board to the path list
        let list = [...this.board.nodes].reduce((path, nodeElement) => {
            let position = String(this.board.position(nodeElement));

            if(nodeElement.id !== 'wall') {            
                path[position] = {
                    distance: Infinity,
                    parent: null
                }
            }
            return path;
        }, {});
        
        list[this.board.startPosition].distance = 0; // Set start position distance to 0
        return list;
    }

    isqueued(position) {
        return this.queue.map(String).includes(String(position));
    }

    enqueue(position) {
        if(!this.isqueued(position)) { this.queue.push(position); }
    }

    dequeue(position) {
        const INDEX = this.queue.indexOf(position);
        this.queue.splice(INDEX, 1);
    }

    positionVisited(position) {
        return !this.unvisited.map(String).includes(String(position));
    }

    removeUnvisitedPosition(position) {
        const INDEX = this.unvisited.map(String).indexOf(String(position));
        this.unvisited.splice(INDEX, 1);
    }

    get head() {
        return this.queue.reduce((lowestPositionDistance, position) => {
            let lowestPositionTotalDistance = this.path[String(lowestPositionDistance)].distance + this.manhattanDistance(lowestPositionDistance);
            let positionTotalDistance = this.path[String(position)].distance + this.manhattanDistance(position);

            // If the current position has the lowest distance + manhattan distance
            if(positionTotalDistance < lowestPositionTotalDistance) { return position; }
            return lowestPositionDistance;
        })
    }

    manhattanDistance(position) {
        let [endRow, endCol] = this.board.endPosition;
        let currentCheckPosition = position;
        let distance = 0;

        while(!this.board.isEndPosition(currentCheckPosition)) {
            let [newRow, newCol] = currentCheckPosition;
            
            if(newRow != endRow && newCol != endCol) { distance += 1.4; } 
            else if(newRow != endRow || newCol != endCol) { distance += 1; }

            if(newRow > endRow) { newRow -= 1; }
            else if(newRow < endRow) { newRow += 1; }
            
            if(newCol > endCol) { newCol -= 1; }
            else if(newCol < endCol) { newCol += 1; }

            currentCheckPosition = [newRow, newCol];
        }
        return Math.round(distance * 100) / 10; // 1 decimal
    }

    distance(parent, position) {
        // Get the distance from current position to the start position
        const CHILD_DISTANCE = Number(this.board.element(position).dataset.distance);
        const PARENT_DISTANCE = this.path[String(parent)].distance;
        const DISTANCE = CHILD_DISTANCE + PARENT_DISTANCE;
        return DISTANCE;
    }

    addPathInformation(parent, position) {

        // If the current position has the lowest distance to the the start position
        if(this.distance(parent, position) < this.path[String(position)].distance) {
            this.path[String(position)].distance = this.distance(parent, position);
        }
        this.path[String(position)].parent = String(parent);
    }

    get getFastestPath() {
        let path = [];
        let position = String(this.board.endPosition);
        
        while(position) {
            position = position.split(',').map(Number);
            path.push(position);
            position = this.path[String(position)].parent;
        }
        return path.slice(1, -1);
    }

    canMove(position) {
        // Return if the position is empty and not already visited / in the queue
        if(this.board.isStartPosition(position) || !this.board.element(position) || this.positionVisited(position) || !this.board.empty(position) || this.isqueued(position)) { return false; }
        return true;
    }

    addPositionVisited(position) {
        this.removeUnvisitedPosition(position);
        this.dequeue(position);
    }

    async run() {
        while(this.queue.length && !this.isqueued(this.board.endPosition)) {
            let position = this.head;

            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction);

                // If neighbour is empty and not visited / in queue
                if(this.canMove(neighbour)) {
                    this.addPathInformation(position, neighbour);
                    this.enqueue(neighbour);
                    if(!this.board.isEndPosition(neighbour)) { 
                        if(this.board.element(neighbour).id.includes("weight")) { await this.board.weightNext(neighbour); }
                        else { await this.board.next(neighbour); }
                    }
                }
            }
            
            this.addPositionVisited(position);
            if(!this.board.isStartPosition(position)) { 
                if(!this.board.element(position).id.includes("weight")) { this.board.found(position); }
                else{ this.board.weightFound(position); }
            }
            await this.board.sleep();
        }
        return this.getFastestPath;
    }
}