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

    positionWeight(position) {
        return this.board.element(position).dataset.distance;
    }

    toStartDistance(position) {
        // Distance from current pos to start pos
        let [row, col] = position;
        let [startRow, startCol] = this.board.startPosition;
        let rowDif = Math.abs(startRow - row);
        let colDif = Math.abs(startCol - col);
        let distance = Math.floor(this.positionWeight(position) / 5);

        while(rowDif || colDif) {
            distance += (rowDif && colDif) ? 1.4 : 1;
            if(rowDif) { rowDif -= 1; }
            if(colDif) { colDif -= 1; }
        }        
        return Math.round(distance * 100) / 10; // 1 decimal
    }

    toEndDistance(position) {
        // Distance from current pos to end pos
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
        get the position with the lowest toEndDistance if there are multiple positions with the same cost */
        this.queue.forEach(position => {
            let positionFCost = this.fCost(position);
            let positionHCost = this.toEndDistance(position);
            
            if(!dict || positionFCost < dict.distance || positionFCost == dict.distance && positionHCost < dict.toEndDistance) {
                dict = {
                    position: position,
                    distance: positionFCost,
                    toEndDistance: positionHCost
                }; 
            }
        });
        return dict.position
    }

    enqueue(position) {
        this.queue.push(position);
    }

    dequeue(position) {
        const INDEX = this.queue.indexOf(position);
        this.queue.splice(INDEX, 1);
    }

    addPathInformation(position, parentPosition) {
        this.path[String(position)] = {
            distance: this.toStartDistance(position, parentPosition),
            parent: String(parentPosition)
        };
    }

    isVisited(position) {
        return this.visited.map(String).includes(String(position))
    }

    canMoveTo(position) {
        if(!this.board.element(position) || !this.board.empty(position) || this.isVisited(position) || this.board.isStartPosition(position)) { return false; }
        return true;
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

    async run() {
        while(this.queue.length) {
            let position = this.head;

            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction)
                
                // If neighbour is empty and not visited / in queue
                if(this.canMoveTo(neighbour)) {
                    this.addPathInformation(neighbour, position);
                    if(!this.isQueued(neighbour)) { this.enqueue(neighbour); }
                    
                    if(!this.board.isEndPosition(neighbour)) {
                        if(this.board.element(neighbour).id.includes("weight")) { await this.board.weightNext(neighbour); }
                        else { await this.board.next(neighbour); }
                    }
                }
            }
            if(this.isQueued(this.board.endPosition)) { return this.getFastestPath; }
            if(!this.board.isStartPosition(position)) { this.board.found(position); }
            this.visited.push(position);
            this.dequeue(position);
            await this.board.sleep();
        }
    }
}