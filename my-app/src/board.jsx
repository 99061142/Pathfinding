import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    constructor() {
        super();
        this.state = {
            running: false,
            startPos: null,
            endPos: null,
            board: [],
            rows: 0,
            cells: 0
        };
    }

    setContent(ROWS, CELLS) {
        let board = [];
        for (let rowIndex = 0; rowIndex <= ROWS; rowIndex++) {
            board.push([]);
            for (let cellIndex = 0; cellIndex <= CELLS; cellIndex++) {
                const CELL = <Cell
                    key={cellIndex}
                    row={rowIndex}
                    cell={cellIndex}
                    running={this.algorithmRunning}
                    getStartPos={this.getStartPos}
                    setStartPos={this.setStartPos}
                    getEndPos={this.getEndPos}
                    setEndPos={this.setEndPos}
                ></Cell>
                board[rowIndex].push(CELL)
            }
        }

        this.setState({
            board: board,
            rows: ROWS,
            cells: CELLS
        })
    }

    updateContent() {
        // If the algorithm is running, return
        if (this.state.running) { return }

        // Create the board
        const CELLS = this.getCells();
        const ROWS = this.getRows();
        this.setContent(ROWS, CELLS);
    }

    getRows() {
        // Get the amount of rows by the max height of the element divided by the cell height
        const BOARD = document.getElementById("board");
        const TOP = Math.round(BOARD.getBoundingClientRect().top);
        const MAX_HEIGHT = Math.round(window.innerHeight - TOP);
        const ROWS = Math.round(MAX_HEIGHT / 29);
        return ROWS
    }

    getCells() {
        // Get the amount of cells by the max width of the element divided by the cell width
        const MAX_WIDTH = Math.round(window.innerWidth);
        const CELLS = Math.round(MAX_WIDTH / 29);
        return CELLS
    }

    componentDidMount() {
        // When window gets resized, update board
        window.addEventListener('resize', () => this.updateContent());

        // Update board when initializing
        this.updateContent();
    }

    getStartPos = () => {
        let startPos = this.state.startPos;
        return startPos
    }

    setStartPos = pos => {
        this.setState({
            startPos: pos
        });
    }

    getEndPos = () => {
        let endPos = this.state.endPos;
        return endPos
    }

    setEndPos = pos => {
        this.setState({
            endPos: pos
        });
    }

    algorithmRunning = () => {
        let running = this.state.running;
        return running
    }

    render() {
        return (
            <table id="board" className="my-2 d-flex justify-content-center" >
                <tbody>
                    {[...Array(this.state.rows)].map((_, row) =>
                        <tr key={row}>
                            {[...Array(this.state.cells)].map((_, cell) =>
                                this.state.board[row][cell]
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default Board;