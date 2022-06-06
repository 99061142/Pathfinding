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
            if(nodeElement === this.startElement || nodeElement === this.endElement) { this.setStandardAttributes(nodeElement); } // Delete start or end position
            else if(!this.startElement) { this.startPosition = nodeElement; } // Add start position
            else if(!this.endElement) { this.endPosition = nodeElement; } // Add end position
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