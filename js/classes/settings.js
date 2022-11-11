import { Board } from "./board/board.js";
import { Run } from "./run.js";

// Set the settings state based on if the algorithm is running
function switchSettingsState(state) {
    runButton.disabled = state;
    updateLayoutButton.disabled = state;
    clearBoardButton.disabled = state;
}   

// Initialize run class
let run = new Run(switchSettingsState);

// Initialize and create board
let row = document.getElementById("exampleRow");
let node = document.getElementById("exampleNode");
let board = new Board(row, node);

// Event listener for run button
let runButton = document.getElementById("run");
runButton.addEventListener("click", () => {
    board.clearAlgorithm();

    let nodes = board.nodes;
    run.run(nodes);
});

// Event listener for update layout button
let updateLayoutButton = document.getElementById("updateLayout");
updateLayoutButton.addEventListener("click", () => {
    board.updateLayout();
});

// Event listener for clear board button
let clearBoardButton = document.getElementById("clearBoard");
clearBoardButton.addEventListener("click", () => {
    board.clear();
});