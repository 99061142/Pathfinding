async function ClearWeights(cells) {
    for (const cellsRow of cells) {
        for (const cell of cellsRow) {
            if (cell.getWeight() === 1) { continue }
            cell.setType('');
            cell.setWeight(1);
        }
    }
}

export default ClearWeights;