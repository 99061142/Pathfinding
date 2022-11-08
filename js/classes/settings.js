import { Board } from "./board/board.js";

// Initialize and create board
let row = document.getElementById("exampleRow");
let node = document.getElementById("exampleNode");
let board = new Board(row, node);

// Event listener for run button
let runButton = document.getElementById("run");
runButton.addEventListener("click", () => {

});

// Event listener for update layout button
let updateLayout = document.getElementById("updateLayout");
updateLayout.addEventListener("click", () => {
    board.updateLayout();
});