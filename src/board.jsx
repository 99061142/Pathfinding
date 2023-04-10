import { Component, createRef } from "react";
import Cell from './cell'

class Board extends Component {
    constructor() {
        super();
        this.state = {
            rows: 0,
            cols: 0
        }
        this.element = createRef();
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

    initStartPos() {
        // Calculate the starting start position
        const ROW = Math.floor(this.state.rows / 2);
        const COL = Math.floor(this.state.cols * .15);
        const POS = [ROW, COL];
        return POS
    }

    initEndPos() {
        // Calculate the starting end position
        const ROW = Math.floor(this.state.rows / 2);
        const COL = Math.floor(this.state.cols * .85);
        const POS = [ROW, COL];
        return POS
    }

    maxRows() {
        // Get the max amount of rows by the max height of the board divided by the cell view height
        const BOARD = this.element.current;
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

    initCellType(row, col) {
        // Get the initializing type of the cell
        const [START_ROW, START_COL] = this.initStartPos();
        if (row === START_ROW && col === START_COL) {
            return 'start'
        }
        const [END_ROW, END_COL] = this.initEndPos();
        if (row === END_ROW && col === END_COL) {
            return 'end'
        }
        return ''
    }

    render() {
        return (
            <table ref={this.element} className="my-2 d-flex justify-content-center">
                <tbody>
                    {[...Array(this.state.rows)].map((_, row) =>
                        <tr key={row}>
                            {[...Array(this.state.cols)].map((_, col) =>
                                <Cell
                                    type={this.initCellType(row, col)}
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