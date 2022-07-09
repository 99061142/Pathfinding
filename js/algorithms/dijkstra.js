export class Dijkstra {
    #directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    constructor(board) {
        this.board = board;
        this.visited = [];
        this.unvisited = [];
        this.path = {};
    }

    distance(position){
        return this.board.element(position).dataset.distance;
    }

    addToPath(position, previous=null) {
        this.path[String(position)] = {
            distance: this.distance(position),
            previous: String(previous)
        }
    }

    addToVisited(position, previous) {
        const POSITION_STR = String(position);
        const POSITION_INDEX = this.unvisited.indexOf(POSITION_STR);

        this.visited.push(POSITION_STR);
        this.unvisited.splice(POSITION_INDEX, 1);

        this.addToPath(position, previous);
    }

    unvisitedPositions() {
        this.board.nodes.forEach(nodeElement => {
            const POSITION = String(this.board.position(nodeElement));
            this.unvisited.push(POSITION);
        });
    }

    get head() {
        const KEY = Object.keys(this.path)[Object.keys(this.path).length - 1];
        return KEY.split(',').map(Number);
    }

    async run() {
        this.unvisitedPositions();
        this.addToVisited(this.board.startPosition);
        

        const POSITION = this.head;

        for(let direction of this.#directions) {
            const NEIGHBOUR_POSITION = neighbourPosition(POSITION, direction);
            
            if(this.board.element(NEIGHBOUR_POSITION)) {
                this.addToVisited(NEIGHBOUR_POSITION, POSITION);
            }
        }
    }
}