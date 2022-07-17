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

    toStartDistance(position) {
        // Distance from current position to start position
        let [row, col] = position;
        let [startRow, startCol] = this.board.startPosition;
        let rowDif = Math.abs(startRow - row);
        let colDif = Math.abs(startCol - col);
        let distance = 0;

        while(rowDif || colDif) {
            distance += (rowDif && colDif) ? 1.4 : 1;
            if(rowDif) { rowDif -= 1; }
            if(colDif) { colDif -= 1; }
        }        
        return Math.round(distance * 100) / 10; // 1 decimal
    }

    toEndDistance(position) {
        // Distance from current position to end position  
        let [row, col] = position;
        let [endRow, endCol] = this.board.endPosition;
        let rowDif = Math.abs(endRow - row);
        let colDif = Math.abs(endCol - col);
        let distance = 0;

        while(rowDif || colDif) {
            distance += (rowDif && colDif) ? 1.4 : 1;
            if(rowDif) { rowDif -= 1; }
            if(colDif) { colDif -= 1; }
        }
        return Math.round(distance * 100) / 10; // 1 decimal
    }

    fCost(position) {
        return this.toStartDistance(position) + this.toEndDistance(position); // Distance to start + distance to end
    }

    get head() {
        let dict;

        /* Get the position with the lowest distance cost or 
        get the position with the lowest toEndDistance if there are multiple positions with the same distance cost */
        this.queue.forEach(position => {
            let positionFCost = this.fCost(position);
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
        let pathPosition = this.path[String(position)];
        pathPosition.distance = this.fCost(position);
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

    getClosestNeighbour(position) {
        let pathPosition = this.path[String(position)];

        for(let direction of this.#directions) {
            let neighbour = neighbourPosition(position, direction)

            // If the position is visited
            if(this.board.empty(neighbour) && this.board.element(neighbour) && this.isVisited(neighbour)) {
                let neighbourDistance = this.path[String(neighbour)].distance;

                // If the neighbour fCost is lower than the current position neighbour fCost
                if(neighbourDistance != 0 && neighbourDistance < pathPosition.distance) {
                    pathPosition.distance = neighbourDistance;
                    pathPosition.parent = String(neighbour);
                }
            }
        }
    }

    async run() {
        while(this.queue.length) {
            let position = this.head;

            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction)
                
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
            if(this.isQueued(this.board.endPosition)) { return this.getFastestPath; }
            
            // Add position
            this.visited.push(position);
            if(!this.board.isStartPosition(position)) { 
                this.board.found(position); 
                this.getClosestNeighbour(position);
            }

            this.dequeue(position);
            await this.board.sleep();
        }
    }
}