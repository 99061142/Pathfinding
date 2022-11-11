import { Algorithm } from './algorithm.js';

export class Dfs extends Algorithm {
    constructor(nodes) {
        super(nodes);
        this._directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    }

    async run() {

    }
}