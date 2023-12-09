import Animations from "./animations";


class Algorithm extends Animations {
    posOutOfBoundsError(pos) {
        // Throw an error with the information if the row and / or col are out of bounds.
        const [ROW, COL] = pos;
        const ROW_OUT_OF_BOUNDS = (ROW < 0 || ROW >= this.props.boardRow);
        const COL_OUT_OF_BOUNDS = (COL < 0 || COL >= this.props.boardRowCols);
        const ROW_ERROR = `The ROW ${ROW} is out of bounds for row length ${this.props.boardRows}.`;
        const COL_ERROR = `The COL ${COL} is out of bounds for col length ${this.props.boardRowCols}.`;
        if (ROW_OUT_OF_BOUNDS && COL_OUT_OF_BOUNDS) throw RangeError(ROW_ERROR + "\n" + COL_ERROR)
        if (ROW_OUT_OF_BOUNDS) throw RangeError(ROW_ERROR)
        if (COL_OUT_OF_BOUNDS) throw RangeError(COL_ERROR)
        throw Error("The ROW and COL are NOT out of bounds.")
    }

    cellComponent(pos) {
        const [ROW, COL] = pos;
        const COMPONENT = this.props.board[ROW][COL].current;
        if (!COMPONENT) this.posOutOfBoundsError(pos);
        return COMPONENT
    }

    cellType(pos) {
        const CELL_COMPONENT = this.cellComponent(pos);
        const CELL_TYPE = CELL_COMPONENT.type;
        return CELL_TYPE
    }

    cellWeight(pos) {
        const CELL_COMPONENT = this.cellComponent(pos);
        const CELL_WEIGHT = CELL_COMPONENT.weight;
        return CELL_WEIGHT
    }

    neighbours(pos) {
        // Right, down, left, up
        const DIRECTIONS = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ];

        // Return the neighbours based on the current pos and the directions
        // example: pos=[10,5], direction=[0,1] = [10,6] as neighbour position.
        // The neighbour position isn't used if the position is out of bounds, or has a weight of Infinity.
        const neighbours = [];
        for (const direction of DIRECTIONS ) {
            const neighbour = direction.map((val, i) => {
                return val + pos[i]
            });
            if (
                this.cellInBounds(neighbour) &&
                this.cellWeight(neighbour) !== Infinity
            ) {
                neighbours.push(neighbour);
            }
        }
        return neighbours
    }

    cellInBounds(pos) {
        const [ROW, COL] = pos;
        if (
            ROW < 0 ||
            COL < 0 ||
            ROW >= this.props.boardRows ||
            COL >= this.props.boardRowCols
        ) {
            return false
        }
        return true
    }

    isStartPos(pos) {
        const [ROW, COL] = pos;
        const [START_ROW, START_COL] = this.props.startPos;
        if (
            ROW === START_ROW &&
            COL === START_COL
        ) {
            return true
        }
        return false
    }

    isEndPos(pos) {
        const [ROW, COL] = pos;
        const [END_ROW, END_COL] = this.props.endPos;
        if (
            ROW === END_ROW &&
            COL === END_COL
        ) {
            return true
        }
        return false
    }
}

export default Algorithm;