async function ClearPath(cells) {
    const PATH_TYPES = ["visited", "next", "fastest"];
    for (const cellsRow of cells) {
        for (const cell of cellsRow) {
            const CELL_TYPE = cell.getType();
            if (!PATH_TYPES.includes(CELL_TYPE)) { continue }
            cell.setType('');
        }
    }
}

export default ClearPath;