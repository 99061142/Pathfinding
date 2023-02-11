import { Component } from "react";

class Cell extends Component {
    constructor({ row, cell }) {
        super();
        this.row = row;
        this.cell = cell;
    }

    componentDidMount() {
    }

    render() {
        return (
            <td
                data-weight="1"
                className="border border-dark float-left"
                style={{ padding: "10px" }}
                onClick={(e) => this.clicked(e.target)}
            ></td>
        );
    }
}

export default Cell;