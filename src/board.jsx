import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    constructor() {
        super();
        this.state = {
            rows: 0,
            cols: 0
        }
    }

    setRows(rows) {
        this.setState({
            rows
        });
    }

    setCols(cols) {
        this.setState({
            cols
        });
    }

    componentDidMount() {
        const MAX_ROWS = this.maxRows();
        this.setRows(MAX_ROWS);
        const MAX_COLS = this.maxCols();
        this.setCols(MAX_COLS);
    }

    startingStartPos() {
        // Calculate the starting start position
        const ROW = Math.floor(this.state.rows / 2);
        const COL = Math.floor(this.state.cols * .15);
        const POS = [ROW, COL];
        return POS
    }

    startingEndPos() {
        // Calculate the starting end position
        const ROW = Math.floor(this.state.rows / 2);
        const COL = Math.floor(this.state.cols * .85);
        const POS = [ROW, COL];
        return POS
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

    async clearCells(clear, exceptionTypes = []) {
        const PATH_TYPES = ["visited", "next", "fastest"];
        const BOARD = this.props.board;
        for (const [_, cells] of BOARD.entries()) {
            for (const [_, cell] of cells.entries()) {
                const CELL_TYPE = cell.getType();
                const CELL_WEIGHT = cell.getWeight();

                // If the cell doesn't need to be cleared, continue
                if ((clear === "wall" && CELL_TYPE !== "wall") || (clear === "weight" && CELL_WEIGHT === 1) || (clear === "path" && !PATH_TYPES.includes(CELL_TYPE)) && clear !== "all" || exceptionTypes.includes(CELL_TYPE)) { continue }

                // Clear the cell
                const WEIGHT = (clear === "weight" || clear === "all") ? 1 : CELL_WEIGHT;
                const DATA = {
                    type: '',
                    weight: WEIGHT
                };
                cell.setDataset(DATA);
            }
        }
    }

    async setRandomCells(setType) {
        await this.clearCells("all", ['start', 'end']);

        const BOARD = this.props.board;
        for (const cells of BOARD) {
            for (const cell of cells) {
                // If the percentage is higher than .33, continue
                const PERCENAGE = Math.random();
                if (PERCENAGE > .33 || cell.getType() !== '') { continue }

                // Add the new data to the cell
                const WEIGHT = setType === "weight" ? 10 : 1;
                const DATA = {
                    type: setType,
                    weight: WEIGHT
                };
                cell.setDataset(DATA);
            }
        }
    }

    render() {
        const IS_START = (row, col) => `${row},${col}` === String(this.startingStartPos());
        const IS_END = (row, col) => `${row},${col}` === String(this.startingEndPos());
        return (
            <table id="board" className="my-2 d-flex justify-content-center">
                <tbody>
                    {[...Array(this.state.rows)].map((_, row) =>
                        <tr key={row}>
                            {[...Array(this.state.cols)].map((_, col) =>
                                <Cell
                                    isStart={IS_START(row, col)}
                                    isEnd={IS_END(row, col)}
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