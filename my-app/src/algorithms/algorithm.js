import { Component } from "react";

class Algorithm {
    constructor(props) {
        this.props = props
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
        const MAX_ROWS = this.props.board.length;
        const MAX_CELLS = this.props.board[0].length;

        if(ROW < 0 || CELL < 0 || ROW >= MAX_ROWS || CELL >= MAX_CELLS) { 
            return false
        }

        const CELL_DATA = this.props.board[ROW][CELL];
        const CELL_NAME = CELL_DATA.name;
        const CAN_MOVE = CELL_NAME === '' || this.isEnd(pos);
        return CAN_MOVE
    }

    position(position, direction) {
        const [POS_ROW, POS_CELL] = position;
        const [DIR_ROW, DIR_CELL] = direction;
        const ROW = POS_ROW + DIR_ROW;
        const CELL = POS_CELL + DIR_CELL;
        position = [ROW, CELL];
        return position
    }

    async setVisited(pos) {
        const [ROW, CELL] = pos;
        this.props.setCellData({name: 'visited'}, ROW, CELL);
        await this.sleep();
    }

    
    setNext(pos) {
        const [ROW, CELL] = pos;
        this.props.setCellData({name: 'next'}, ROW, CELL);
    }

    
    async setFastest(pos) {
        const [ROW, CELL] = pos;
        this.props.setCellData({name: 'fastest'}, ROW, CELL);
        this.sleep();
    }

    sleep() {
        let ms = 100 - this.props.speed;
        if(ms == 0) { return }
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async showRoute(route) {
        for(let position of route) {
            await this.setFastest(position);
        }
    }
}

export default Algorithm;