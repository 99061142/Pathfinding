import { ClearAll } from "../clear";

async function RandomWeights(board) {
    // CLear the board before creating a new layout
    await ClearAll(board);

    for (let row of board) {
        for(let cell of row) {
            if(cell.getType() !== '' || Math.random() > .15) { 
                continue
            }
            cell.setWeight(10);
        }
    }
}

export default RandomWeights;