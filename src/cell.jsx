import { Component } from 'react';
import './styling/cell.scss';

class Cell extends Component {
    constructor() {
        super();
        this.state = {
            type: '',
            weight: 1
        };
    }

    componentDidMount() {
        // Set the initializion type with the type setter.
        // We use the setter to set the start or end position at the board component
        this.type = this.props.initType;
    }

    /**
     * @param {{ type: string, weight: number }} states
     */
    set states(states) {
        // Update every state inside the parameter dictionary based on the key (state) and value (state value)
        for (const [state, stateValue] of Object.entries(states)) {
            // If there is no setter for the state, throw an error, else set the state value
            if (this[state] === undefined) throw Error(`There is no state setter for "${state}"`)

            // eslint-disable-next-line react/no-direct-mutation-state
            this[state] = stateValue;
        }
    }

    get type() {
        const TYPE = this.state.type;
        return TYPE
    }

    set type(type) {
        this.setState({
            type
        });

        if (type === "start") {
            this.props.board.current.startPos = this.props.pos;
            return
        }
        if (type === "end") this.props.board.current.endPos = this.props.pos;
    }

    get weight() {
        const WEIGHT = this.state.weight;
        return WEIGHT
    }

    set weight(weight) {
        this.setState({
            weight
        });
    }

    clicked() {
        // If the algorithm is running or the cell is the start or end position, return
        const settings = this.props.settings.current;
        if (
            settings.running ||
            this.type === "start" ||
            this.type === "end"
        ) {
            return
        }

        // Set the states based on the current pencil
        this.states = settings.pencilCellStates;
    }

    hover(ev) {
        // Use the pencil when the user left clicks on the cell
        const LEFT_CLICK = ev.buttons === 1;
        if (LEFT_CLICK) this.clicked();
    }

    dragOver(ev) {
        // Don't allow the drop when the user hovers over the start or end position
        if (
            this.type === "start" ||
            this.type === "end"
        ) {
            return
        }

        // Allow the drop
        ev.preventDefault();
    }

    dragStart(ev) {
        // Don't allow the drag when the algorithm is running or the cell isn't the start or end position
        if (
            this.props.settings.current.state.running ||
            (
                this.type !== "start" &&
                this.type !== "end"
            )
        ) {
            ev.preventDefault();
            return
        }

        // Transfer all the states of the cell
        ev.dataTransfer.setData('states', JSON.stringify(this.state));
    }

    dragDrop(ev) {
        // If the states aren't transferred, log an error and return
        let droppedStates = ev.dataTransfer.getData('states');
        if (!droppedStates) {
            console.error('The dropped data couldn\'t be used');
            return
        }

        // Set the dropped states
        this.states = JSON.parse(droppedStates);
    }

    dragEnd(ev) {
        // Clear the initialized drag cell if moved to a new location
        if (ev.dataTransfer.dropEffect === "copy") this.type = ''
    }

    render() {
        return (
            <td
                className={
                    "cell" +
                    (this.type ? ' ' + this.type : '')
                }
                draggable={
                    this.type === "start" ||
                    this.type === "end"
                }
                onClick={() => this.clicked()}
                onMouseEnter={(ev) => this.hover(ev)}
                onDragStart={(ev) => this.dragStart(ev)}
                onDragOver={(ev) => this.dragOver(ev)}
                onDrop={(ev) => this.dragDrop(ev)}
                onDragEnd={(ev) => this.dragEnd(ev)}
            >
            </td>
        );
    }
}

export default Cell;