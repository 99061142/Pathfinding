import { Board } from "./board/board.js";
import { Run } from "./run.js";

// Set the settings state based on if the algorithm is running
function switchSettingsState(state) {
    runButton.disabled = state;
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

// Event listener for the board layout options
let layoutOptions = document.getElementById("layoutOptions").children;
layoutOptions = Array.from(layoutOptions);
layoutOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        e.preventDefault();
        
        // If the algorithm is running, return
        if(run.running) { return; }
        
        // Get the layout name
        let layout = option.innerText.toLowerCase().replace(" ", "-");

        // Don't use weight layouts when the algorithm is unweighted
        if(layout.includes("weight") && board.unweightedAlgorithms.includes(run.algorithmName)) { return }

        // Update the layout
        board.updateLayout(layout)
    });
});

// Event listener for clear board button
let clearBoardButton = document.getElementById("clearBoard");
clearBoardButton.addEventListener("click", () => {
    board.clear();
});