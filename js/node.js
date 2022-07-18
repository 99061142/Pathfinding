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
        if(element.id == 'weight') { return; } // Don't set the start position if the element is a weight
        
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
        if(element.id == 'weight') { return; } // Don't set the end position if the element is a weight

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
        element.dataset.distance = 10;
    }

    wall(element) {  
        // If the node is not important
        if(!this.importantNames.includes(element.id)) {
            // set the position on the board to filled
            let position = this.position(element);
            this.fillBoardColumn(position);

            // Change the element to a wall
            element.className = this.standardClasses;
            element.id = "wall";
        }
    }

    weight(element) {
        // If the node is not important
        if(!this.importantNames.includes(element.id)) {
            // set the position on the board to empty
            let position = this.position(element);
            this.emptyBoardColumn(position);

            // Change the element to a weight
            element.id = "weight";
            element.className += " fas fa-solid fa-weight-hanging";
            element.dataset.distance = 50;
        }
    }

    async weightNext(position) {
        const ELEMENT = this.element(position);
        ELEMENT.id = "weightNext";
    }

    async weightFound(position) {
        const ELEMENT = this.element(position);
        ELEMENT.id = "weightFound";
    }

    async weightFastest(element) {
        element.id = "weightFastest";
        await this.sleep(); // wait for the animation to finish
    }


    found(position) {
        let element = this.element(position); 

        if(element.id.includes('weight')) { return this.weightFound(position); }
        element.className = this.standardClasses;
        element.id = "found";
    }

    async next(position) {    
        let element = this.element(position);

        if(element.id.includes('weight')) { return this.weightNext(position); }
        element.className = this.standardClasses;
        element.id = "next";
        await this.sleep();
    }

    async fastest(position) {
        let element = this.element(position);
        
        if(element.id.includes('weight')) { return this.weightFastest(element); }
        element.className = this.standardClasses;
        element.id = "fastest";
        await this.sleep();
    }
}