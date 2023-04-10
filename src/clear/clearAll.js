async function ClearAll(cells) {
    for (const cellsRow of cells) {
        for (const cell of cellsRow) {
            const CELL_TYPE = cell.getType();
            if (CELL_TYPE === '' || CELL_TYPE === 'start' || CELL_TYPE === 'end') { continue }
            cell.setType('');
            if(cell.getWeight() !== 1) {
                cell.setWeight(1);
            }
        }
    }
}

export default ClearAll;