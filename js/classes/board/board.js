import { Node } from "./node.js";

export class Board {
    constructor(row, node) {
        this._board = document.getElementById("board");
        this._node = node;
        this.nodes = {};
        this._row = row;
        this.nodeHeight = node.offsetHeight;
        this.nodeWidth = node.offsetWidth;
        this.init();
    }

    get dict() {
        let dict = {};
        let rows = this._board.children;

        for(let [i, row] of Object.entries(rows)) {
            dict[i] = [];

            let nodes = row.children;
            for(let node of nodes) {
                let weight = node.dataset.weight;
                weight = parseInt(weight);
                dict[i].push(weight);
            }
        }
        return dict;
    }

    get maxWidth() {
        let width = window.innerWidth;
        return width;
    }

    get maxHeight() {
        let height = window.innerHeight;
        return height;
    }

    get rowChange() {
        let boardTop = this._board.getBoundingClientRect().top * 1.3;
        let maxHeight = this.maxHeight;
        let height = maxHeight - boardTop;
        let rowChange = Math.floor(height / this.nodeHeight) - 1;
        return rowChange;
    }

    get columnChange() {
        let maxWidth = this.maxWidth;
        let columnChange = Math.floor(maxWidth / this.nodeWidth) - 1;
        return columnChange * 0.9;
    }

    addNode(row, rowIndex, nodeIndex) {
        let node = new Node(row, this._node, nodeIndex);
        this.nodes[rowIndex].push(node)
    }

    addNodes() {
        let columnChange = this.columnChange;
        let rows = this._board.children;

        for(let [rowIndex, row] of Object.entries(rows)) {
            let currentColumns = row.children.length;
            let columnsAmount = columnChange - currentColumns;

            this.nodes[rowIndex] = [];
            for(let nodeIndex = 0; nodeIndex < columnsAmount; nodeIndex++) {
                this.addNode(row, rowIndex, nodeIndex);
            }
        }
    }

    addRow() {
        let row = this._row.cloneNode(true);
        row.removeAttribute("id");
        this._board.appendChild(row);
    }

    addRows() {
        for(let i = 0; i < this.rowChange; i++) {
            this.addRow();
        }
    }

    randomWalls() {
        let nodes = this.nodes;

        for(let row of Object.values(nodes)) {
            for(let node of row) {
                let random = Math.random();
                if(random < 0.33) {
                    node.addStyling('wall');
                }
            }
        }
    }

    updateLayout() {
        let layout = document.getElementById("layout").value;

        switch(layout) {
            case "random-walls":
                this.randomWalls();
                break;
            default:
                throw new Error("Layout not found");
        }
    }

    init() {
        // Remove the node that was already created
        this._node.remove();

        // Initialize the board
        this.addRows();
        this.addNodes();
    }
}