export class Algorithm {
    constructor(nodes) {
        this._nodes = nodes;
    }

    get dict() {
        let dict = {};
        for(let [rowIndex, row] of Object.entries(this._nodes)) {
            dict[rowIndex] = [];
            for(let node of row) {
                let weight = node.weight;
                dict[rowIndex].push(weight);
            }
        }
        return dict;
    }

    node(row, column) {
        let node = this._nodes[row][column];
        return node;
    }

    sleep() {
        let speedSlider = document.getElementById("speedSlider");
        let max_speed = speedSlider.max
        let current = speedSlider.value
        let ms = max_speed - current;
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}