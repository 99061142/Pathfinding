import { Component } from "react";

class Algorithm extends Component {
    isStart(pos) {
        const IS_START = this.cellType(pos) === "start"
        return IS_START
    }

    isEnd(pos) {
        const IS_END = this.cellType(pos) === "end"
        return IS_END
    }

    cellData(pos) {
        const BOARD = this.props.board
        const [ROW, COL] = pos
        const CELL_DATA = BOARD[ROW][COL]
        return CELL_DATA
    }

    cellWeight(pos) {
        const CELL = this.cellData(pos);
        const WEIGHT = Number(CELL.getWeight());
        return WEIGHT
    }

    cellType(pos) {
        const CELL = this.cellData(pos)
        const TYPE = CELL.getType();
        return TYPE
    }

    cellInBounds(pos) {
        const BOARD = this.props.board;
        const [ROW, COL] = pos;
        if(ROW < 0 || COL < 0 || ROW >= BOARD.length || COL >= BOARD[ROW].length) {
            return false
        }
        return true
    }

    canMove(pos) {
        // If the position is out of bounds, return false
        if(!this.cellInBounds(pos)) { 
            return false
        }
        // If the element is inside the 'NOT_MOVABLE_TYPES' list, return false
        const NOT_MOVABLE_TYPES = ['visited', 'queued', 'wall', 'start'];
        const CELL_TYPE = this.cellType(pos);
        const CAN_MOVE = !NOT_MOVABLE_TYPES.includes(CELL_TYPE);
        return CAN_MOVE
    }

    dirPosition(pos, dir) {
        const POS = pos.map((val, i) => {
            return val + dir[i]
        });
        return POS
    }

    setCellType(pos, type) {
        const CELL = this.cellData(pos)
        CELL.setType(type)
    }

    async setVisited(pos) {
        this.setCellType(pos, 'visited');
        await this.sleep();
    }

    setQueued(pos) {
        this.setCellType(pos, 'queued');
    }

    async setFastest(pos) {
        this.setCellType(pos, 'fastest');
        await this.sleep();
    }

    sleep() {
        if(this.props.skip) { return }

        const MS = 100 - this.props.getSpeed()
        return new Promise(resolve => setTimeout(resolve, MS));
    }

    async showRoute(route) {
        for(const pos of route) {
            await this.setFastest(pos);
        }
    }
}

export default Algorithm;