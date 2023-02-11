import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0,
            cells: 0,
            content: <></>,
            run: false
        }
        window.addEventListener('resize', () => this.updateContent())
    }

    setRows(ROWS) {
        this.setState({
            rows: ROWS
        });
    }

    setCells(CELLS) {
        this.setState({
            rows: CELLS
        });
    }

    setContent(ROWS, CELLS) {
        // If the algorithm is running, return
        if (this.state.run) { return }

        // Add the rows and cells to the table to create the board
        this.setState({
            content: <>
                {[...Array(ROWS)].map((_, row) =>
                    <tr key={row}>
                        {[...Array(CELLS)].map((_, cell) =>
                            <Cell
                                key={cell}
                                row={row}
                                cell={cell}
                            ></Cell>
                        )}
                    </tr>
                )}
            </>
        })
    }

    updateContent() {
        // Get the max height and width of the board to calculate how many rows and cells the board needs, then create the board
        const BOARD = document.getElementById("board");
        const TOP = Math.round(BOARD.getBoundingClientRect().top);
        const MAX_HEIGHT = Math.round(window.innerHeight - TOP);
        const MAX_WIDTH = Math.round(window.innerWidth);
        const ROWS = Math.round(MAX_HEIGHT / 25);
        const CELLS = Math.round(MAX_WIDTH / 25);
        this.setRows(ROWS);
        this.setCells(CELLS);
        this.setContent(ROWS, CELLS);
    }

    componentDidMount() {
        this.updateContent();
    }

    render() {
        return (
            <table id="board" className="my-2 d-flex justify-content-center" >
                <tbody>
                    {this.state.content}
                </tbody>
            </table >
        );
    }
}

export default Board;