import { Bfs } from './algorithms/bfs.js';

export class Run {
    constructor() {
        this._running = false;
    }

    get algorithm() {
        let algorithm = document.getElementById("algorithm").value.toLowerCase();

        switch(algorithm) {
            case "bfs":
                return Bfs;
            default:
                throw new Error("Algorithm not recognized");
        }

    }

    async run(dict) {
        if(this._running) { return; }

        // Run the algorithm
        await new this.algorithm(dict).run().then(() => {

        });

    }
}