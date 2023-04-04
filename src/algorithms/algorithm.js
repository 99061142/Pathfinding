import { Component } from "react";

class Algorithm extends Component {
    cellData(pos) {
        const [ROW, CELL] = pos;
        const BOARD = this.props.board;
        const CELL_DATA = BOARD[ROW][CELL];
        return CELL_DATA
    }

    cellWeight(pos) {
        const CELL_DATA = this.cellData(pos);
        const WEIGHT = CELL_DATA.weight;
        return WEIGHT
    }

    cellType(pos) {
        const CELL_DATA = this.cellData(pos);
        const TYPE = CELL_DATA.type;
        return TYPE
    }

    isStart(pos) {
        const [ROW, CELL] = pos;
        const [START_ROW, START_CELL] = this.props.startPos;
        const IS_START = ROW === START_ROW && CELL === START_CELL;
        return IS_START
    }

    isEnd(pos) {
        const [ROW, CELL] = pos;
        const [END_ROW, END_CELL] = this.props.endPos;
        const IS_END = ROW === END_ROW && CELL === END_CELL;
        return IS_END
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
        const [DIR_ROW, DIR_CELL] = dir;
        const ROW = POS_ROW + DIR_ROW;
        const CELL = POS_CELL + DIR_CELL;
        pos = [ROW, CELL];
        return pos
    }

    async setVisited(pos) {
        this.props.setCellData(pos, {type: 'visited'});
        await this.sleep();
    }

    
    setNext(pos) {
        this.props.setCellData(pos, {type: 'next'});
    }

    async setFastest(pos) {
        this.props.setCellData(pos, {type: 'fastest'});
        await this.sleep();
    }

    sleep() {
        const MAX_SPEED = this.props.maxSpeed;
        const MS = MAX_SPEED - this.props.getSpeed();
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