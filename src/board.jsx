import { Component, createRef } from 'react';
import Cell from './cell';

class Board extends Component {
    constructor() {
        super();
        this.ref = createRef(null);
        this.state = {
            rows: 0,
            cols: 0
        };
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

    maxRows() {
        // Get the max amount of rows by the max height of the board divided by the cell view height
        const BOARD = this.ref.current;
        const TOP = BOARD.getBoundingClientRect().top;
        const MAX_HEIGHT = (window.innerHeight - TOP);
        const CELL_PADDING = ((window.innerHeight / 100) * 1.75) * 2;
        const ROWS = Math.floor(MAX_HEIGHT / CELL_PADDING) - 1;
        return ROWS
    }

    maxCols() {
        // Get the max amount of columns by the max width of the board divided by the cell view height
        const MAX_WIDTH = window.innerWidth;
        const CELL_PADDING = ((window.innerHeight / 100) * 1.75) * 2;
        const COLS = Math.floor(MAX_WIDTH / CELL_PADDING) - 1;
        return COLS
    }

    componentDidMount() {
        // Set the rows/cols to initialize the board
        const MAX_ROWS = this.maxRows()
        this.setRows(MAX_ROWS);
        const MAX_COLS = this.maxCols()
        this.setCols(MAX_COLS);
    }

    initCellType(row, col) {
        // Return the initialized type of the cell based on the row and column 
        const CENTER_ROW = Math.floor(this.state.rows / 2);
        if (row !== CENTER_ROW) {
            return ''
        }
        const START_COL = Math.floor(this.state.cols * .15);
        if (col === START_COL) {
            return 'start'
        }
        const END_COL = Math.floor(this.state.cols * .85);
        if (col === END_COL) {
            return 'end'
        }
        return ''
    }

    render() {
        return (
            <table
                ref={this.ref}
                className='my-2 d-flex justify-content-center'
            >
                <tbody>
                    {[...Array(this.state.rows)].map((_, row) =>
                        <tr
                            key={row}
                        >
                            {[...Array(this.state.cols)].map((_, col) =>
                                <Cell
                                    type={this.initCellType(row, col)}
                                    key={col}
                                    row={row}
                                    col={col}
                                    running={this.props.running}
                                    setRunning={this.props.setRunning}
                                    addCellToBoard={this.props.addCellToBoard}
                                    setStartPos={this.props.setStartPos}
                                    setEndPos={this.props.setEndPos}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

export default Board;