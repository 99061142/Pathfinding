import { ClearAll } from "../clear";

async function RandomWalls() {
    // CLear the board before creating a new layout
    await ClearAll();

    const CELLS = document.querySelectorAll('td');
    for (const cell of CELLS) {
        // If the percentage is higher than .33, continue
        const PERCENAGE = Math.random();
        if (PERCENAGE > .33 || cell.dataset.type !== '') { continue }
        cell.dataset.type = "wall";
    }
}

export default RandomWalls;