const getCells = () => document.querySelectorAll('td');

export function ClearAll() {
    for (const cell of getCells()) {
        const CELL_TYPE = cell.dataset.type;
        const CELL_WEIGHT = Number(cell.dataset.weight);
        if ((CELL_TYPE === '' && CELL_WEIGHT === 1) || CELL_TYPE === 'start' || CELL_TYPE === 'end') { continue }
        
        if(CELL_TYPE !== '') {
            cell.dataset.type = '';
        }
        if(CELL_WEIGHT !== 1) {
            cell.dataset.weight = 1;
        }
    }
}

export async function ClearPath() {
    const PATH_TYPES = ["visited", "next", "fastest"];
    for (const cell of getCells()) {
        if (!PATH_TYPES.includes(cell.dataset.type)) { continue }
        cell.dataset.type = '';
    }
}

export async function ClearWalls() {
    for (const cell of getCells()) {
        if (cell.dataset.type !== 'wall') { continue }
        cell.dataset.type = '';
    }
}

export async function ClearWeights() {
    for (const cell of getCells()) {
        const CELL_WEIGHT = Number(cell.dataset.weight)
        if (CELL_WEIGHT === 1) { continue }
        cell.dataset.weight = 1;
    }
}