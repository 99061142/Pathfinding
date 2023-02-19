import { Component } from "react";
import { faArrowRight, faHouse, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Cell extends Component {
    constructor({ row, cell }) {
        super();
        this.state = {
            state: '',
            weight: 1,
        }
        this.pos = [row, cell]
    }

    componentWillUnmount() {
        if (this.state.state == "start") {
            this.props.setStartPos(null);
            return
        }
        if (this.state.state == "end") {
            this.props.setEndPos(null)
            return
        }
    }

    setElementState(state) {
        this.setState({
            state: state,
        });
    }

    setWeight(weight) {
        this.setState({
            weight: weight
        });
    }

    addState(pencilValue, pencilWeight) {
        /* Update the state of the element by the pencil value, or set the state to start/end (max 1 on the board).
        When the pencil has an weight value, set the weight (number behind the '-') as dataset weight. */
        if (this.state.state == "start" && pencilValue == "erase") {
            this.props.setStartPos(null);
        }
        else if (this.state.state == "end" && pencilValue == "erase") {
            this.props.setEndPos(null);
        }

        if (pencilValue == "erase") {
            pencilValue = '';
        }
        this.setElementState(pencilValue);

        if (pencilWeight) {
            this.setWeight(pencilWeight);
        }
    }

    async clicked() {
        // If the algorithm is running, return
        if (this.props.running()) { return }

        let [pencilValue, pencilWeight] = document.getElementById('pencil').value.toLowerCase().split('-');

        // If the board has no start, add start
        if (!this.props.getStartPos() && pencilValue != "erase") {
            this.setElementState('start');
            this.props.setStartPos(this.pos);
            return
        }

        // If the board has no end, add end
        if (!this.props.getEndPos() && pencilValue != "erase") {
            this.setElementState('end');
            this.props.setEndPos(this.pos);
            return
        }

        // Add pencil state when the cell isn't the start or end or the pencil is erase
        if (this.state.state != "start" && this.state.state != "end" || pencilValue == "erase") {
            this.addState(pencilValue, pencilWeight);
        }
    }

    hover(element) {
        // If the algorithm is running, return
        if (this.props.running()) { return }

        // If the element is clicked, update element state
        let clicked = element.buttons === 1;
        if (clicked) {
            this.clicked();
        }
    }

    render() {
        return (
            <td
                data-weight={this.state.weight}
                className={`border border-dark cell ${this.state.state}`}
                onClick={() => this.clicked()}
                onMouseEnter={(element) => this.hover(element)}
            >
                {
                    this.state.state == 'start' ? <FontAwesomeIcon icon={faArrowRight} />
                        : this.state.state == 'end' ? <FontAwesomeIcon icon={faHouse} />
                            : this.state.state == 'weight' ? <FontAwesomeIcon icon={faWeightHanging} />
                                : null
                }
            </td >
        );
    }
}

export default Cell;