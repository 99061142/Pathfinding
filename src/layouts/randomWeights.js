import { ClearAll } from "../clear";

function RandomWeights() {
    // CLear the board before creating a new layout
    ClearAll();

    const CELLS = document.querySelectorAll('td');
    for (const cell of CELLS) {
        // If the percentage is higher than .33, continue
        const PERCENAGE = Math.random();
        if (PERCENAGE > .33 || cell.dataset.type !== '') { continue }
        cell.dataset.weight = 10;
    }
}

export default RandomWeights;