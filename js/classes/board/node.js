export class Node {styling
    constructor(row, node) {
        this._standardClasses = node.classList;
        this._standardWeight = node.dataset.weight;
        this._row = row;
        this._node = node.cloneNode(true);
        this.styling = null;
        this._node.addEventListener("click", this.click.bind(this));
        this._node.addEventListener("mouseover", this.hover.bind(this));  
        this.init();  
    }

    get index() {
        let index = this._node.cellIndex;
        return index;
    }

    wall() {
        this._node.dataset.weight = 0;
        this._node.classList.add("wall");
        this.styling = "wall";
    }

    weight(weight) {
        this._node.dataset.weight = weight;
        this._node.classList.add("weight");
        this.styling = "weight";
    }

    set start(element) {
        let classList = ["start", "icon"];
        element.classList.add(...classList);
        this.styling = "start";
    } 

    set end(element) {
        let classList = ["end", "icon"];
        element.classList.add(...classList);
        this.styling = "end";
    }

    erase() {
        this._node.dataset.weight = this._standardWeight;
        this._node.removeAttribute("id");

        let standardClasses = [...this._standardClasses].join(" ");
        this._node.classList = standardClasses;    
        this.styling = null;
    }

    hover(e) {
        let button = e.buttons;

        // Left click
        if(button === 1) {
            this.addStyling();
        }
    }

    overruleStyling(pencil) {
        // If node styling and pencil are the same, return false
        if(pencil == this.styling) {
            return false;
        }

        // If node is the start or end, return false
        if(this.styling == "start" || this.styling == "end") {
            return false;
        }

        // If node has no styling and pencil is erase, return true
        if(pencil == "erase" && this.styling != null) {
            return true;
        }

        // If node has no styling, return true
        if(this.styling == null) {
            return true
        }

        // If node styling is wall and pencil is weight, return true
        if(this.styling == "wall" && pencil.includes("weight")) {
            return true;
        }

        // If node styling is weight and pencil is weight, compare weights
        if(pencil.includes("weight")) {
            let pencilWeight = pencil.split("-")[1];
            let currentWeight = this._node.dataset.weight;
            
            // Return if pencil weight is higher than current weight
            pencilWeight = parseInt(pencilWeight);
            currentWeight = parseInt(currentWeight);
            return pencilWeight > currentWeight
        }
        return false;
    }


    addStyling(styling=null) {
        let pencil = styling || document.getElementById("pencil").value.toLowerCase();

        // If node styling can't be overruled, return
        if(!this.overruleStyling(pencil)) {
            return
        }

        // Always erase node styling
        this.erase();

        // Add pencil styling
        if(pencil == "wall") {
            this.wall();
        }
        else if(pencil.includes("weight")) {
            let weight = pencil.split("-")[1];
            this.weight(weight);
        }
        else if(pencil != "erase") {
            throw new Error("Pencil value not recognized");
        }
    }

    click() {
        // If the node is the start or end, erase it
        if(this.styling == "start" || this.styling == "end") {
            this.erase();
            return
        }

        // If the board has no start, set the node as start
        if(!this.start) {   
            this.erase();
            this.start = this._node;
            return
        }

        // If the board has no end, set the node as end
        if(!this.end) {
            this.erase();
            this.end = this._node;
            return
        }

        // If the node has styling, erase it
        if(this.styling != null) {
            this.erase();
            return
        }

        // If the node has no styling, add pencil styling
        this.addStyling();
    }

    init() {
        this._row.appendChild(this._node);
        this.erase();
    }

    delete() {
        this._row.removeChild(this._node);
    }

    get start() {   
        // Start element on the board
        let board = document.getElementById("board");
        let start = board.querySelector(".start");
        return start;
    }

    get end() {
        // End element on the board
        let board = document.getElementById("board");
        let end = board.querySelector(".end");
        return end
    }
}