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
                }else if(nodeElement.id) {
                    this.setStandardAttributes(nodeElement)
                }else {
                    const POSITION = this.position(nodeElement)
                    this.wall(POSITION);
                }
            }
        }
    }

    nodeMouseover(nodeElement) {
        nodeElement.addEventListener("mouseover", mouseEvent => {
            // Node to wall
            if(!this.isRunning && mouseEvent.buttons === 1) { 
                const POSITION = this.position(nodeElement);
                this.wall(POSITION); 
            }
        });
    }
}
new BoardFunctionality();