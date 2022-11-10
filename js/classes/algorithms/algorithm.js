export class Algorithm {
    constructor(nodes) {
        this._nodes = nodes;
        this._dict = this.createDict();
    }

    createDict() {
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

    get startPosition() {
        for(let [rowIndex, row] of Object.entries(this._nodes)) {
            for(let [colIndex, node] of Object.entries(row)) {
                if(node.isStart()) {
                    rowIndex = parseInt(rowIndex);
                    colIndex = parseInt(colIndex);

                    return [rowIndex, colIndex];
                }
            }
        }
    }

    isMovable(position) {
        let [row, col] = position;
    
        if(row < 0 || col < 0 || row >= this._nodes.length || col >= this._nodes[0].length) { 
            return false; 
        }

        if(this._dict[row][col] == 0) {
            return false;
        }
        return true;
    }

    isStart(row, column) {
        let node = this._nodes[row][column];
        return node.isStart();
    }

    isEnd(row, column) {
        let node = this._nodes[row][column];
        return node.isEnd();
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