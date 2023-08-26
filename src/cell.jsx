import { Component } from 'react';

class Cell extends Component {
    constructor({ type, row, col }) {
        super();
        this.state = {
            type,
            weight: 1
        };
        this.pos = [row, col];
    }

    componentDidMount() {
        // If the initialization type of the cell is 'start' or 'end' add the position globally. 
        // The prop functions (setStartPos and setEndPos) to add the positions can be found at 'App.js'
        if (this.state.type === "start") {
            this.props.setStartPos(this.pos);
        }
        else if (this.state.type === "end") {
            this.props.setEndPos(this.pos);
        }

        // Save every state getter/setter as arrow functions globally to callback when needed.
        // The prop function (addCellToBoard) can be found at 'App.js'
        const CELL_DATA = {}
        for (const state in this.state) {
            const CAPITALIZED_STATE = state[0].toUpperCase() + state.slice(1);
            const GETTER = "get" + CAPITALIZED_STATE;
            CELL_DATA[GETTER] = () => this.state[state];

            const SETTER = "set" + CAPITALIZED_STATE;
            CELL_DATA[SETTER] = (v) => this[SETTER](v);
        }
        this.props.addCellToBoard(
            this.props.row,
            CELL_DATA,
        );
    }

    setType(type) {
        this.setState({
            type
        });

        // If the type gets changed to 'start' or 'end' add the position globally
        // The prop functions to add the positions can be found at 'App.js'
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
        // If an algorithm isn't running, and the type of the cell isn't 'start' or 'end, return true, else false
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
        // Don't use the pencil on the cell if it can't be used
        if (!this.canUsePencil()) {
            return
        }

        const PENCIL = document.getElementById('pencil');
        const SELECTED_PENCIL = PENCIL.options[PENCIL.selectedIndex];

        // If the pencil type is different than the cell type, update the cell type to the pencil type
        const PENCIL_TYPE = SELECTED_PENCIL.dataset.type;
        if (PENCIL_TYPE !== this.state.type) {
            this.setType(PENCIL_TYPE);
        }

        // If the pencil weight is different than the cell weight, update the cell weight to the pencil weight
        const PENCIL_WEIGHT = Number(SELECTED_PENCIL.dataset.weight);
        if (PENCIL_WEIGHT !== this.state.weight) {
            this.setWeight(PENCIL_WEIGHT);
        }
    }

    dragOver(e) {
        // Don't allow the drop when the user hovers over the start or end pos
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

        // Save the type and weight of the cell that gets dragged
        const TYPE = e.target.dataset.type;
        e.dataTransfer.setData('type', TYPE);
        const WEIGHT = e.target.dataset.weight;
        e.dataTransfer.setData('weight', WEIGHT);
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
        // Set the dropped data
        const DROPPED_TYPE = e.dataTransfer.getData('type');
        this.setType(DROPPED_TYPE);
        const DROPPED_WEIGHT = Number(e.dataTransfer.getData('weight'));
        this.setWeight(DROPPED_WEIGHT);
    }

    render() {
        return (
            <td
                className="cell"
                data-type={this.state.type}
                data-weight={this.state.weight}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
                draggable={(this.state.type === "start" || this.state.type === "end") && !this.props.running}
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