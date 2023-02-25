import { Component } from "react";
import Cell from './cell'

class Board extends Component {
    async setContent(ROWS, CELLS) {
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

    async updateContent() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Create the board
        const CELLS = this.getCells();
        const ROWS = this.getRows();
        await this.setContent(ROWS, CELLS);

        // Add start / end position
        const MID_ROW = Math.round(ROWS / 2);
        const START_CELL = Math.round(CELLS * .15);
        const END_CELL = Math.round(CELLS * .85);
        this.props.setCellData({ name: 'start' }, MID_ROW, START_CELL);
        this.props.setCellData({ name: 'end' }, MID_ROW, END_CELL);
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
        // Set a cell name as parameter name when the random % is lower than .3 and isn't the start or end position
        let board = this.props.board
        for (let [rowIndex, row] of board.entries()) {
            for (let [cellIndex, cellData] of row.entries()) {
                let random = Math.random();
                let cellName = cellData.name
                if (random > .3 || cellName === 'start' || cellName === "end") { continue }

                let randomWeight = Math.floor(Math.random() * 100);
                let weight = name === "weight" ? randomWeight : 1
                let data = {
                    name,
                    weight
                };
                this.props.setCellData(data, rowIndex, cellIndex)
            }
        }
    }

    clearCells(name) {
        const DELETE_ALL = name === "all";
        const DELETE_PATH = name === "path";
        const PATH_NAMES = ['next', 'visited', 'fastest'];
        const BOARD = this.props.board;

        for (let [rowIndex, row] of BOARD.entries()) {
            for (let [cellIndex, cellData] of row.entries()) {
                let cellWeight = cellData.weight
                let cellName = cellData.name

                if (name === cellName || DELETE_ALL && cellName != "start" && cellName != "end" || DELETE_PATH && PATH_NAMES.includes(cellName) || name === "weight" && cellWeight > 1) {
                    cellWeight = name !== "weight" ? cellWeight : 1
                    cellName = cellWeight === 1 ? '' : 'weight';
                    const DATA = {
                        name: cellName,
                        weight: cellWeight
                    };
                    this.props.setCellData(DATA, rowIndex, cellIndex);
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
                                    row={rowIndex}
                                    cell={cellIndex}
                                    key={cellIndex}
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