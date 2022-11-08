import { Board } from "./board/board.js";

// Initialize and create board
let row = document.getElementById("exampleRow");
let node = document.getElementById("exampleNode");
let board = new Board(row, node);

// Event listener for start button
let startButton = document.getElementById("start");
startButton.addEventListener("click", () => {

});