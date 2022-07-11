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
        const POSITION = this.position(nodeElement);
        this.wall(POSITION);
    }

    mouseoverMiddleClick(nodeElement) {
        if(nodeElement.id != 'wall' && this.#weightedAlgorithm.includes(this.runButton.value)) {
            const POSITION = this.position(nodeElement);
            this.weight(POSITION);
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
        if(!this.startElement && nodeElement != this.endElement){
            this.startPosition = nodeElement
        }
        else if(!this.endElement && nodeElement != this.startElement) {
            this.endPosition = nodeElement
        }else if(nodeElement.id) {
            this.setStandardAttributes(nodeElement)
        }else {
            const POSITION = this.position(nodeElement);
            this.wall(POSITION);
        }
    }

    clickMiddleClick(nodeElement) {
        if(this.#weightedAlgorithm.includes(this.runButton.value)){
            const POSITION = this.position(nodeElement);
            this.weight(POSITION);
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