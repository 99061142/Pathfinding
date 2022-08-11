var board = document.getElementById("board");
const ROW = 30;
const COL = 80;

function createBoard() {
    for(let i = 0; i <= ROW; i++) {
        let row = document.createElement("tr");
        board.appendChild(row);
        
        for(let j = 0; j <= COL; j++) {
            let col = document.createElement("td");
            col.className = "node border border-dark float-left";
            col.dataset.weight = 10;
            row.appendChild(col);
        }
    }
}
createBoard();
