import { Component, createRef } from 'react';
import Cell from './Cell';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            cells: []
        };
        this.rows = 0; // Set when component is mounted (need tableRef)
        this.rowCols = this.maxRowCols;
        this.startPos = null;
        this.endPos = null;
        this.tableRef = createRef(null);
    }

    componentDidMount() {
        this.rows = this.maxRows;

        // Load the board
        this.init();
    }

    init() {
        // Create a 2d list with references that can be used to callback a cell component
        // and set the created 2d list to the board state
        const cells = []
        for (let row = 0; row < this.rows; row++) {
            cells.push([]);
            for (let col = 0; col < this.rowCols; col++) {
                cells[row].push(createRef(null));
            }
        }
        this.cells = cells;
    }

    get cells() {
        const CELLS = this.state.cells;
        return CELLS
    }

    set cells(cells) {
        this.setState({
            cells
        });
    }

    get hasPath() {
        const HAS_PATH = document.querySelector('.cell.visited, .cell.queued, .cell.route');
        return HAS_PATH
    }

    clearWalls() {
        // Clear all the walls
        for (const row of this.state.cells) {
            for (const col of row) {
                const cell = col.current;
                if (cell.type !== "wall") continue
                cell.states = {
                    type: '',
                    weight: 1
                };
            }
        }
    }

    clearWeights() {
        // Clear all the weights
        for (const row of this.state.cells) {
            for (const col of row) {
                const cell = col.current;
                if (!cell.type.includes('weight')) continue
                cell.states = {
                    type: '',
                    weight: 1
                };
            }
        }
    }

    clearPath() {
        const PATH_TYPES = [
            "visited",
            "queued",
            "route"
        ];
        for (const row of this.state.cells) {
            for (const col of row) {
                const cell = col.current;
                for (const pathType of PATH_TYPES) {
                    // If the cell is weighted AND has a path type ( type = weight-[path type] ) set the cell type to 'weight' 
                    // else if the cell type is only a path type ( type = [path type] ) set the cell type to an empty string
                    if (cell.type.includes(pathType)) cell.type = cell.type.includes('weight') ? "weight" : ''
                }
            }
        }
    }

    clearAll() {
        // Clear all the cells except the start and end position
        for (const row of this.state.cells) {
            for (const col of row) {
                const cell = col.current;
                if (
                    cell.type !== "start" &&
                    cell.type !== "end"
                ) {
                    cell.states = {
                        type: '',
                        weight: 1
                    };
                }
            }
        }
    }

    async randomWalls() {
        // CLear the board before creating a new layout
        this.clearAll();

        // Create a new layout with random walls
        for (const row of this.state.cells) {
            for (const col of row) {
                // Set the cell to a weight if the random % is lower than 25% and the cell isn't the start or end position
                const cell = col.current;
                if (
                    Math.random() < .25 &&
                    cell.type !== "start" &&
                    cell.type !== "end"
                ) {
                    cell.states = {
                        type: "wall",
                        weight: Infinity
                    };
                }
            }
        }
    }

    async randomWeights() {
        // CLear the board before creating a new layout
        this.clearAll();

        // Create a new layout with random weights
        for (const row of this.state.cells) {
            for (const col of row) {
                // Set the cell to a wall if the random % is lower than 25% and the cell isn't the start or end position
                const cell = col.current;
                if (
                    Math.random() < .25 &&
                    cell.type !== "start" &&
                    cell.type !== "end"
                ) {
                    cell.states = {
                        type: "weight",
                        weight: 10
                    };
                }
            }
        }
    }

    get maxRows() {
        // The calculation for the max rows of the board is as followed:
        // ( window inner height - starting height of the table ) / cell height - 1
        const CELL_HEIGHT = window.innerHeight / 100 * 3.5;
        const TABLE_REF = this.tableRef.current;
        const BOARD_TOP = TABLE_REF.getBoundingClientRect().top;
        const MAX_BOARD_HEIGHT = window.innerHeight - BOARD_TOP;
        const MAX_ROWS = Math.floor(MAX_BOARD_HEIGHT / CELL_HEIGHT) - 1;
        return MAX_ROWS
    }

    get maxRowCols() {
        // The calculation for the max row columns of the board is as followed:
        // window inner width / cell width - 1
        const CELL_WIDTH = window.innerWidth / 100 * 1.75;
        const MAX_WIDTH = window.innerWidth;
        const MAX_ROW_COLS = Math.floor(MAX_WIDTH / CELL_WIDTH) - 1;
        return MAX_ROW_COLS
    }

    render() {
        const cellInitType = (row, col) => {
            // Return the initialized type of the cell based on the row and column
            const CENTER_ROW = Math.floor(this.rows / 2);
            if (row !== CENTER_ROW) return ''

            const START_COL = Math.floor(this.rowCols * .15);
            if (col === START_COL) return "start"

            const END_COL = Math.floor(this.rowCols * .75);
            if (col === END_COL) return "end"
            return ''
        }

        return (
            <table
                ref={this.tableRef}
                className="my-2 d-flex justify-content-center"
            >
                <tbody>
                    {this.cells.map((rowCols, row) =>
                        <tr
                            key={row}
                        >
                            {rowCols.map((ref, col) =>
                                <Cell
                                    initType={cellInitType(row, col)}
                                    pos={[row, col]}
                                    ref={ref}
                                    key={col}
                                    {...this.props}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default Board;