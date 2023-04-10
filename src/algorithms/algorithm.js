import { Component } from "react";

class Algorithm extends Component {
    element(pos) {
        const ID = pos.join('-');
        const ELEMENT = document.getElementById(ID);
        return ELEMENT
    }

    startPos() {
        const ELEMENT = document.querySelector('td.start');
        const POS = ELEMENT.id.split('-').map(v => Number(v));
        return POS
    }

    endPos() {
        const ELEMENT = document.querySelector('td.end');
        const POS = ELEMENT.id.split('-').map(v => Number(v));
        return POS
    }

    cellData(pos) {
        const [ROW, COL] = pos;
        const CELLS = this.props.cells;
        const CELL_DATA = CELLS[ROW][COL];
        return CELL_DATA
    }

    cellWeight(pos) {
        const ELEMENT = this.element(pos);
        const WEIGHT = Number(ELEMENT.dataset.weight);
        return WEIGHT
    }

    cellType(pos) {
        const ELEMENT = this.element(pos);
        const TYPE = ELEMENT.dataset.type;
        return TYPE
    }

    isStart(pos) {
        const TYPE = this.cellType(pos);
        return TYPE === "start"
    }

    isEnd(pos) {
        const TYPE = this.cellType(pos);
        return TYPE === "end"
    }

    canMove(pos) {
        const [ROW, CELL] = pos;
        const CELLS = this.props.cells;
        const BOARD_ROWS = CELLS.length;
        const BOARD_COLS = CELLS[0].length;

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
        if(this.props.skip) { return }

        const SPEED_ELEMENT = document.getElementById('speed');
        const CURR_SPEED = Number(SPEED_ELEMENT.value);
        const MS = 100 - CURR_SPEED;
        return new Promise(resolve => setTimeout(resolve, MS));
    }

    async showRoute(route) {
        for(let position of route) {
            await this.setFastest(position);
        }
    }
}

export default Algorithm;