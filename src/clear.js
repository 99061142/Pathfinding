export async function ClearAll(board) {
    for (let row of board) {
        for(let cell of row) {
            const CELL_TYPE = cell.getType()
            if(CELL_TYPE === 'start' || CELL_TYPE === 'end') { 
                continue 
            }
            if(CELL_TYPE !== '') {
                cell.setType('');
            }
            if(cell.getWeight() !== 1) {
                cell.setWeight(1);
            }
        }
    }
}

export async function ClearPath(board) {
    const PATH_TYPES = ['visited', 'queued', 'fastest'];
    for (let row of board) {
        for(let cell of row) {
            if (!PATH_TYPES.includes(cell.getType())) { 
                continue 
            }
            cell.setType('');
        }
    }
}

export async function ClearWalls(board) {
    for (let row of board) {
        for(let cell of row) {
            if (cell.getType() !== 'wall') { 
                continue
            }
            cell.setType('');
            cell.setWeight(1) 
        }
    }
}

export async function ClearWeights(board) {
    for (let row of board) {
        for(let cell of row) {
            if (cell.getWeight() === 1) { 
                continue
            }
            cell.setWeight(1);
        }
    }
}