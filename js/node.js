export class Node {
    element(position) {
        const [ROW, COL] = position;
        const ROW_ELEMENT = document.getElementById('board').children[ROW];
        
        if(ROW_ELEMENT) { return ROW_ELEMENT.children[COL]; } // Return the element if it exists
    }

    position(element) {
        const ROW_ELEMENT = element.parentElement;
        const ROW = Array.from(document.getElementById('board').children).indexOf(ROW_ELEMENT);
        const COL = Array.from(ROW_ELEMENT.children).indexOf(element);

        return [ROW, COL]; // Return the position of the element
    }

    empty(position) {
        const [ROW, COL] = position;

        return this.list[ROW] && this.list[ROW][COL] === 0; // Return if the position is empty on the board
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
        // Change the element to the start node
        element.id = "start";
        element.className += " fas fa-arrow-right bg-success";

        if(this.endPosition) { this.runButton.disabled = false; }
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
        // Change the element to the end node
        element.id = "end";
        element.className += " fas fa-home bg-danger";
        
        if(this.startPosition) { this.runButton.disabled = false; }
    }

    setStandardAttributes(element) {
        // Disable the button when the start or end position is not on the board
        if(element === this.startElement || element === this.endElement){ this.runButton.disabled = true; }
        
        // set the position on the board to empty
        const POSITION = this.position(element);
        this.emptyBoardColumn(POSITION);

        // set the element to the standard attributes
        element.className = this.standardClasses;
        element.id = "";
        element.dataset.distance = 1;
    }

    wall(position) {  
        const ELEMENT = this.element(position);

        // If the node is not important
        if(!this.importantNames.includes(ELEMENT.id)) {
            // Change the element to a wall
            ELEMENT.className = this.standardClasses;
            ELEMENT.id = "wall";
            this.fillBoardColumn(POSITION); // set the position on the board to filled
        }
    }

    weight(position) {
        const ELEMENT = this.element(position);

        // If the node is not important
        if(!this.importantNames.includes(ELEMENT.id)) {
            this.emptyBoardColumn(position); // set the position on the board to empty

            // Change the element to a weight
            ELEMENT.id = "weight";
            ELEMENT.className += " fas fa-solid fa-weight-hanging";
            ELEMENT.dataset.distance = 5;
        }
    }

    found(position) {
        // Change the element to a found node
        const ELEMENT = this.element(position); 
        ELEMENT.className = this.standardClasses;
        ELEMENT.id = "found";
    }

    async next(position) {    
        // Change the element to a next node
        const ELEMENT = this.element(position);
        ELEMENT.className = this.standardClasses;
        ELEMENT.id = "next";

        await this.sleep(); // wait for the animation to finish
    }

    async fastest(position) {  
        // Change the element to a fastest node
        const ELEMENT = this.element(position);
        ELEMENT.className = this.standardClasses;
        ELEMENT.id = "fastest";

        await this.sleep(); // wait for the animation to finish
    }
}