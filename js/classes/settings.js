import { Board } from "./board/board.js";
import { Run } from "./run.js";

// Initialize run class
let run = new Run(switchSettingsState);

// Initialize and create board
let row = document.getElementById("exampleRow");
let node = document.getElementById("exampleNode");
let board = new Board(row, node);

// Set the settings state based on if the algorithm is running
function switchSettingsState(state) {
    runButton.disabled = state;
}

// Enable or disable settings based on if the algorithm is weighted or unweighted
let weightedOptionElements = document.getElementsByClassName("weightedAlgorithm")
weightedOptionElements = Array.from(weightedOptionElements);
function weightedOptionElementsState(state) {
    // If the state is true (chosen algorithm is weighted), enable the weighted options
    if(state) {
        weightedOptionElements.forEach((option) => {
            option.classList.remove("disabled");
        });
        return
    }    

    weightedOptionElements.forEach((option) => {
        option.classList.add("disabled");
    });
}

// set settings state based on the algorithm when the page loads
const ALGORITHM_NAME = run.algorithmName;
const IS_WEIGHTED = !board.unweightedAlgorithms.includes(ALGORITHM_NAME);
weightedOptionElementsState(IS_WEIGHTED);

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

// Event listener for the clear board options
let clearBoardOptions = document.getElementById("clearOptions");
clearBoardOptions = Array.from(clearBoardOptions.children);
clearBoardOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        e.preventDefault();

        // If the algorithm is running, return
        if(run.running) { return; }

        // Get the clear option
        let clearOption = option.innerText.toLowerCase().replace(" ", "-");

        // Clear specific nodes
        board.clearBoard(clearOption);
    });
});

// Event listener for the algorithm options
let algorithmDropdown = document.getElementById("algorithmDropdown");
let algorithmOptions = document.getElementById("algorithmOptions");
algorithmOptions = Array.from(algorithmOptions.children);
algorithmOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the algorithm name
        let algorithmName = option.innerText;
        let StrippedAlgorithmName = algorithmName.toLowerCase().trim();
        
        // Check if the algorithm is weighted
        let isWeighted = !board.unweightedAlgorithms.includes(StrippedAlgorithmName);
        
        // Update state of settings based on if the algorithm is weighted
        weightedOptionElementsState(isWeighted);

        // Delete all weights if the algorithm is unweighted
        if(!isWeighted && !run.running) {
            board.clearWeights();
        }

        // Update the dropdown text to the algorithm name
        algorithmDropdown.innerText = algorithmName;
    });
});

// Event listener for the pencil options
let pencilDropdown = document.getElementById("pencilDropdown");
let pencilOptions = document.getElementById("pencilOptions");
pencilOptions = Array.from(pencilOptions.children);
pencilOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the pencil name
        let pencilName = option.innerText;

        // Update the dropdown text to the pencil name
        pencilDropdown.innerText = pencilName;
    });
});