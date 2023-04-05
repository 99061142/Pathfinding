import { Component } from "react";

class Algorithm extends Component {
    cellData(pos) {
        const [ROW, COL] = pos;
        const BOARD = this.props.board;
        const CELL_DATA = BOARD[ROW][COL];
        return CELL_DATA
    }

    cellWeight(pos) {
        const CELL_DATA = this.cellData(pos);
        const WEIGHT = CELL_DATA.getWeight();
        return WEIGHT
    }

    cellType(pos) {
        const CELL_DATA = this.cellData(pos);
        const TYPE = CELL_DATA.getType();
        return TYPE
    }

    isStart(pos) {
        const CELL_DATA = this.cellData(pos);
        const TYPE = CELL_DATA.getType();
        return TYPE === "start"
    }

    isEnd(pos) {
        const CELL_DATA = this.cellData(pos);
        const TYPE = CELL_DATA.getType();
        return TYPE === "end"
    }

    canMove(pos) {
        const [ROW, CELL] = pos;
        const BOARD = this.props.board;
        const BOARD_ROWS = BOARD.length;
        const BOARD_COLS = BOARD[0].length;

        // If the position is out of bounds, return false
        if(ROW < 0 || CELL < 0 || ROW >= BOARD_ROWS || CELL >= BOARD_COLS) { 
            return false
        }

        const NOT_MOVABLE_TYPES = ['wall', 'visited', 'next'];
        const CELL_TYPE = this.cellType(pos);
        const CAN_MOVE = !NOT_MOVABLE_TYPES.includes(CELL_TYPE) && !this.isStart(pos);
        return CAN_MOVE
    }

    position(pos, dir) {
        const [POS_ROW, POS_CELL] = pos;
        const [DIR_ROW, DIR_COL] = dir;
        const ROW = POS_ROW + DIR_ROW;
        const CELL = POS_CELL + DIR_COL;
        pos = [ROW, CELL];
        return pos
    }

    async setVisited(pos) {
        const CELL_DATA = this.cellData(pos);
        CELL_DATA.setType('visited');
        await this.sleep();
    }

    setNext(pos) {
        const CELL_DATA = this.cellData(pos);
        CELL_DATA.setType('next');
    }

    async setFastest(pos) {
        const CELL_DATA = this.cellData(pos);
        CELL_DATA.setType('fastest');
        await this.sleep();
    }

    sleep() {
        const MS = 100 - this.props.getSpeed();
        if(MS === 0) { return }
        return new Promise(resolve => setTimeout(resolve, MS));
    }

    async showRoute(route) {
        for(let position of route) {
            await this.setFastest(position);
        }
    }
}

export default Algorithm;