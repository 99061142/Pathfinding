// Imports to render the component
import { Component } from 'react';

// Styling for the component
import './styling/cell.scss';

class Cell extends Component {
    constructor({ initType, row, col }) {
        super();
        this.state = {
            type: initType,
            weight: 1
        };
        this.pos = [row, col];
    }

    capitalizeString(str) {
        // Capitalize the string and return it
        const CAPITALIZED_STRING = str[0].toUpperCase() + str.slice(1);
        return CAPITALIZED_STRING
    }

    componentDidMount() {
        // If the initialization type of the cell is "start" or "end" add the position globally.
        // The prop functions "setStartPos" and "setEndPos" can be found at "App.js"
        if (this.state.type === "start") {
            this.props.setStartPos(this.pos);
        }
        else if (this.state.type === "end") {
            this.props.setEndPos(this.pos);
        }

        // Save every state getter/setter as arrow functions globally to callback when needed.
        // The prop function "addCellToBoard" can be found at "App.js"
        const CELLS_DATA = {};
        for (const state in this.state) {
            const CAPITALIZED_STATE = this.capitalizeString(state);
            const GETTER = "get" + CAPITALIZED_STATE;
            CELLS_DATA[GETTER] = () => this.state[state];

            const SETTER = "set" + CAPITALIZED_STATE;
            CELLS_DATA[SETTER] = (v) => this[SETTER](v);
        }
        this.props.addCellToBoard(this.props.row, CELLS_DATA);
    }

    setType(type) {
        this.setState({
            type
        });

        // If the type gets changed to "start" or "end" add the position globally
        // The prop functions "setStartPos" and "setEndPos" can be found at "App.js"
        if (type === "start") {
            this.props.setStartPos(this.pos);
        }
        else if (type === "end") {
            this.props.setEndPos(this.pos);
        }
    }

    setWeight(weight) {
        this.setState({
            weight
        });
    }

    canUsePencil() {
        // If an algorithm isn't running, and the type of the cell isn't the start or end position, return true, else false
        if (!this.props.running && this.state.type !== "start" && this.state.type !== "end") {
            return true
        }
        return false
    }

    hover(e) {
        // When the user left clicks on the cell, and the pencil can be used on the cell, use the pencil
        const LEFT_CLICK = e.buttons === 1;
        if (LEFT_CLICK && this.canUsePencil()) {
            this.clicked();
        }
    }

    clicked() {
        // If the pencil can't be used, return
        if (!this.canUsePencil()) {
            return
        }

        // If the pencil type is different than the cell type, update the cell type to the pencil type
        const PENCIL_TYPE = this.props.pencilType;
        if (PENCIL_TYPE !== this.state.type) {
            this.setType(PENCIL_TYPE);
        }

        // If the pencil weight is different than the cell weight, update the cell weight to the pencil weight
        const PENCIL_WEIGHT = this.props.pencilWeight;
        if (PENCIL_WEIGHT !== this.state.weight) {
            this.setWeight(PENCIL_WEIGHT);
        }
    }

    dragOver(e) {
        // Don't allow the drop when the user hovers over the start or end position
        if (this.state.type === "start" || this.state.type === "end") {
            return
        }
        // Allow the drop
        e.preventDefault();
    }

    dragStart(e) {
        // Don't allow the drag when it isn't the start or end cell, or the algorithm is running
        if (this.props.running || (this.state.type !== "start" && this.state.type !== "end")) {
            e.preventDefault();
            return
        }

        // Save the states of the cell that gets dragged
        const STATES = JSON.stringify(this.state);
        e.dataTransfer.setData('states', STATES);
    }

    async dragEnd(e) {
        // If the cell wasn't moved, return
        if (e.dataTransfer.dropEffect === "none") {
            return
        }

        // Clear the cell where the drag was initialized
        this.setType('');
        this.setWeight(1);
    }

    dragDrop(e) {
        // Get the dropped data (states of the cell) if a cell got dropped
        const DRAG_DROPPED_STATES = e.dataTransfer.getData('states');

        // If there is no dropped data, log an error and return
        // This could happen if the user dropped something else than an draggable cell (like anchors)
        if (!DRAG_DROPPED_STATES) {
            console.error("The dropped data couldn't be used");
            return
        }

        // Set the dropped states 
        const STATES = JSON.parse(DRAG_DROPPED_STATES);
        for (const [key, value] of Object.entries(STATES)) {
            const SETTER = 'set' + this.capitalizeString(key);
            this[SETTER](value);
        }
    }

    render() {
        return (
            <td
                className={"cell" + (this.state.type ? ' ' + this.state.type : '')}
                data-weight={this.state.weight}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
                draggable={!this.props.running && (this.state.type === "start" || this.state.type === "end")}
                onDragStart={(e) => this.dragStart(e)}
                onDragOver={(e) => this.dragOver(e)}
                onDrop={(e) => this.dragDrop(e)}
                onDragEnd={(e) => this.dragEnd(e)}
            >
            </td>
        );
    }
}

export default Cell;