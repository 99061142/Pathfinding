import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    setContent(ROWS, CELLS) {
        // Create / set the board, and add the start and end position
        let board = [];
        for (let row = 0; row < ROWS; row++) {
            board.push([]);
            for (let cell = 0; cell < CELLS; cell++) {
                board[row].push({});
            }
        }
        this.props.setBoard(board);
    }

    updateContent() {
        // If the algorithm is running, return
        if (this.props.running) { return }

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
        this.updateContent();
    }

    randomCells(name) {
        // Set a cell name as parameter name when the random % is lower than .3
        let board = this.props.board
        for (let [rowIndex, row] of board.entries()) {
            for (let [cellIndex, cellData] of row.entries()) {
                let random = Math.random();
                if (random <= .3) {
                    let data = {
                        name
                    };

                    // Get random weight from 0 - 100 when random weights are created
                    if (name === "weight") {
                        data.weight = Math.floor(Math.random() * 100);
                    }

                    let cellName = cellData.name;
                    if (cellName === 'start' || cellName === "end") { continue }
                    this.props.setCellData(data, rowIndex, cellIndex)
                }
            }
        }
    }

    clearCells(names) {
        let deleteAll = names === "all";
        let namesList = names.split(',');
        let board = this.props.board;
        for (let [rowIndex, row] of board.entries()) {
            for (let [cellIndex, cellData] of row.entries()) {
                let cellName = cellData.name;
                let data = {
                    name: null,
                    weight: null
                };
                if (deleteAll || namesList.includes(cellName)) {
                    this.props.setCellData(data, rowIndex, cellIndex);
                }
            }
        }
    }

    render() {
        return (
            <table id="board" className="my-2 d-flex justify-content-center" >
                <tbody>
                    {this.props.board.map((_, rowIndex) =>
                        <tr key={rowIndex}>
                            {this.props.board[rowIndex].map((_, cellIndex) =>
                                <Cell
                                    board={this.props.board}
                                    key={cellIndex}
                                    row={rowIndex}
                                    cell={cellIndex}
                                    running={this.props.running}
                                    startPos={this.props.startPos}
                                    setStartPos={this.props.setStartPos}
                                    endPos={this.props.endPos}
                                    setEndPos={this.props.setEndPos}
                                    setCellData={this.props.setCellData}
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