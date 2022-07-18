import { Board } from "./board.js";

export class Navigation extends Board {
    #weightedAlgorithms = ["dijkstra", "astar"];

    constructor() {
        super();
        this.speedDropdown = document.getElementById("speed-dropdown");
        this.runButton = document.getElementById("run-button");
        
        // Attach the event listeners for every button on the nav bar
        this.algorithmOptionsOnclick();
        this.speedOptionsOnclick();
        this.runButtonOnclick();
        this.clearBoardOnclick();
        this.clearWallsOnclick();
        this.clearAlgorithmPathOnclick();
        this.randomWallsOnclick();

        // Change the text of the run/speed button to its default value
        this.runButtonText();
        this.speedOptionsText();
    }

    runButtonText(algorithm=null) {
        // If the algorithm is not specified, then it is the first time the function is called
        if(!algorithm) { 
            this.runButton.innerHTML += this.runButton.value.toUpperCase(); 
        }
        else {
            // Replace the current algorithm with the new one
            this.runButton.innerText = this.runButton.innerText.replace(this.runButton.value.toUpperCase(), algorithm.toUpperCase());
        }
    }

    speedOptionsText(speedType=null) {
        // If the speed type is not specified, then it is the first time the function is called
        if(!speedType) { 
            this.speedDropdown.innerText += capitalize(this.currentSpeedType);
        }
        else {
            // Replace the current speed type with the new one
            this.speedDropdown.innerText = this.speedDropdown.innerText.replace(capitalize(this.currentSpeedType), speedType);
        }
    }

    algorithmOptionsOnclick() {
        // Attach the onclick event for each algorithm option
        document.getElementById("algorithm-options").querySelectorAll("button").forEach(algorithmButton => {
            algorithmButton.onclick = () => {
                if(!this.#weightedAlgorithms.includes(algorithmButton.value)) { this.deleteWeightNodes(); }

                this.runButtonText(algorithmButton.innerText);
                this.runButton.value = algorithmButton.innerText.toLowerCase();
            }
        });
    }

    speedOptionsOnclick() {
        // Attach the onclick event for each speed option
        document.getElementById("speed-options").querySelectorAll("button").forEach(speedButton => {
            speedButton.onclick = () => {
                this.speedOptionsText(speedButton.innerText);
                this.currentSpeedType = speedButton.innerText.toLowerCase();
            }
        });
    }

    runButtonOnclick() {
        this.runButton.onclick = () => this.makePath(this.runButton.value); // Run the algorithm
    }

    clearBoardOnclick() {
        document.getElementById("clear-board").onclick = () => this.clearBoard();
    }

    clearWallsOnclick() {
        document.getElementById("clear-walls").onclick = () => this.clearWalls();
    }

    clearAlgorithmPathOnclick() {
        document.getElementById("clear-path").onclick = () => this.clearAlgorithmPath();
    }

    randomWallsOnclick() {
        document.getElementById("random-walls").onclick = () => this.randomWalls(); // Create random walls
    }
}