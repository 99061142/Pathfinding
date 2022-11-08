import { Node } from "./node.js";

export class Board {
    constructor(row, node) {
        this._board = document.getElementById("board");
        this._node = node;
        this._row = row;
        this.nodeHeight = node.offsetHeight;
        this.nodeWidth = node.offsetWidth;
        this.init();
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
        let boardTop = this._board.getBoundingClientRect().top * 1.75;
        let maxHeight = this.maxHeight;
        let height = maxHeight - boardTop;
        let rowChange = Math.floor(height / this.nodeHeight) - 1;
        return rowChange;
    }

    get columnChange() {
        let maxWidth = this.maxWidth;
        let columnChange = Math.floor(maxWidth / this.nodeWidth) - 1;
        return columnChange * 0.75;
    }

    addNode(row) {
        new Node(row, this._node);
    }

    addNodes() {
        let columnChange = this.columnChange;
        let rows = this._board.children;

        for(let row of rows) {
            let currentColumns = row.children.length;
            let columnsAmount = columnChange - currentColumns;

            for(let i = 0; i < columnsAmount; i++) {
                this.addNode(row);
            }
        }
    }

    addRow() {
        let row = this._row.cloneNode(true);
        this._board.appendChild(row);
    }

    addRows() {
        for(let i = 0; i < this.rowChange; i++) {
            this.addRow();
        }
    }


    init() {
        // Remove the node that was already created
        this._node.remove();

        this.addRows();
        this.addNodes();
    }
}