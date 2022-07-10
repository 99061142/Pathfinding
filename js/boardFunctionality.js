import { Navigation } from "./navigation.js";

class BoardFunctionality extends Navigation {
    constructor() {
        super();
        this.addNodelisteners();
    }

    addNodelisteners() {
        this.nodes.forEach(nodeElement => {
            this.nodeOnclick(nodeElement);
            this.nodeMouseover(nodeElement);
        });
    }

    nodeOnclick(nodeElement) {
        nodeElement.onclick = () => { 
            if(!this.isRunning) {
                if(!this.startElement && nodeElement != this.endElement){
                    this.startPosition = nodeElement
                }
                else if(!this.endElement && nodeElement != this.startElement) {
                    this.endPosition = nodeElement
                }else if(nodeElement.id && nodeElement.id != 'wall') {
                    this.setStandardAttributes(nodeElement)
                }else if(nodeElement.id == 'wall') {
                    const POSITION = this.position(nodeElement);
                    this.weight(POSITION)
                }else {
                    const POSITION = this.position(nodeElement);
                    this.wall(POSITION);
                }
            }
        }
    }

    nodeMouseover(nodeElement) {
        nodeElement.addEventListener("mouseover", mouseEvent => {
            if(!this.isRunning && mouseEvent.buttons === 1) { 
                const POSITION = this.position(nodeElement);
                if(nodeElement.id == "wall") { this.weight(POSITION); }
                else { this.wall(POSITION); }
            }
        });
    }
}
new BoardFunctionality();