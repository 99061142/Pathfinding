class Node {
    #standardClasses = "border border-dark float-left";
    #importantNames = ['start', 'end'];

    element(position) {
        const [ROW, COL] = position;
        const ROW_ELEMENT = document.getElementById('board').children[ROW];
        
        // If row of node could be found
        if(ROW_ELEMENT) {
            return ROW_ELEMENT.children[COL]; // Node element
        }
    }

    position(element) {
        const ROW_ELEMENT = element.parentElement;

        const ROW = Array.from(document.getElementById('board').children).indexOf(ROW_ELEMENT);
        const COL = Array.from(ROW_ELEMENT.children).indexOf(element);

        return [ROW, COL]; // Return the position of the element
    }

    empty(position) {
        const [ROW, COL] = position;

        return this.list[ROW] && this.list[ROW][COL] === 0; // If position is empty on the board
    }   

    isStartPosition(position) {
        const [ROW, COL] = position;
        const [END_ROW, END_COL] = this.startPosition;

        return ROW === END_ROW && COL === END_COL; // If position is the same as the start position      
    }

    get startElement() {
        return document.getElementById("start");
    }
    
    get startPosition() {
        const START_ELEMENT = this.startElement;

        if(START_ELEMENT) {
            return this.position(START_ELEMENT);
        }
    }

    set startPosition(element) {
        element.id = "start";
        element.className += " fas fa-arrow-right bg-success";
    }

    isEndPosition(position) {
        const [ROW, COL] = position;
        const [END_ROW, END_COL] = this.endPosition;

        return ROW === END_ROW && COL === END_COL; // If position is the same as the end position
    }

    get endElement() {
        return document.getElementById("end");
    }

    get endPosition() {
        const END_ELEMENT = this.endElement;

        if(END_ELEMENT) {
            return this.position(END_ELEMENT);
        }
    }

    set endPosition(element) {
        const POSITION = this.position(element);
        
        // If board position was not empty (ex: walls)
        if(!this.empty(POSITION)) {
            this.emptyBoardColumn(POSITION); // Empty board position
        }

        element.id = "end";
        element.className += " fas fa-home bg-danger";

        RUN_BUTTON.disabled = false;
    }


    setStandardAttributes(element) {
        // Empty board position
        const POSITION = this.position(element);
        this.emptyBoardColumn(POSITION);

        element.className = this.#standardClasses;
        
        // If the end position was deleted
        if(this.endPosition && this.isEndPosition(POSITION)) {
            RUN_BUTTON.disabled = true
        }

        if(element.id) {
            element.removeAttribute('id');
        }
    }

    wall(position) {  
        const ELEMENT = this.element(position);

        // If the node is not important (ex: start/end position)
        if(!this.#importantNames.includes(ELEMENT.id)) {
            ELEMENT.className = this.#standardClasses;
            ELEMENT.id = "wall";

            this.fillBoardColumn(position); // Fill position on the board
        }
    }

    found(position) {
        const ELEMENT = this.element(position); 
        ELEMENT.className = this.#standardClasses;
        ELEMENT.id = "found";
    }

    next(position) {    
        const ELEMENT = this.element(position);

        ELEMENT.className = this.#standardClasses;
        ELEMENT.id = "next";
    }

    fastest(position) {  
        const ELEMENT = this.element(position);

        ELEMENT.className = this.#standardClasses;
        ELEMENT.id = "fastest";
    }
}


class Board extends Node {
    #speed_types = {
        slow: 50, 
        normal: 25, 
        fast: 5, 
        instant: 0
    };

    constructor() {
        super();
        this.name = 'Board';
        this.height = document.querySelectorAll('#row').length;
        this.width = document.querySelectorAll('#row')[0].children.length;
        this.list = this.createList();

        this.isRunning = false;
        this.speed = this.#speed_types['normal'];
    } 

    createList() {
        const LIST = [];

        for(let i = 0; i < this.height; i++) {
            LIST.push([]);

            for(let j = 0; j < this.width; j++) {
                LIST[LIST.length - 1].push(0);
            }
        }
        return LIST;
    }

    set speedTime(typeOrValue) {
        // Get the speed value with the type the user gave as parameter
        const SPEED = this.#speed_types[typeOrValue];

        // If the speed value could be found, or the parameter is a number
        if(!isNaN(typeOrValue) || SPEED != undefined) {
            this.speed = (SPEED != undefined) ? SPEED : typeOrValue;
        }
    }
    
    sleep() {
        if(this.speed) {
            return new Promise(resolve => setTimeout(resolve, this.speed));
        }
    }

    emptyBoardColumn(position) {
        // Empty the board column 
        const [ROW, COL] = position;
        this.list[ROW][COL] = 0;
    }

    fillBoardColumn(position) {
        // Fill the board column 
        const [ROW, COL] = position;
        this.list[ROW][COL] = 1;
    }

    clearAlgorithmPath() {
        // Clear specific nodes on the board
        const classes = ["td#found", "td#next", "td#fastest"];
        this.clearSpecificElements(classes);
    }

    clearWalls() {
        // Clear specific nodes on the board
        const classes = ["td#wall"];
        this.clearSpecificElements(classes);
    }

    clearBoard() {
        // Clear specific nodes on the board
        const classes = ["#start", "#end"];
        this.clearSpecificElements(classes);

        this.clearAlgorithmPath();
        this.clearWalls();
    }

    clearSpecificElements(classes) {
        if(!this.isRunning) {
            // For every class of the nodes that must be cleared
            document.querySelectorAll(classes).forEach(element => {
                this.setStandardAttributes(element); // Change the node to the standard node
            });
        }
    }
    
    makePath(algorithm) {
        // If the start and end position are on the board, and the board isn't running
        if(this.startPosition && this.endPosition && !this.isRunning) {
            this.clearAlgorithmPath();
            this.isRunning = true;
            RUN_BUTTON.disabled = true;

            const AlGORITHM_FUNCTION_NAME = `path${capitalize(algorithm)}`

            // Start the pathfinding algorithm
            window[AlGORITHM_FUNCTION_NAME]().then(route => {
                // Make the fastest route
                this.fastestRoute(route).then(() => {
                    this.isRunning = false;
                    RUN_BUTTON.disabled = false;
                });
            });
        }
    }
    
    async fastestRoute(route) {
        // If a route from the start to end position can be made
        if(route) {
            for(let position of route.reverse()) {       
                this.fastest(position); // Update node styling

                await this.sleep();
            }
        }
    }

    randomWalls() {
        if(!this.isRunning) {
            document.querySelectorAll("#node").forEach(element => {
                // 33% chance to make the wall if it's not an important node (ex: start/end position)
                if(Math.random() <= 0.33 && !this.importantNames(element)) {
                    // Update node styling
                    const POSITION = this.position(element);              
                    this.wall(POSITION);
                }
            });
        }
    }

    mazeBorder() {
        // For every row column on the board
        for(let col = 0; col < this.width; col++) {
            // Make a horizontal border, the first loop is for the TOP the second loop is for the BOTTOM
            for(let i = 0; i <= 1; i++) {
                const ROW = (!i) ? 0 : this.height - 1;
                const POSITION = [ROW, col];

                this.wall(POSITION);
            }
        }
        
        // For every row on the board
        for(let row = 0; row < this.height; row++) {
            // Make a vertical border, the first loop is for the LEFT the second loop is for the RIGHT
            for(let i = 0; i <= 1; i++) {
                const COL = (!i) ? 0 : this.width - 1;
                const POSITION = [row, COL];

                this.wall(POSITION);
            }
        } 
    }

    createMaze() {
        if(!this.isRunning) {
            this.clearAlgorithmPath();
            this.mazeBorder();
        }
    }
}
const BOARD = new Board();

// For each node
document.querySelectorAll('#row > *').forEach(nodeElement => {  
    BOARD.setStandardAttributes(nodeElement); // Change the node to the standard node

    nodeElement.onclick = () => { 
        if(!BOARD.isRunning) {
            // If it's the start or end node
            if(nodeElement === BOARD.startElement || nodeElement === BOARD.endElement) {
                BOARD.setStandardAttributes(nodeElement);
            }

            // If the board doesn't have the start or end position
            else if(!BOARD.startPosition || !BOARD.endPosition) {
                // Add the position that was not already added
                const IMPORTANCY = BOARD.startPosition ? "end" : "start";

                if(IMPORTANCY == "start") {
                    BOARD.startPosition = nodeElement;
                }else{
                    BOARD.endPosition = nodeElement;
                }
            }
        }
    }

    nodeElement.addEventListener("mouseover", mouseEvent => {
        // When the user hovers over the node and is holding down the left mouse button
        if(mouseEvent.buttons === 1 && !BOARD.isRunning) {
            // Update node styling
            const POSITION = BOARD.position(nodeElement);
            BOARD.wall(POSITION);
        }
    });
});


/*
TESTING CODE:

BOARD.create_maze()
BOARD.end_position = BOARD.element([11,1])
BOARD.start_position = BOARD.element([14,1])


BOARD.wall([9,1])
BOARD.wall([9,2])
BOARD.wall([10,2])
BOARD.wall([11,2])
BOARD.wall([12,2])
BOARD.wall([13,2])
BOARD.wall([13,4])
BOARD.wall([13,5])
BOARD.wall([13,6])
BOARD.wall([14,6])
BOARD.wall([13,4])
BOARD.wall([14,8])
BOARD.wall([13,8])
BOARD.wall([14,10])
BOARD.wall([13,10])
BOARD.wall([14,12])
BOARD.wall([13,12])
BOARD.wall([11,13])
BOARD.wall([11,12])
BOARD.wall([11,11])
BOARD.wall([11,10])
BOARD.wall([11,8])
BOARD.wall([10,8])
BOARD.wall([9,8])
BOARD.wall([9,9])
BOARD.wall([9,10])
BOARD.wall([9,11])
BOARD.wall([9,12])
BOARD.wall([8,12])
BOARD.wall([7,12])
BOARD.wall([7,13])
BOARD.wall([6,12])
BOARD.wall([5,12])
BOARD.wall([7,10])
BOARD.wall([6,10])
BOARD.wall([5,10])
BOARD.wall([4,10])
BOARD.wall([3,10])
BOARD.wall([2,10])
BOARD.wall([2,11])
BOARD.wall([2,12])
BOARD.wall([1,12])
BOARD.wall([7,8])
BOARD.wall([6,8])
BOARD.wall([5,8])
BOARD.wall([4,8])
BOARD.wall([3,8])
BOARD.wall([2,8])
BOARD.wall([1,8])
BOARD.wall([7,8])
BOARD.wall([7,7])
BOARD.wall([7,6])
BOARD.wall([7,5])
BOARD.wall([7,4])
BOARD.wall([7,3])
BOARD.wall([7,2])
BOARD.wall([8,4])
BOARD.wall([9,4])
BOARD.wall([10,4])
BOARD.wall([11,4])
BOARD.wall([8,6])
BOARD.wall([9,6])
BOARD.wall([10,6])
BOARD.wall([11,6])
BOARD.wall([1,2])
BOARD.wall([2,2])
BOARD.wall([1,4])
BOARD.wall([2,4])
BOARD.wall([3,4])
BOARD.wall([4,4])
BOARD.wall([5,4])
BOARD.wall([5,3])
BOARD.wall([5,2])
BOARD.wall([3,2])
BOARD.wall([4,12])
BOARD.wall([1,6])
BOARD.wall([2,6])
BOARD.wall([3,6])
BOARD.wall([4,6])
BOARD.wall([5,6])

BOARD.make_path('dfs')
*/