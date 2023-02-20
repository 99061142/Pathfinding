import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    constructor() {
        super();
        this.state = {
            rows: 0,
            cells: 0,
        };
    }

    setContent(ROWS, CELLS) {
        this.setState({
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
        // Get the amount of rows by the max height of the board divided by the cell height
        const BOARD = document.getElementById("board");
        const TOP = Math.round(BOARD.getBoundingClientRect().top);
        const MAX_HEIGHT = Math.round(window.innerHeight - TOP);
        const ROWS = Math.round(MAX_HEIGHT / 29);
        return ROWS
    }

    getCells() {
        // Get the amount of cells by the max width of the board divided by the cell width
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

    render() {
        return (
            <table id="board" className="my-2 d-flex justify-content-center" >
                <tbody>
                    {[...Array(this.state.rows)].map((_, rowIndex) =>
                        <tr key={rowIndex}>
                            {[...Array(this.state.cells)].map((_, cellIndex) =>
                                <Cell
                                    key={cellIndex}
                                    row={rowIndex}
                                    cell={cellIndex}
                                    running={this.props.running}
                                    startPos={this.props.startPos}
                                    setStartPos={this.props.setStartPos}
                                    endPos={this.props.endPos}
                                    setEndPos={this.props.setEndPos}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table >
        );
    }
}

export default Board;