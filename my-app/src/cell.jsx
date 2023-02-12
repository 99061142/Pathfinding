import { Component } from "react";
import { faArrowRight, faHouse, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Cell extends Component {
    constructor({ row, col }) {
        super();
        this.state = {
            classNames: {
                start: 'bg-success',
                end: 'bg-danger',
                wall: 'bg-dark',
            },
            state: 'empty',
            weight: 1,
        }
        this.row = row;
        this.col = col;

        // TEST VARIABLES
        this.hasStart = true;
        this.hasEnd = true;
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

    clicked() {
        /* Update the state of the element by the pencil value, or set the state to start/end (max 1 on the board).
        When the pencil has an weight value, set the weight (number behind the '-') as dataset weight. */
        if (!this.hasStart) {
            this.setElementState('start');
            return
        }
        if (!this.hasEnd) {
            this.setElementState('end');
            return
        }

        let pencil = document.getElementById('pencil').value.toLowerCase();
        if (pencil.includes('weight')) {
            this.setElementState('weight');
            let weight = pencil.split('-')[1];
            this.setWeight(weight);
            return
        }
        this.setElementState(pencil);
    }

    hover(e) {
        // If the element is clicked, update element state
        let clicked = e.buttons === 1;
        if (clicked) {
            this.clicked();
        }
    }

    render() {
        let classNames = this.state.classNames[this.state.state] ? this.state.classNames[this.state.state] : '';

        return (
            <td
                data-weight={this.state.weight}
                className={`border border-dark float-left ${classNames}`}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
            >
                {
                    this.state.state === 'start' ? <FontAwesomeIcon icon={faArrowRight} />
                        : this.state.state === 'end' ? <FontAwesomeIcon size="lg" icon={faHouse} />
                            : this.state.state == 'weight' ? <FontAwesomeIcon icon={faWeightHanging} />
                                : null
                }
            </td >
        );
    }
}

export default Cell;