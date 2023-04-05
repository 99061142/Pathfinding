import { Component, createRef } from "react";
import CellIcon from './cellIcon'

class Cell extends Component {
    constructor({ row, col }) {
        super();
        this.pos = [row, col];
        this.element = createRef();
        this.getsDragged = false;
    }

    getDataset() {
        const ELEMENT = this.element.current;
        const DATASET = ELEMENT.dataset;
        return DATASET
    }

    getType() {
        const DATASET = this.getDataset();
        const TYPE = DATASET.type;
        return TYPE
    }

    componentDidMount() {
        const DATASET = { ...this.getDataset() };
        this.props.setCellData(this.pos, DATASET);
    }

    isStartPos() {
        const TYPE = this.getType();
        return TYPE === "start"
    }

    isEndPos() {
        const TYPE = this.getType();
        return TYPE === "end"
    }

    hover(e) {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // When the start/end pos are set, and the user left clicks on the cell, set the pencil value to the cell
        const LEFT_CLICKED = e.buttons === 1;
        if (LEFT_CLICKED) {
            this.clicked();
        }
    }

    clicked() {
        // If the algorithm is running or the cell gets dragged, return
        if (this.props.running || this.getsDragged) { return }

        // Get the pencil type and weight
        let [pencilType, pencilWeight] = document.getElementById('pencil').value.split('-');

        // If the current cell is equal to the start or end position and the cell doesn't get cleared, return
        const TYPE = this.getType();
        if ((TYPE === "start" || TYPE === "end") && pencilType !== '') { return }

        // Set the data to the cell
        pencilType = pencilType !== "weight" ? pencilType : '';
        pencilWeight = pencilWeight !== undefined ? pencilWeight : 1;
        const DATA = {
            type: pencilType,
            weight: pencilWeight
        };
        this.props.setCellData(this.pos, DATA);
    }

    dragOver(e) {
        // If the user hovers over the start or end pos, return
        if (this.isStartPos() || this.isEndPos()) {
            return
        }

        // Allow the drop
        e.preventDefault();
    }

    dragStart(e) {
        // Only allow the start or end pos to be dragged IF the algorithm isn't running
        if (!this.isStartPos() && !this.isEndPos() || this.props.running) {
            e.preventDefault();
            return
        }

        // Set the cell as dragged, and add the cell id as datatransfer
        this.getsDragged = true;
        e.dataTransfer.setData("id", e.target.id);
    }

    dragEnd() {
        // Unset the cell as dragged
        this.getsDragged = false;
    }

    dragDrop(e) {
        // Add the new start / end data
        const DRAG_TARGET_ID = e.dataTransfer.getData('id');
        const DRAG_TARGET = document.getElementById(DRAG_TARGET_ID);
        let dragTargetData = DRAG_TARGET.dataset;
        this.props.setCellData(this.pos, dragTargetData);

        // Remove the old start / end data
        const DRAG_TARGET_POS = DRAG_TARGET_ID === 'start' ? this.props.startPos : this.props.endPos;
        dragTargetData = {
            type: '',
            weight: 1
        };
        this.props.setCellData(DRAG_TARGET_POS, dragTargetData);

        // Set the new start / end pos
        if (DRAG_TARGET_ID === 'start') {
            this.props.setStartPos(this.pos)
            return
        }
        this.props.setEndPos(this.pos)
    }

    render() {
        const DATA = this.props.data;
        const TYPE = DATA.type || '';
        const WEIGHT = DATA.weight || 1;
        const DRAGGABLE = (TYPE === 'start' || TYPE === 'end') && !this.props.running;
        return (
            <td
                ref={this.element}
                id={TYPE === 'start' || TYPE === 'end' ? TYPE : null}
                className={`border border-dark cell ${TYPE}`}
                data-type={TYPE}
                data-weight={WEIGHT}
                onClick={() => this.clicked()}
                onMouseEnter={(e) => this.hover(e)}
                draggable={DRAGGABLE}
                onDragStart={(e) => this.dragStart(e)}
                onDragOver={(e) => this.dragOver(e)}
                onDrop={(e) => this.dragDrop(e)}
                onDragEnd={() => this.dragEnd()}
            >
                <CellIcon type={TYPE} weight={WEIGHT} />
            </td >
        );
    }
}

export default Cell;