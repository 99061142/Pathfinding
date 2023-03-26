import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    setContent(MAX_ROWS, MAX_COLS) {
        // Create the board based on the max rows / cols
        for (let row = 0; row < MAX_ROWS; row++) {
            for (let col = 0; col < MAX_COLS; col++) {
                const POS = [row, col];
                this.props.setCellData(POS, {});
            }
        }
    }

    maxRows() {
        // Get the max amount of rows by the max height of the board divided by the cell view height
        const BOARD = document.getElementById("board");
        const TOP = BOARD.getBoundingClientRect().top;
        const MAX_HEIGHT = (window.innerHeight - TOP);
        const CELL_PADDING = ((window.innerHeight / 100) * 1.75) * 2;
        const ROWS = Math.floor(MAX_HEIGHT / CELL_PADDING) - 1;
        return ROWS
    }

    maxCols() {
        // Get the max amount of cols by the max width of the board divided by the cell view height
        const MAX_WIDTH = window.innerWidth;
        const CELL_PADDING = ((window.innerHeight / 100) * 1.75) * 2;
        const COLS = Math.floor(MAX_WIDTH / CELL_PADDING) - 1;
        return COLS
    }

    componentDidMount() {
        const MAX_ROWS = this.maxRows();
        const MAX_COLS = this.maxCols();
        this.setContent(MAX_ROWS, MAX_COLS);
    }

    clearCells(type, exceptionTypes = []) {
        const PATH_TYPES = ["visited", "next", "fastest"];
        const BOARD = this.props.board;
        for (const [row, cells] of BOARD.entries()) {
            for (const [col, cellData] of cells.entries()) {
                // If the cell doesn't need to be cleared, continue
                if ((type === "wall" && cellData.type !== "wall") || (type === "weight" && cellData.weight === 1) || (type === "path" && !PATH_TYPES.includes(cellData.type)) && type !== "all" || exceptionTypes.includes(cellData.type)) { continue }

                // Clear the cell
                cellData.type = '';
                cellData.weight = 1;
                const POS = [row, col];
                this.props.setCellData(POS, cellData);
            }
        }
    }

    setRandomCells(type) {
        this.clearCells("all", ['start', 'end']);

        const BOARD = this.props.board;
        for (const [row, cells] of BOARD.entries()) {
            for (const [col, cellData] of cells.entries()) {
                // If the percentage is higher than .33, continue
                const PERCENAGE = Math.random();
                if (PERCENAGE > .33 || cellData.type !== '') { continue }

                // Add the new data to the cell
                if (type === "weight") {
                    cellData.weight = Math.floor(Math.random() * 101);
                } else {
                    cellData.type = type;
                }
                const POS = [row, col];
                this.props.setCellData(POS, cellData);
            }
        }
    }

    render() {
        return (
            <table id="board" className="my-2 d-flex justify-content-center">
                <tbody>
                    {this.props.board.map((_, row) =>
                        <tr key={row}>
                            {this.props.board[row].map((_, col) =>
                                <Cell
                                    row={row}
                                    col={col}
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