export async function ClearAll(board) {
    for (let row of board) {
        for(let cell of row) {
            // If the cell is the start or end position, continue
            const CELL_TYPE = cell.getType();
            if(CELL_TYPE === "start" || CELL_TYPE === "end") { 
                continue 
            }
            // Clear the cell
            cell.setType('');
            cell.setWeight(1);
        }
    }
}

export async function ClearPath(board) {
    const PATH_TYPES = ["visited", "queued", "fastest"];
    for (let row of board) {
        for(let cell of row) {
            // If the cell type isn't one of the values inside PATH_TYPES, continue
            const CELL_TYPE = cell.getType();
            if (!PATH_TYPES.includes(CELL_TYPE)) { 
                continue
            }
            // Clear the cell
            cell.setType('');
        }
    }
}

export async function ClearWalls(board) {
    for (let row of board) {
        for(let cell of row) {
            // If the cell type isn't "weight", continue
            const CELL_TYPE = cell.getType();
            if (CELL_TYPE !== "wall") { 
                continue
            }
            // Clear the cell
            cell.setType('');
            cell.setWeight(1);
        }
    }
}

export async function ClearWeights(board) {
    for (let row of board) {
        for(let cell of row) {
            // If the cell is weighted, clear the cell
            if (cell.getWeight() === 10) { 
                cell.setWeight(1);
            }
        }
    }
}