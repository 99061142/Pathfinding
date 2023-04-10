async function ClearWalls(cells) {
    for (const cellsRow of cells) {
        for (const cell of cellsRow) {
            if (cell.getType() !== 'wall') { continue }
            cell.setType('');
        }
    }
}

export default ClearWalls;