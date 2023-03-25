import { Component, createRef } from "react";
import CellIcon from './cellIcon'

class Cell extends Component {
    constructor({ row, cell }) {
        super();
        this.row = row;
        this.col = cell;
    }

    getType() {
        const DATA = this.props.board[this.row][this.col];
        const TYPE = DATA.type
        return TYPE
    }

    getWeight() {
        const DATA = this.props.board[this.row][this.col];
        const WEIGHT = DATA.weight
        return WEIGHT
    }

    hover() {

    }

    clicked() {

    }

    render() {
        return (
            <td
                data-type={this.getType()}
                data-weight={this.getWeight()}
                className={`border border-dark cell ${this.getType()}`}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
            >
                {<CellIcon type={this.getType()} weight={this.getWeight()} />}
            </td >
        );
    }
}

export default Cell;