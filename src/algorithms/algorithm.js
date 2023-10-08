import { Component } from "react";

class Algorithm extends Component {
    constructor(props) {
        super(props);
        this.boardRows = props.board.length;
        this.boardCols = props.board.at(0).length;
    }

    neighbours(pos) {
        // Right, down, left, up
        const DIRECTIONS = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ];
        const NEIGHBOURS = DIRECTIONS.map(direction => {
            return direction.map((val, i) => {
                return val + pos[i]
            });
        });
        return NEIGHBOURS
    }

    posOutOfBoundsError(pos) {
        // Throw an error with the information if the row and / or col is out of bounds
        // Even if the row or col isn't out of bounds, the error gets throwed anyway
        const [ROW, COL] = pos;
        let rowOutOfBounds = (ROW < 0 || ROW >= this.boardRows);
        let colOutOfBounds = (COL < 0 || COL >= this.boardCols);
        let error = "The ";
        error += (rowOutOfBounds && colOutOfBounds) ? "row and col" : rowOutOfBounds ? "row" : "col";
        error += " is out of bounds.";
        if(rowOutOfBounds) {
            error += " (row: " + ROW + "/" + this.boardRows + ")";
        }
        if(colOutOfBounds) {
            error += " (col: " + COL + "/" + this.boardCols + ")";
        }
        throw RangeError(error);
    }

    isStartPos(pos) {
        const [START_ROW, START_COL] = this.props.startPos;
        const [ROW, COL] = pos;
        if(ROW === START_ROW && COL === START_COL) {
            return true
        }
        return false
    }

    isEndPos(pos) {
        const [END_ROW, END_COL] = this.props.endPos;
        const [ROW, COL] = pos;
        if(ROW === END_ROW && COL === END_COL) {
            return true
        }
        return false
    }

    cellData(pos) {
        const BOARD = this.props.board;
        const [ROW, COL] = pos;
        const CELL_DATA = BOARD[ROW][COL];
        return CELL_DATA
    }

    cellWeight(pos) {
        const CELL = this.cellData(pos);
        const WEIGHT = Number(CELL.getWeight());
        return WEIGHT
    }

    cellType(pos) {
        const CELL = this.cellData(pos);
        const TYPE = CELL.getType();
        return TYPE
    }

    cellInBounds(pos) {
        const BOARD = this.props.board;
        const [ROW, COL] = pos;
        if (
            ROW < 0 ||
            COL < 0 ||
            ROW >= BOARD.length ||
            COL >= BOARD.at(0).length
        ) {
            return false
        }
        return true
    }

    setCellType(pos, type) {
        const CELL_DATA = this.cellData(pos);
        CELL_DATA.setType(type);
    }

    async setVisited(pos) {
        this.setCellType(pos, "visited");
        await this.sleep();
    }

    setQueued(pos) {
        this.setCellType(pos, "queued");
    }

    async setFastest(pos) {
        this.setCellType(pos, "fastest");
        await this.sleep();
    }

    sleep() {
        const MS = 100 - this.props.getSpeed();
        return new Promise((resolve) => setTimeout(resolve, MS));
    }

    async showRoute(route) {
        for (const pos of route) {
            await this.setFastest(pos);
        }
    }
}

export default Algorithm;