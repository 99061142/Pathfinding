import { Component, createRef } from "react";
import CellIcon from './cellIcon'

import Run from './run'

class Cell extends Component {
    constructor({ type, row, col }) {
        super();
        this.state = {
            type,
            weight: 1
        };
        this.pos = [row, col];
        this.element = createRef();
    }

    componentDidMount() {
        // Add the functionality to update the cell when needed
        const DATA = {
            getType: this.getType,
            setType: this.setType,
            getWeight: this.getWeight,
            setWeight: this.setWeight
        }
        this.props.setCellData(this.pos, DATA);
    }

    getWeight = () => {
        const WEIGHT = this.state.weight;
        return WEIGHT
    }

    setWeight = weight => {
        this.setState({
            weight
        });
    }

    getType = () => {
        const TYPE = this.state.type;
        return TYPE
    }

    setType = type => {
        this.setState({
            type
        });
    }

    isStartPos() {
        const IS_START_POS = this.getType() === 'start';
        return IS_START_POS;
    }

    isEndPos() {
        const IS_END_POS = this.getType() === 'end';
        return IS_END_POS;
    }

    hover(e) {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // When the user left clicks on the cell, set the pencil value to the cell
        const LEFT_CLICKED = e.buttons === 1;
        if (LEFT_CLICKED) {
            this.clicked();
        }
    }

    clicked() {
        // If the algorithm is running or the cell is the start / end pos, return
        if (this.props.running || this.isStartPos() || this.isEndPos()) { return }

        // Set the pencil styling to the cell
        let [pencilType, pencilWeight] = document.getElementById('pencil').value.split('-');
        pencilType = pencilType !== "weight" ? pencilType : '';
        this.setType(pencilType);
        pencilWeight = Number(pencilWeight) || 1;
        this.setWeight(pencilWeight);
    }

    dragOver(e) {
        // Don't allow the drop when the user hovers over the start or end pos
        if (this.isStartPos() || this.isEndPos()) {
            return
        }
        // Allow the drop
        e.preventDefault();
    }

    dragStart(e) {
        // Only allow the start or end pos to be dragged if the algorithm isn't running
        if ((!this.isStartPos() && !this.isEndPos()) || this.props.running) {
            e.preventDefault();
            return
        }
        e.dataTransfer.setData('id', e.target.id);
    }

    async dragEnd() {
        // If the start / end pos wasn't moved, return
        const TYPE = this.getType();
        const POSITIONS = document.querySelectorAll(`[data-type=${TYPE}]`)
        if (POSITIONS.length === 1) {
            return
        }
        // Remove the old start / end pos
        this.setType('');
        this.setWeight(1);
    }

    async dragDrop(e) {
        // Move the start or end pos to the dropped cell
        const DRAG_TARGET_ID = e.dataTransfer.getData('id');
        const DRAG_TARGET = document.getElementById(DRAG_TARGET_ID);
        const DATA = DRAG_TARGET.dataset;
        this.setType(DATA.type);
        this.setWeight(DATA.weight);

        // Run the algorithm when there is a path on the board
        const HAS_PATH = document.querySelector('td.fastest');
        if (!HAS_PATH) { return }
        await Run({
            cells: this.props.cells,
            setRunning: this.props.setRunning,
            skip: true,
            setCellData: this.props.setCellData
        });
    }

    render() {
        return (
            <td
                ref={this.element}
                id={this.pos.join('-')}
                className={`border border-dark cell ${this.state.type}`}
                data-type={this.state.type}
                data-weight={this.state.weight}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
                draggable={(this.isStartPos() || this.isEndPos()) && !this.props.running}
                onDragStart={(e) => this.dragStart(e)}
                onDragOver={(e) => this.dragOver(e)}
                onDrop={(e) => this.dragDrop(e)}
                onDragEnd={() => this.dragEnd()}
            >
                <CellIcon
                    type={this.state.type}
                    weight={this.state.weight}
                />
            </td>
        );
    }
}

export default Cell;