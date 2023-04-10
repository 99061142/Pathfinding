import ClearAll from "../clear/clearAll";

async function RandomWalls(cells) {
    // CLear the board before creating a new layout
    await ClearAll(cells);

    for (const cellsRow of cells) {
        for (const cell of cellsRow) {
            // If the percentage is higher than .33, continue
            const PERCENAGE = Math.random();
            if (PERCENAGE > .33 || cell.getType() !== '') { continue }
            cell.setType('wall');
        }
    }
}

export default RandomWalls;