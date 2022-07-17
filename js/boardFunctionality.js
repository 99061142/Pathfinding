import { Navigation } from "./navigation.js";

class BoardFunctionality extends Navigation {
    #weightedAlgorithm = ["dijkstra", "astar"];

    constructor() {
        super();
        this.addEventlisteners();
    }

    addEventlisteners() {
        this.nodes.forEach(nodeElement => {
            this.nodeMouseover(nodeElement);
            this.nodeOnclick(nodeElement)
        });
    }

    mouseoverLeftClick(nodeElement) {
        this.wall(nodeElement);
    }

    mouseoverMiddleClick(nodeElement) {
        if(nodeElement.id != "wall" && this.#weightedAlgorithm.includes(this.runButton.value)) {
            this.weight(nodeElement);
        }
    }

    nodeMouseover(nodeElement) {
        nodeElement.addEventListener("mouseover", mouseEvent => {
            if(!this.isRunning) {
                switch(mouseEvent.buttons){
                    case 1:
                        this.mouseoverLeftClick(nodeElement);
                        break;
                    case 4:
                        this.mouseoverMiddleClick(nodeElement);
                        break;
                }
            }
        });
    }

    clickLeftClick(nodeElement) {
        if(nodeElement.id) { return this.setStandardAttributes(nodeElement); }
        if(!this.startElement){ return this.startPosition = nodeElement; }
        if(!this.endElement) { return this.endPosition = nodeElement; }
        this.wall(nodeElement);
    }

    clickMiddleClick(nodeElement) {
        if(this.#weightedAlgorithm.includes(this.runButton.value)){
            this.weight(nodeElement);
        }
    }

    nodeOnclick(nodeElement) {
        nodeElement.addEventListener("mousedown", mouseEvent => {
            if(!this.isRunning) {
                switch(mouseEvent.buttons){
                    case 1:
                        this.clickLeftClick(nodeElement);
                        break;
                    case 4:
                        this.clickMiddleClick(nodeElement);
                        break;
                }
            }
        });
    }
}
new BoardFunctionality();