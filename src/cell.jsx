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

    hover() {

    }

    clicked() {
        if (!this.props.startPos) {
            this.props.setStartPos(this.pos);
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