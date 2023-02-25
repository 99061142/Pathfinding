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
        this.initName = '';
        this.initWeight = 1;
    }

    componentDidMount() {
        const ELEMENT = this.element.current;
        const DATA = { ...ELEMENT.dataset };
        this.props.setCellData(DATA, this.row, this.cell);
    }

    updateState(name) {
        /* Update the state of the element by the pencil value, or the given 'name' parameter when it is defined.
        When the pencil has an weight value, set the weight as dataset weight. */
        let [pencilValue, pencilWeight] = document.getElementById('pencil').value.toLowerCase().split('-');
        if (name) {
            pencilValue = name
        }

        let data
        if (pencilValue === "erase") {
            data = {
                name: this.initName,
                weight: this.initWeight
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

    clicked() {
        let cellData = this.props.board[this.row][this.cell];
        let name = cellData.name;

        // If the algorithm is running, return
        if (this.props.runnin || name === "start" || name === "end") { return }

        // Set element to start position when the start position isn't on the board
        if (!this.props.startPos && name === '') {
            this.props.setCellData({ name: 'start' }, this.row, this.cell);
            return
        }

        // Set element to end position when the start position isn't on the board
        if (!this.props.endPos && name === '') {
            this.props.setCellData({ name: 'end' }, this.row, this.cell);
            return
        }

        // If the element isn't empty, set it empty
        if (name !== '') {
            this.updateState('erase');
            return
        }
        // Set element to given pencil value
        this.updateState();
    }

    hover(element) {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // If the element is clicked, update name
        let clicked = element.buttons === 1;
        if (clicked) {
            this.clicked();
        }
    }

    render() {
        let cellData = this.props.board[this.row][this.cell];
        let name = cellData.name ? cellData.name : this.initName;
        let weight = cellData.weight ? cellData.weight : this.initWeight;
        return (
            <td
                ref={this.element}
                data-name={name}
                data-weight={weight}
                className={`border border-dark cell ${name}`}
                onClick={() => this.clicked()}
                onMouseEnter={(element) => this.hover(element)}
            >
                {
                    name === "start" ? <FontAwesomeIcon icon={faArrowRight} />
                        : name === "end" ? <FontAwesomeIcon icon={faHouse} />
                            : weight > 1 ? <FontAwesomeIcon icon={faWeightHanging} />
                                : null
                }
            </td>
        );
    }
}

export default Cell;