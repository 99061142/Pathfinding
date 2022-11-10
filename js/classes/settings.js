import { Board } from "./board/board.js";
import { Run } from "./run.js";

// Set the settings state based on if the algorithm is running
function switchSettingsState(state) {
    runButton.disabled = state;
    updateLayoutButton.disabled = state;
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
    let nodes = board.nodes;
    run.run(nodes);
});

// Event listener for update layout button
let updateLayoutButton = document.getElementById("updateLayout");
updateLayoutButton.addEventListener("click", () => {
    board.updateLayout();
});