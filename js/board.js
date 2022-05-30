class Node {
    #standardClasses = "node border border-dark float-left";

    element(position) {
        const [ROW, COL] = position;
        const ROW_ELEMENT = document.getElementById('board').children[ROW];
        
        if(ROW_ELEMENT) { return ROW_ELEMENT.children[COL]; } // Return the element of the column
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
        return String(position) === String(this.startPosition);
    }

    get startElement() {
        return document.getElementById("start");
    }
    
    get startPosition() {
        if(this.startElement) { return this.position(this.startElement); }
    }

    set startPosition(element) {
        element.id = "start";
        element.className += " fas fa-arrow-right bg-success";
    }

    isEndPosition(position) {
        return String(position) === String(this.endPosition);
    }

    get endElement() {
        return document.getElementById("end");
    }

    get endPosition() {
        if(this.endElement) { return this.position(this.endElement); }
    }

    set endPosition(element) {
        element.id = "end";
        element.className += " fas fa-home bg-danger";

        RUN_BUTTON.disabled = false;
    }

    setStandardAttributes(element) {
        // Empty board position
        const POSITION = this.position(element);
        this.emptyBoardColumn(POSITION);

        if(this.isEndPosition(POSITION)) { RUN_BUTTON.disabled = true; } // If the position is the end position

        element.className = this.#standardClasses;
        element.removeAttribute('id');
    }

    wall(position) {  
        const ELEMENT = this.element(position);

        // If the node is not important
        if(!this.importantNames.includes(ELEMENT.id)) {
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

    async next(position) {    
        const ELEMENT = this.element(position);
        ELEMENT.className = this.#standardClasses;
        ELEMENT.id = "next";

        await this.sleep();
    }

    fastest(position) {  
        const ELEMENT = this.element(position);
        ELEMENT.className = this.#standardClasses;
        ELEMENT.id = "fastest";
    }
}


class Board extends Node {
    constructor() {
        super();
        this.name = "Board";
        this.columnType = "td";
        this.height = document.querySelectorAll('#row').length;
        this.width = document.querySelectorAll('#row')[0].children.length;
        this.list = Array.from({length: this.height}, () => [])
        this.isRunning = false;
        this.importantNames = ['start', 'end'];
        this.speedTypes = {
            slow: 50, 
            normal: 25, 
            fast: 5, 
            instant: 0
        };
        this.speed = this.speedTypes['normal'];
    } 

    get speedTime() {
        return this.speed
    }

    set speedTime(time) {
        if(time in this.speedTypes) { this.speed = this.speedTypes[time]; }
        else if(Number.isInteger(time)) { this.speed = time; }
    }
    
    sleep() {
        if(this.speedTime) { return new Promise(resolve => setTimeout(resolve, this.speedTime)); }
    }

    emptyBoardColumn(position) {
        const [ROW, COL] = position;
        this.list[ROW][COL] = 0;
    }

    fillBoardColumn(position) {
        const [ROW, COL] = position;
        this.list[ROW][COL] = 1;
    }

    clearAlgorithmPath() {
        const CLASSES = ["#found", "#next", "#fastest"];
        this.clearSpecificElements(CLASSES);
    }

    clearWalls() {
        const CLASSES = ["#wall"];
        this.clearSpecificElements(CLASSES);
    }

    clearBoard() {
        const CLASSES = ["#start", "#end"];
        this.clearSpecificElements(CLASSES);
        this.clearAlgorithmPath();
        this.clearWalls();
    }

    clearSpecificElements(classes) {
        if(!this.isRunning) {
            classes = classes.map(classes => `${this.columnType}${classes}`);

            // Change every node with the class to the standard attributes
            document.querySelectorAll(classes).forEach(element => { this.setStandardAttributes(element); });
        }
    }

    makePath(algorithm) {
        if(!this.isRunning && this.startPosition && this.endPosition) {
            this.clearAlgorithmPath();
            this.isRunning = true;
            RUN_BUTTON.disabled = true;

            // Start the pathfinding algorithm
            window[`path${capitalize(algorithm)}`]().then(route => {
                // Make the fastest route
                this.fastestRoute(route).then(() => {
                    this.isRunning = false;
                    RUN_BUTTON.disabled = false;
                });
            });
        }
    }

    async fastestRoute(route) {
        if(route) {
            for(let position of route) { 
                this.fastest(position);
                await this.sleep();
            }
        }
    }

    randomWalls() {
        if(!this.isRunning) {
            document.querySelectorAll(this.columnType).forEach(element => {
                // 33% chance to make the wall if it's not an important node
                if(!this.importantNames.includes(element.id) && Math.random() <= 0.33) {          
                    this.wall(this.position(element));
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
document.querySelectorAll(BOARD.columnType).forEach(nodeElement => {  
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
        
        if(!BOARD.isRunning) {
            if(mouseEvent.buttons === 1) {
                // Update node styling
                const POSITION = BOARD.position(nodeElement);
                BOARD.wall(POSITION);    
            }
            
            else if(mouseEvent.buttons === 4 && !BOARD.importantNames.includes(nodeElement.id)) {
                BOARD.setStandardAttributes(nodeElement); // Update node styling
            }
        }
    });
});