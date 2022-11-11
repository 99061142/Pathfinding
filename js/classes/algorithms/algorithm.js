export class Algorithm {
    constructor(nodes) {
        this._nodes = nodes;
    }

    get startPosition() {
        let start = document.getElementById("start");
        let rowIndex = start.closest("tr").rowIndex;
        let colIndex = start.cellIndex;
        return [rowIndex, colIndex];
    }

    get endPosition() {
        let end = document.getElementById("end");
        let rowIndex = end.closest("tr").rowIndex;
        let colIndex = end.cellIndex;
        return [rowIndex, colIndex];
    }

    inBoard(position) {
        let [row, col] = position;
        let rowLength = Object.keys(this._nodes).length;
        let colLength = this._nodes[0].length;
        
        if(row < 0 || col < 0 || row >= rowLength || col >= colLength) { 
            return false; 
        }
        return true;
    }

    isMovable(position) {
        if(!this.inBoard(position)) { return false; }

        let [row, col] = position;
        let node = this._nodes[row][col];
        let weight = node.currentWeight;
        return weight != 0;
    }

    position(pos1, pos2) {
        let [row1, col1] = pos1;
        let [row2, col2] = pos2;

        let row = row1 + row2;
        let col = col1 + col2;
        let position = [row, col];
        return position;
    }

    node(position) {
        let [row, col] = position;
        let node = this._nodes[row][col];
        return node;
    }

    async showRoute(route) {
        for(let position of route) {
            let node = this.node(position);
            await node.fastest(position);
        }
    }
}