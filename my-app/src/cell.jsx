import { Component } from "react";
import { faArrowRight, faHouse, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef } from "react";

class Cell extends Component {
    constructor({ row, cell }) {
        super();
        this.row = row;
        this.cell = cell;
        this.element = createRef();
    }

    componentDidMount() {
        const ELEMENT = this.element.current;
        const DATA = { ...ELEMENT.dataset };
        this.props.setCellData(DATA, this.row, this.cell);
    }

    addState() {
        /* Update the state of the element by the pencil value.
        When the pencil has an weight value, set the weight as dataset weight. */
        let [pencilValue, pencilWeight] = document.getElementById('pencil').value.toLowerCase().split('-');
        let data
        if (pencilValue === "erase") {
            data = {
                name: null,
                weight: null
            };
            this.props.setCellData(data, this.row, this.cell);
            return
        }

        data = {
            name: pencilValue
        };
        if (pencilWeight) {
            data.weight = pencilWeight;
        }
        this.props.setCellData(data, this.row, this.cell);
    }

    async clicked() {
        // If the algorithm is running, return
        if (this.props.runnin) { return }

        // Add pencil state when the cell isn't the start or end position
        let cellData = this.props.board[this.row][this.cell];
        let name = cellData.name;
        if (name !== "start" && name !== "end") {
            this.addState();
        }
    }

    hover(element) {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // If the element is clicked, update element state
        let clicked = element.buttons === 1;
        if (clicked) {
            this.clicked();
        }
    }

    render() {
        let cellData = this.props.board[this.row][this.cell];
        let name = cellData.name;
        let weight = cellData.weight;
        return (
            <td
                ref={this.element}
                data-name={name ? name : null}
                data-weight={weight ? weight : null}
                className={`border border-dark cell ${name ? name : ''}`}
                onClick={() => this.clicked()}
                onMouseEnter={(element) => this.hover(element)}
            >
                {
                    name === "start" ? <FontAwesomeIcon icon={faArrowRight} />
                        : name === "end" ? <FontAwesomeIcon icon={faHouse} />
                            : name === "weight" ? <FontAwesomeIcon icon={faWeightHanging} />
                                : null
                }
            </td>
        );
    }
}

export default Cell;