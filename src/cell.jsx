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

    componentDidMount() {
        const DATA = { ...this.element.current.dataset };
        this.props.setCellData(this.pos, DATA);
    }

    getType() {
        const DATA = this.props.board[this.row][this.col];
        const TYPE = DATA.type;
        return TYPE
    }

    getWeight() {
        const DATA = this.props.board[this.row][this.col];
        const WEIGHT = DATA.weight;
        return WEIGHT
    }

    hover() {

    }

    clicked() {

    }

    render() {
        const TYPE = this.getType() ? this.getType() : '';
        const WEIGHT = this.getWeight() ? this.getWeight() : 1;
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