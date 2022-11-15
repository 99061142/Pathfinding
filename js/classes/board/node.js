export class Node {
    constructor(row, node, index, unweightedAlgorithms) {
        this._runButton = document.getElementById("run");
        this._standardClasses = node.classList;
        this._standardWeight = node.dataset.weight;
        this.styling = null;
        this._row = row;
        this._node = node.cloneNode(true);
        this._index = index;
        this._node.addEventListener("click", this.click.bind(this));
        this._node.addEventListener("mouseover", this.hover.bind(this)); 
        this._unweightedAlgorithms = unweightedAlgorithms;
        this.init();  
    }

    get position() {
        let row = this._row.closest("tr").rowIndex;
        let col = this._index;
        return [row, col];
    }

    get currentWeight() {
        let weight = this._node.dataset.weight;
        weight = parseInt(weight);
        return weight;
    }

    get algorithmRunning() {
        let running = this._runButton.disabled && document.getElementById("end") != null;
        return running;
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

    start() {
        this._node.dataset.weight = 0;
        this._node.id = "start";

        let classList = ["start", "icon"];
        this._node.classList.add(...classList);
        this.styling = "start";
    } 

    end() {
        this._runButton.disabled = false;

        this._node.id = "end";

        let classList = ["end", "icon"];
        this._node.classList.add(...classList);
        this.styling = "end";
    }

    async visited() {
        if(this.isStart() || this.isEnd()) { return; }

        this._node.classList.replace("next", "visited");
        this.styling = "visited";

        await this.sleep();
    }

    next() {
        if(this.isStart() || this.isEnd()) { return; }

        this._node.classList.add("next");
        this.styling = "next";
    }

    async fastest() {
        this._node.classList.replace("visited", "fastest");
        this.styling = "fastest";

        await this.sleep();
    }

    erase() {
        if(this.styling == "end") {
            this._runButton.disabled = true;
        }

        this._node.dataset.weight = this._standardWeight;
        this._node.removeAttribute("id");

        let standardClasses = [...this._standardClasses].join(" ");
        this._node.classList = standardClasses;  
        this.styling = null;
    }

    hover(e) {
        // If the algorithm is running, return
        if(this.algorithmRunning) {
            return;
        }

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
            
            // Return if pencil weight is higher than current weight
            pencilWeight = parseInt(pencilWeight);
            return pencilWeight > this.currentWeight
        }

        let algorithmStyling = ["visited", "next", "fastest"];
        if(algorithmStyling.includes(this.styling)) {
            return true;
        }
        return false;
    }

    addStyling(styling=null) {
        let pencil = document.getElementById("pencil").value;
        styling = styling || pencil

        let algorithm = document.getElementById("algorithm").value.toLowerCase();

        // If node styling can't be overruled, return
        if(!this.overruleStyling(styling) || pencil.includes("weight") && this._unweightedAlgorithms.includes(algorithm)) {
            return
        }

        // Always erase node styling
        this.erase();

        // Add pencil styling
        if(styling == "wall") {
            this.wall();
        }
        else if(styling.includes("weight")) {
            let weight = styling.split("-")[1];
            this.weight(weight);
        }
        else if(styling != "erase") {
            throw new Error("Pencil value not recognized");
        }
    }

    removeStyling(styling) {
        this._node.classList.remove(styling);
    }

    click() {
        // If the algorithm is running, return
        if(this.algorithmRunning) {
            return;
        }

        // If the node is the start or end, erase it
        if(this.styling == "start" || this.styling == "end") {
            this.erase();
            return
        }

        // If the board has no start, set the node as start
        if(!document.getElementById("start")) {   
            this.erase();
            this.start();
            return
        }

        // If the board has no end, set the node as end
        if(!document.getElementById("end")) {
            this.erase();
            this.end();
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
    
    isStart() {
        return this._node.id == "start";
    }

    isEnd() {
        return this._node.id == "end";
    }

    delete() {
        this._row.removeChild(this._node);
    }

    sleep() {
        let speedSlider = document.getElementById("speedSlider");
        let max_speed = speedSlider.max
        let current = speedSlider.value
        let ms = max_speed - current;

        if(ms == 0) { return }
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    init() {
        this._row.appendChild(this._node);
        this.erase();
    }
}