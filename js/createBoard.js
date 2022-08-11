class CreateBoard {
    constructor() {
        this.board = document.getElementById("board");
        this.standardClassNames = "node border border-dark float-left";
        this.createBoard();
    }

    boardTop() {
        return this.board.getBoundingClientRect().top;
    }

    canAddRow() {
        return this.board.offsetHeight + 34 < window.innerHeight - this.boardTop();
    }

    addRow() {
        let row = document.createElement("tr");
        this.board.appendChild(row);

        while(this.canAddCol(row))  {
            this.addCol(row);
        }
    }

    canAddCol(row) {
        let width = 34;

        for(let col of row.children) {
            if(col.offsetWidth < window.innerWidth) {
                width += col.offsetWidth;
            }
        }
        return width < window.innerWidth;
    }

    addCol(row) {
        let col = document.createElement("td");
        col.className = this.standardClassNames;
        row.appendChild(col);
    }

    createBoard() {
        // create a board with rows and columns until the window width and height is reached
        while(this.canAddRow()) {
            this.addRow();
        }
        
    }
}
new CreateBoard();
