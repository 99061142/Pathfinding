export class Dijkstra {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    constructor(board) {
        this.board = board;
        this.visited = [];
        this.unvisited = this.getUnvisitedPositionsList;
        this.path = this.getPathList;
    }

    positionvisited(position) {
        return this.visited.includes(String(position));
    }

    get getUnvisitedPositionsList() {
        // Make a list of all the nodes that are not visited
        let list = [];

        this.board.nodes.forEach(nodeElement => {
            let position = String(this.board.position(nodeElement));
            list.push(position);
        });
        return list
    }

    get getPathList() {
        // Make a list that stores all the node distances and parent nodes
        let list = {};
        
        for(let position of this.unvisited) {
            let distance = this.board.isStartPosition(position) ? 0 : 1000000;

            list[String(position)] = {
                distance: distance,
                previous: null
            }
        }
        return list
    }

    get head() {
        // Return start position if not visited
        if(!this.positionvisited(String(this.board.startPosition))) { return this.board.startPosition; }

        let smallestDistanceInformation = {
            distance: 1000000,
            position: null
        }
        
        // Get the position with the smallest distance
        for(let position in this.path){
            let positionDistance = this.path[String(position)].distance;

            if(!this.positionvisited(position) && positionDistance < smallestDistanceInformation.distance) { 
                smallestDistanceInformation.position = position;
                smallestDistanceInformation.distance = positionDistance;
            }
        }

        return smallestDistanceInformation.position ? smallestDistanceInformation.position.split(',').map(Number) : null;
    }

    distance(parent, child) {
        // Get the distance from current child to the start position
        const CHILD_DISTANCE = Number(this.board.element(child).dataset.distance);
        const PARENT_DISTANCE = this.path[String(parent)].distance;   
        const DISTANCE = PARENT_DISTANCE ? CHILD_DISTANCE + PARENT_DISTANCE : CHILD_DISTANCE
        return DISTANCE
    }

    addToPath(parent, child) {
        this.path[String(child)].distance = this.distance(parent, child);
        this.path[String(child)].previous = String(parent);
    }

    get getFastestPath() {
        let path = [];   
        let position = String(this.board.endPosition);

        while(position) {
            position = position.split(',').map(Number);
            path.push(position);
            position = this.path[String(position)].previous;
        }
        return path.slice(1, -1)
    }

    async run() {
        while(this.unvisited && this.unvisited.length) {
            let position = this.head
    
            for(let direction of this.#directions) {
                let neighbour = neighbourPosition(position, direction);
                
                // If neighbour is empty and not visited
                if(this.board.element(neighbour) && !this.positionvisited(neighbour) && this.board.empty(neighbour)) {
                    this.addToPath(position, neighbour)
                    if(!this.board.isEndPosition(neighbour)) { await this.board.next(neighbour); }
                }
            }
            this.visited.push(String(position));

            if(this.board.isEndPosition(position)) { return this.getFastestPath; } 
            if(!this.board.isStartPosition(position)) { this.board.found(position); }
            if(!this.head){ return; } // Path couldn't go further
            await this.board.sleep();
        }
    }
}