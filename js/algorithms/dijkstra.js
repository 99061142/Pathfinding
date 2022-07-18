export class Dijkstra {
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
        // Set every position distance and parent position
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
        // Get the position that has the lowest distance from the start position
        return this.queue.reduce((lowestPositionDistance, position) => {
            if(this.path[lowestPositionDistance].distance > this.path[position].distance) { return position; }
            return lowestPositionDistance;
        });
    }

    distance(parent, position) {
        // Get the distance from current position to the start position
        const CHILD_DISTANCE = Number(this.board.element(position).dataset.distance);
        const PARENT_DISTANCE = this.path[String(parent)].distance;
        const DISTANCE = PARENT_DISTANCE + CHILD_DISTANCE; 
        return DISTANCE;
    }

    addPathInformation(parent, position) {
        // If the current position to the start position distance is shorter than the current stored distance
        if(this.distance(parent, position) < this.path[String(position)].distance) {
            this.path[String(position)] = {
                distance: this.distance(parent, position),
                parent: String(parent)
            }
        }
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
        if(!this.board.isStartPosition(position) && this.board.element(position) && !this.positionVisited(position) && this.board.empty(position)) { return true; }
        return false;
    }

    addPositionVisited(position) {
        this.removeUnvisitedPosition(position);
        this.dequeue(position);
    }

    async run() {
        while(this.queue.length) {
            let position = this.head;
            if(this.board.isEndPosition(position)) { return this.getFastestPath; } 

            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction);

                // If neighbour is empty and not visited
                if(this.canMove(neighbour)) {
                    this.addPathInformation(position, neighbour);
                    this.enqueue(neighbour);
                    if(!this.board.isEndPosition(neighbour)) { await this.board.next(neighbour); }
                }
            }
            this.addPositionVisited(position);
            if(!this.board.isStartPosition(position)) { this.board.found(position); }
            await this.board.sleep();
        }
    }
}