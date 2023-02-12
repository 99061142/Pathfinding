import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    constructor() {
        super();
        this.state = {
            content: null,
            running: false,
            startPos: null,
            endPos: null,
        }
    }

    setContent(ROWS, CELLS) {
        // If the algorithm is running, return
        if (this.state.running) { return }

        // Add the rows and cells to the table to create the board
        this.setState({
            content: <>
                {[...Array(ROWS)].map((_, row) =>
                    <tr key={row}>
                        {[...Array(CELLS)].map((_, cell) =>
                            <Cell
                                row={row}
                                cell={cell}
                                key={cell}
                                getStartPos={this.getStartPos}
                                setStartPos={this.setStartPos}
                                getEndPos={this.getEndPos}
                                setEndPos={this.setEndPos}
                            ></Cell>
                        )}
                    </tr>
                )}
            </>
        })
    }

    updateContent() {
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
        const ROWS = Math.round(MAX_HEIGHT / 28);
        return ROWS
    }

    getCells() {
        // Get the amount of cells by the max width of the element divided by the cell width
        const MAX_WIDTH = Math.round(window.innerWidth);
        const CELLS = Math.round(MAX_WIDTH / 28);
        return CELLS
    }

    componentDidMount() {
        // When window gets resized, update board
        window.addEventListener('resize', () => this.updateContent())

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
        })
    }

    getEndPos = () => {
        let endPos = this.state.endPos;
        return endPos
    }

    setEndPos = pos => {
        this.setState({
            endPos: pos
        })
    }

    render() {
        return (
            <table id="board" className="my-2 d-flex justify-content-center" >
                <tbody>
                    {this.state.content}
                </tbody>
            </table>
        );
    }
}

export default Board;