import { Bfs } from './algorithms/bfs.js';
import { Dfs } from './algorithms/dfs.js';
import { Dijkstra } from './algorithms/dijkstra.js';

export class Run {
    constructor(switchSettingsState) {
        this.running = false;
        this._switchSettingsState = switchSettingsState;
        this.unweightedAlgorithms = ["bfs", "dfs"];
    }

    get algorithmName() {
        let name = document.getElementById("algorithm").value.toLowerCase();
        return name;
    }

    get algorithm() {
        switch(this.algorithmName) {
            case "bfs":
                return Bfs;
            case "dfs":
                return Dfs;
            case "dijkstra":
                return Dijkstra;
            default:
                this.running = false;
                this._switchSettingsState(false);
                throw new Error("Algorithm not recognized");
        }
    }

    async run(nodes) {
        let start = document.getElementById("start");
        let end = document.getElementById("end");

        // If a algorithm is running or the start or end node is not placed, return
        if(this.running || !start || !end) { 
            return; 
        }
        this.running = true;
        this._switchSettingsState(true);

        // Run the algorithm
        await new this.algorithm(nodes).run().then(() => {
            this.running = false;
            this._switchSettingsState(false);

        });

    }
}