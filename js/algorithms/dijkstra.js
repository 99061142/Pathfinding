export class Dijkstra {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    constructor(board) {
        this.board = board;
        this.visited = [];
        this.unvisited = this.unvisitedPositions();
        this.path = this.path();
    }

    positionUnvisited(position) {
        return this.unvisited.includes(String(position));
    }

    get head() {
        let lowestDistanceInformation = {}

        for(let position in this.path){
            let positionDistance = this.path[String(position)].distance;

            if(!lowestDistanceInformation.hasOwnProperty('distance') || this.positionUnvisited(position) && positionDistance < lowestDistanceInformation.distance ) {
                lowestDistanceInformation.position = position;
                lowestDistanceInformation.distance = positionDistance;
            }
        }
        return lowestDistanceInformation.position.split(',').map(Number);
    }

    unvisitedPositions() {
        let list = [];

        this.board.nodes.forEach(nodeElement => {
            let position = String(this.board.position(nodeElement));
            list.push(position);
        });
        return list
    }

    path() {
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

    positionDistance(position) {
        let distance = this.board.element(position).dataset.distance;
        return Number(distance);
    }

    distance(position, previous){
        return this.positionDistance(position) + this.path[String(previous)].distance;
    }

    addToPath(position, previous) {
        this.addToVisited(position);
        const PREVIOUS = previous ? String(previous) : null;

        this.path[String(position)] = {
            distance: this.distance(position, previous),
            previous: PREVIOUS
        }
    }

    addToVisited(position) {
        this.visited.push(String(position));
    }
    
    deleteFromUnvisited(position) {
        const INDEX = this.unvisited.indexOf(String(position));
        this.unvisited.splice(INDEX, 1);
    }

    isVisited(position) {
        return this.visited.includes(String(position)) || this.board.isStartPosition(position) || this.board.isEndPosition(position);
    }

    fastestPath() {
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
            for(let direction of this.#directions) {
                const NEIGHBOUR_POSITION = neighbourPosition(this.head, direction);
                
                if(this.board.element(NEIGHBOUR_POSITION) && !this.isVisited(NEIGHBOUR_POSITION) && this.board.empty(NEIGHBOUR_POSITION)) {
                    await this.board.next(NEIGHBOUR_POSITION);
                    this.addToPath(NEIGHBOUR_POSITION, this.head);
                }
                if(this.board.isEndPosition(NEIGHBOUR_POSITION)) {
                    this.addToPath(NEIGHBOUR_POSITION, this.head);
                    return this.fastestPath();
                }
            }
            this.deleteFromUnvisited(this.head);
            this.board.found(this.head);
            await this.board.sleep();
        }
    }
}