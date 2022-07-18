// make astar class
export class Astar {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    constructor(board) {
        this.board = board
        this.path = this.createPathList();
        this.queue = [board.startPosition];
        this.visited = [];
    }

    createPathList() {
        // Add every board node to the path list
        let list = [...this.board.nodes].reduce((path, nodeElement) => {
            let position = String(this.board.position(nodeElement));

            if(nodeElement.id !== 'wall') {            
                path[String(position)] = {
                    distance: Infinity,
                    parent: null
                }
            }
            return path;
        }, {});
        
        list[this.board.startPosition].distance = 0; // Set start position distance to 0
        return list;
    }

    toStartDistance(position) {
        let [row, col] = position;
        let [startRow, startCol] = this.board.startPosition;
        let rowDistance = Math.abs(startRow - row);
        let colDistance = Math.abs(startCol - col);
        let totalDistance = rowDistance + colDistance;
        let straightDistance = Math.abs(rowDistance - colDistance);
        let diagonalDistance = Math.abs(totalDistance - straightDistance) / 2 * 1.4;
        
        let currentPositionWeight = Number(this.board.element(position).dataset.distance) / 10;
        let distance = currentPositionWeight + straightDistance + diagonalDistance;
        return Math.round(distance * 100) / 10;
    }

    toEndDistance(position) {
        let [row, col] = position;
        let [endRow, endCol] = this.board.endPosition;
        let rowDistance = Math.abs(endRow - row);
        let colDistance = Math.abs(endCol - col);
        let totalDistance = rowDistance + colDistance;
        let straightDistance = Math.abs(rowDistance - colDistance);
        let diagonalDistance = Math.abs(totalDistance - straightDistance) / 2 * 1.4;
        
        let distance = straightDistance + diagonalDistance;
        return Math.round(distance * 100) / 10;
    }

    totalDistance(position) {
        return this.toStartDistance(position) + this.toEndDistance(position);
    }

    get head() {
        let dict;

        /* Get the position with the lowest distance cost or 
        get the position with the lowest toEndDistance if there are multiple positions with the same distance cost */
        this.queue.forEach(position => {
            let positionFCost = this.totalDistance(position);
            let endCost = this.toEndDistance(position);
            
            if(!dict || positionFCost < dict.distance || positionFCost == dict.distance && endCost < dict.toEndDistance) {
                dict = {
                    position: position,
                    distance: positionFCost,
                    toEndDistance: endCost
                }; 
            }
        });
        return dict.position;
    }

    enqueue(position) {
        this.queue.push(position);
    }

    dequeue(position) {
        const INDEX = this.queue.indexOf(position);
        this.queue.splice(INDEX, 1);
    }

    addPathInformation(position, parentPosition) {
        let pathPosition = this.pathPosition(position);
        pathPosition.distance = this.totalDistance(position);
        pathPosition.parent = String(parentPosition);
    }

    isVisited(position) {
        return this.visited.map(String).includes(String(position))
    }

    isQueued(position) {
        return this.queue.map(String).includes(String(position));
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

    pathPosition(position) {
        return this.path[String(position)];
    }

    getClosestNeighbour(position) {
        let pathPosition = this.pathPosition(position);

        for(let direction of this.#directions) {
            let neighbour = neighbourPosition(position, direction)

            // If the neighbour position is visited
            if(this.board.empty(neighbour) && this.board.element(neighbour) && this.isVisited(neighbour)) {
                let neighbourDistance = this.path[String(neighbour)].distance;
                let parentPositionList = pathPosition.parent.split(',').map(Number);

                /* If the neighbour totalDistance is lower than the current position neighbour totalDistance or 
                when the neighbour totalDistance is equal to the current position neighbour totalDistance and 
                the neighbour position is closer to the start position */
                if(neighbourDistance < pathPosition.distance || neighbourDistance == pathPosition.distance && this.toStartDistance(neighbour) < this.toStartDistance(parentPositionList)) {
                    pathPosition.distance = (neighbourDistance != 0) ? neighbourDistance : this.totalDistance(neighbour);
                    pathPosition.parent = String(neighbour);
                }
            }
        }
    }

    positionFound(position) {
        this.visited.push(position);
        this.dequeue(position);
        if(!this.board.isStartPosition(position)) { this.getClosestNeighbour(position); } // Select the closest neighbour as parent position

        if(!this.board.isStartPosition(position) && !this.board.isEndPosition(position)) {
            if(!this.board.element(position).id.includes("weight")) { this.board.found(position); }
            else{ this.board.weightFound(position); }
        }
    }

    async run() {
        while(this.queue.length) {
            let position = this.head;

            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction);

                // If neighbour is empty and not visited
                if(this.board.element(neighbour) && this.board.empty(neighbour) && !this.isVisited(neighbour)) {
                    this.addPathInformation(neighbour, position);
                    if(!this.isQueued(neighbour)) { this.enqueue(neighbour); }
                    
                    if(!this.board.isEndPosition(neighbour)) {
                        if(this.board.element(neighbour).id.includes("weight")) { await this.board.weightNext(neighbour); }
                        else { await this.board.next(neighbour); }
                    }
                }
            }
            this.positionFound(position);
            if(this.isQueued(this.board.endPosition)) { return this.getFastestPath; }
            await this.board.sleep();
        }
    }
}