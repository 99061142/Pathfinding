import { Bfs } from './algorithms/bfs.js';

export class Run {
    constructor(switchSettingsState) {
        this._running = false;
        this._switchSettingsState = switchSettingsState;
    }

    get algorithm() {
        let algorithm = document.getElementById("algorithm").value.toLowerCase();

        switch(algorithm) {
            case "bfs":
                return Bfs;
            default:
                this._running = false;
                this._switchSettingsState(false);
                throw new Error("Algorithm not recognized");
        }
    }

    async run(dict, nodes) {
        let start = document.getElementById("start");
        let end = document.getElementById("end");

        // If a algorithm is running or the start or end node is not placed, return
        if(this._running || !start || !end) { 
            return; 
        }
        this._running = true;
        this._switchSettingsState(true);

        // Run the algorithm
        await new this.algorithm(dict, nodes).run().then(() => {
            this._running = false;
            this._switchSettingsState(false);

        });

    }
}