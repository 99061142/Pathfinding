import { Component, createRef } from "react";
import CellIcon from './cellIcon'

class Cell extends Component {
    constructor({ row, cell }) {
        super();
        this.row = row;
        this.col = cell;
        this.cell = createRef();
    }

    hover() {

    }

    clicked() {

    }

    render() {
        let cellData = this.props.board[this.row][this.col];
        return (
            <td
                ref={this.cell}
                data-name={cellData.type}
                data-weight={cellData.weight}
                className={`border border-dark cell ${cellData.type}`}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
            >
                {<CellIcon type={cellData.type} weight={cellData.weight} />}
            </td >
        );
    }
}

export default Cell;