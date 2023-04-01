import { Component, createRef } from "react";
import CellIcon from './cellIcon'

class Cell extends Component {
    constructor({ row, col }) {
        super();
        this.row = row;
        this.col = col;
        this.pos = [row, col];
        this.element = createRef();
        this.getsDragged = false;
    }

    componentDidMount() {
        const DATA = this.element.current.dataset;
        this.props.setCellData(this.pos, DATA);
    }

    hover(e) {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // When the start/end pos are set, and the user left clicks on the cell, set the pencil value to the cell
        const LEFT_CLICKED = e.buttons === 1;
        if (LEFT_CLICKED && this.props.startPos && this.props.endPos) {
            this.clicked();
        }
    }

    clicked() {
        // If the algorithm is running or the cell gets dragged, return
        if (this.props.running || this.getsDragged) { return }

        const TYPE = this.props.data.type

        // Add the start pos when the current cell isn't the end pos and the start pos isn't already set
        if (!this.props.startPos && TYPE !== "end") {
            this.props.setStartPos(this.pos);
            return
        }
        // Add the end pos when the current cell isn't the start pos and the end pos isn't already set
        if (!this.props.endPos && TYPE !== "start") {
            this.props.setEndPos(this.pos);
            return
        }

        // Get the pencil type and weight
        let [pencilType, pencilWeight] = document.getElementById('pencil').value.split('-');

        // If the current cell is equal to the start or end position and the cell doesn't get cleared, return
        if ((TYPE === "start" || TYPE === "end") && pencilType !== '') { return }

        // Set the data to the cell
        pencilType = pencilType !== "weight" ? pencilType : '';
        pencilWeight = pencilWeight !== undefined ? pencilWeight : 1;
        const DATA = {
            type: pencilType,
            weight: pencilWeight
        };
        this.props.setCellData(this.pos, DATA);

        // If the current cell is the start position, remove it from the state
        if (this.props.data.type === "start") {
            this.props.setStartPos(null);
            return
        }
        // If the current cell is the end position, remove it from the state
        if (this.props.data.type === "end") {
            this.props.setEndPos(null);
            return
        }
    }

    dragOver(e) {
        // Allow the drop
        e.preventDefault();
    }

    dragStart(e) {
        this.getsDragged = true;
        e.dataTransfer.setData("id", e.target.id);
    }

    dragEnd() {
        this.getsDragged = false;
    }

    dragDrop(e) {
        const DRAG_TARGET_ID = e.dataTransfer.getData("id");

        // If a cell was dragged that isn't the start or end pos, return
        if (DRAG_TARGET_ID === '') {
            return
        }

        // Set the dragged cell data inside the new cell
        const DRAG_TARGET = document.getElementById(DRAG_TARGET_ID);
        let dragTargetData = DRAG_TARGET.dataset
        this.props.setCellData(this.pos, dragTargetData)

        // Remove the data inside the cell when the dragging started
        const DRAG_TARGET_POS = DRAG_TARGET_ID === 'start' ? this.props.startPos : this.props.endPos
        dragTargetData = {
            type: '',
            weight: 1
        };
        this.props.setCellData(DRAG_TARGET_POS, dragTargetData);

        console.log(e.target.dataset.type)
        // If the user drop start on end pos, or end on start pos remove the data that was currently in the cell
        if (e.target.dataset.type === 'start') {
            this.props.setStartPos(null)
        } else {
            this.props.setEndPos(null)
        }

        // Add the dropped pos as start or end pos
        if (DRAG_TARGET_ID === 'start') {
            this.props.setStartPos(this.pos)
        } else {
            this.props.setEndPos(this.pos)
        }
    }

    render() {
        const DATA = this.props.data;
        const TYPE = DATA.type || '';
        const WEIGHT = DATA.weight === null ? DATA.weight : 1;
        return (
            <td
                ref={this.element}
                id={TYPE === 'start' || TYPE === 'end' ? TYPE : null}
                className={`border border-dark cell ${TYPE}`}
                data-type={TYPE}
                data-weight={WEIGHT}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
                draggable={TYPE === 'start' || TYPE === 'end'}
                onDragStart={(e) => this.dragStart(e)}
                onDragOver={(e) => this.dragOver(e)}
                onDrop={(e) => this.dragDrop(e)}
                onDragEnd={() => this.dragEnd()}
            >
                <CellIcon type={TYPE} weight={WEIGHT} />
            </td>
        );
    }
}

export default Cell;