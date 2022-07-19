import { Board } from "./board.js";

export class Navigation extends Board {
    #algorithms = {
        weighted: {
            dijkstra: "Dijkstra",
            astar: "A*" 
        },
        unweighted: {
            bfs: "BFS",
            dfs: "DFS"
        }
    };


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

        this.runButtonText = this.runButton.value; // Default run button text
        this.speedOptionsText = this.currentSpeedType; // Default speed dropdown text
    }

    algorithmType(algorithm) {
        // Return the type of algorithm (weighted or unweighted)
        for(let key in this.#algorithms) {
            if(this.#algorithms[key].hasOwnProperty(algorithm)) { return key; }
        }
    }

    get currentAlgorithmType() {
        // return algorithm type
        for(let key in this.#algorithms) {
            if(this.#algorithms[key].hasOwnProperty(this.runButtonValue)) { return key; }
        }
    }

    get currentAlgorithmIsWeighted() {
        return this.currentAlgorithmType === "weighted";
    }

    get currentAlgorithmName() {
        return this.algorithmName(this.runButtonValue);
    }

    algorithmName(algorithm) {
        return this.#algorithms[this.algorithmType(algorithm)][algorithm.toLowerCase()];
    }


    get runButtonText() {
        this.runButton.innerText;
    }

    set runButtonText(algorithm) {
        this.runButton.innerText = this.runButton.innerHTML.replace(this.currentAlgorithmName, " ") + this.algorithmName(algorithm);
    }

    get runButtonValue() {
        return this.runButton.value;
    }

    set runButtonValue(value) {
        this.runButton.value = value;
    }

    algorithmOptionsOnclick() {
        // Attach the onclick event for each algorithm option
        document.getElementById("algorithm-options").querySelectorAll("button").forEach(algorithmButton => {
            algorithmButton.onclick = () => {
                if(this.isRunning) { return; }
                if(this.currentAlgorithmIsWeighted) { this.deleteWeightNodes(); }

                let algorithm = algorithmButton.innerText.toLowerCase();
                this.runButtonText = algorithm;
                this.runButtonValue = algorithm;
            }
        });
    }

    get speedOptionsText() {
        return this.speedDropdown.innerText;
    }

    set speedOptionsText(speed) {
        this.speedDropdown.innerText = this.speedDropdown.innerText.replace(capitalize(this.currentSpeedType), " ") + capitalize(speed);
    }

    speedOptionsOnclick() {
        // Attach the onclick event for each speed option
        document.getElementById("speed-options").querySelectorAll("button").forEach(speedButton => {
            speedButton.onclick = () => {
                this.speedOptionsText = speedButton.innerText;
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