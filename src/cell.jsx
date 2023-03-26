import { Component, createRef } from "react";
import CellIcon from './cellIcon'

class Cell extends Component {
    constructor({ row, col }) {
        super();
        this.row = row;
        this.col = col;
        this.pos = [row, col];
        this.element = createRef();
    }

    getType() {
        const ELEMENT = this.element.current;
        const TYPE = ELEMENT.dataset.type
        return TYPE
    }

    componentDidMount() {
        const DATA = { ...this.element.current.dataset };
        this.props.setCellData(this.pos, DATA);
    }

    hover(e) {
        // When the start/end pos are set, and the user left clicks on the cell, set the pencil value to the cell
        const LEFT_CLICKED = e.buttons === 1;
        if (LEFT_CLICKED && this.props.startPos && this.props.endPos) {
            this.clicked();
        }
    }

    clicked() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Get the current type of the cell
        const OLD_TYPE = this.getType();

        // Add the start pos when the current cell isn't the end pos and the start pos isn't already set
        if (!this.props.startPos && OLD_TYPE !== "end") {
            this.props.setStartPos(this.pos);
            return
        }
        // Add the end pos when the current cell isn't the start pos and the end pos isn't already set
        if (!this.props.endPos && OLD_TYPE !== "start") {
            this.props.setEndPos(this.pos);
            return
        }

        // Get the pencil type and weight
        const [NEW_TYPE, NEW_WEIGHT] = document.getElementById('pencil').value.split('-')

        // Only remove start or end position when the new type is empty
        if (NEW_TYPE !== '' && (OLD_TYPE === "start" || OLD_TYPE === "end")) { return }

        // Set the data to the cell
        let data = {
            type: NEW_TYPE
        };
        if (NEW_WEIGHT) {
            data.weight = NEW_WEIGHT
        }
        this.props.setCellData(this.pos, data)

        // If the current cell is the start or end position, remove it
        if (OLD_TYPE === "start") {
            this.props.setStartPos(null)
            return
        }
        if (OLD_TYPE === "end") {
            this.props.setEndPos(null)
            return
        }
    }

    render() {
        const DATA = this.props.board[this.row][this.col];
        const TYPE = DATA.type ? DATA.type : '';
        const WEIGHT = DATA.weight ? DATA.weight : 1;
        return (
            <td
                ref={this.element}
                data-type={TYPE}
                data-weight={WEIGHT}
                className={`border border-dark cell ${TYPE}`}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
            >
                <CellIcon type={TYPE} weight={WEIGHT} />
            </td>
        );
    }
}

export default Cell;