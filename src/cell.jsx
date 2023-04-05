import { Component, createRef } from "react";
import CellIcon from './cellIcon'

class Cell extends Component {
    constructor({ row, col, isStart, isEnd }) {
        super();
        const TYPE = isStart ? 'start' : isEnd ? 'end' : '';
        this.state = {
            type: TYPE,
            weight: 1
        };
        this.pos = [row, col];
        this.element = createRef();
    }

    componentDidMount() {
        // Add the functionality to update the cell when needed
        const DATA = {
            setDataset: this.setDataset,
            getType: this.getType,
            setType: this.setType,
            getWeight: this.getWeight,
            setWeight: this.setWeight
        }
        this.props.setCellData(this.pos, DATA);

        // Add the local start pos when it's the start pos
        if (this.isStartPos()) {
            this.props.setStartPos(this.pos);
        }
        // Add the local end pos when it's the end pos
        else if (this.isEndPos()) {
            this.props.setEndPos(this.pos);
        }
    }

    setDataset = dataset => {
        // Set every data value that can be a number to a number
        for (let [key, value] of Object.entries(dataset)) {
            if (parseInt(value)) {
                dataset[key] = Number(value);
            }
        }
        // Merge the new data with the old data and set the data
        const OLD_DATASET = this.state.dataset;
        dataset = Object.assign({}, OLD_DATASET, dataset)
        this.setState({
            type: dataset.type,
            weight: dataset.weight
        });

        // If the dataset has the type 'start', update the local start pos
        if (dataset.type === 'start') {
            this.props.setStartPos(this.pos);
        }
        // If the dataset has the type 'end', update the local end pos
        else if (dataset.type === 'end') {
            this.props.setEndPos(this.pos);
        }
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

        // If the dataset has the type 'start', set the pos as start pos
        if (type === 'start') {
            this.props.setStartPos(this.pos);
        }
        // If the dataset has the type 'end', set the pos as end pos
        else if (type === 'end') {
            this.props.seEndPos(this.pos);
        }
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

        // When the start/end pos are set, and the user left clicks on the cell, set the pencil value to the cell
        const LEFT_CLICKED = e.buttons === 1;
        if (LEFT_CLICKED) {
            this.clicked();
        }
    }

    clicked() {
        // If the algorithm is running, return
        if (this.props.running) { return }

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
        this.setDataset(DATA);
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
        if ((!this.isStartPos() && !this.isEndPos()) || this.props.running) {
            e.preventDefault();
            return
        }
        e.dataTransfer.setData("id", e.target.id);
    }

    dragEnd() {
        // Remove the dragged data from the dragged cell
        const DATA = {
            type: '',
            weight: 1
        };
        this.setDataset(DATA);
    }

    dragDrop(e) {
        // Add the dragged data on the dropped cell
        const DRAG_TARGET_ID = e.dataTransfer.getData('id');
        const DRAG_TARGET = document.getElementById(DRAG_TARGET_ID);
        const DATA = DRAG_TARGET.dataset;
        this.setDataset(DATA);
    }

    render() {
        const TYPE = this.state.type;
        const WEIGHT = this.state.weight
        const ID = TYPE === 'start' || TYPE === 'end' ? TYPE : null;
        const DRAGGABLE = (TYPE === 'start' || TYPE === 'end') && !this.props.running;
        return (
            <td
                ref={this.element}
                id={ID}
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