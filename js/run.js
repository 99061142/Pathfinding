import { Bfs } from './pathfinding/bfs.js';
import { Dfs } from './pathfinding/dfs.js';
import { Dijkstra } from './pathfinding/dijkstra.js';
import { Astar } from './pathfinding/aStar.js';

export class Run {
    constructor(switchSettingsState) {
        this._switchSettingsState = switchSettingsState;
    }
    get running() {
        return document.getElementById("run").disabled;
    }

    get algorithmName() {
        let name = document.getElementById("algorithmDropdown").innerText.toLowerCase().trim();
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
            case "a*":
                return Astar;
            default:
                this._switchSettingsState(false);
                throw new Error("Algorithm not recognized");
        }
    }

    async run(nodes) {
        let start = document.getElementById("start");
        let end = document.getElementById("end");

        // If a algorithm is running or the start or end node is not placed, return
        if(this.running || !start || !end) { return; }

        this._switchSettingsState(true);

        // Run the algorithm
        await new this.algorithm(nodes).run().then(() => {
            this._switchSettingsState(false);
        });
    }
}