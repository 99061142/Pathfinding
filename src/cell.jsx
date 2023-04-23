import { createRef, useEffect, useState } from "react";
import CellIcon from './cellIcon'
import Run from './run'

function Cell({ initType, initWeight, row, col, running, setRunning }) {
    const element = createRef(null);
    const pos = [row, col];
    const [type, setType] = useState(initType);
    const [weight, setWeight] = useState(initWeight);

    useEffect(() => {
        // When a state attribute gets updated, set the state as the updated value
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const MUTATED_ATTRIBUTE_NAME = mutation.attributeName;
                switch (MUTATED_ATTRIBUTE_NAME) {
                    case 'data-type':
                        const DATASET_TYPE = mutation.target.dataset.type;
                        setType(DATASET_TYPE);
                        break
                    case 'data-weight':
                        const DATASET_WEIGHT = Number(mutation.target.dataset.weight);
                        setWeight(DATASET_WEIGHT);
                        break
                    default:
                        throw Error(`The attribute "${MUTATED_ATTRIBUTE_NAME}" doesn't have a state that needs to be updated`);
                }
            }
        });

        observer.observe(element.current, {
            attributeFilter: ['data-type', 'data-weight'],
        });
    }, [element]);

    const hover = (e) => {
        // If the algorithm is running or the cell is the start / end pos, return
        if (running || type === 'start' || type === 'end') { return }

        // When the user left clicks on the cell, set the pencil value to the cell
        const LEFT_CLICK = e.buttons === 1;
        if (LEFT_CLICK) {
            clicked();
        }
    }

    const clicked = () => {
        // If the algorithm is running or the cell is the start / end pos, return
        if (running || type === 'start' || type === 'end') { return }

        // If the pencil type and/or weight is different than the current type and/or weight, update it
        let [pencilType, pencilWeight] = document.getElementById('pencil').value.split('-');
        pencilType = pencilType !== "weight" ? pencilType : '';
        if (pencilType !== type) {
            element.current.dataset.type = pencilType;
        }
        pencilWeight = Number(pencilWeight) || 1;
        if (pencilWeight !== weight) {
            element.current.dataset.weight = pencilWeight;
        }
    }

    const dragOver = (e) => {
        // Don't allow the drop when the user hovers over the start or end pos
        if (type === 'start' || type === 'end') {
            return
        }
        // Allow the drop
        e.preventDefault();
    }

    const dragStart = (e) => {
        // Don't allow the drag when it isn't the start or end cell, or the algorithm is running
        if ((type !== 'start' && type !== 'end') || running) {
            e.preventDefault();
            return
        }
        // Set the needed data to get it when the cell gets dropped
        const TYPE = e.target.dataset.type;
        e.dataTransfer.setData('type', TYPE);
        const WEIGHT = e.target.dataset.weight;
        e.dataTransfer.setData('weight', WEIGHT);
    }

    const dragEnd = () => {
        // If the cell wasn't moved, return
        const POSITIONS = document.querySelectorAll(`td.${type}`)
        if (POSITIONS.length === 1) {
            return
        }
        // Remove the old start / end pos
        element.current.dataset.type = '';
        element.current.dataset.weight = 1;

        // Run the algorithm when there is a path on the board
        const HAS_PATH = document.querySelector('td.next, td.visited, td.fastest');
        if (!HAS_PATH) { return }
        Run({
            setRunning: setRunning,
            skip: true
        });
    }

    const dragDrop = (e) => {
        // Set the type and weight as the dragged cell (if it isn't already)
        const DROPPED_TYPE = e.dataTransfer.getData('type');
        if (DROPPED_TYPE !== type) {
            element.current.dataset.type = DROPPED_TYPE;
        }
        const DROPPED_WEIGHT = Number(e.dataTransfer.getData('weight'));
        if (DROPPED_WEIGHT !== weight) {
            element.current.dataset.type = DROPPED_WEIGHT;
        }
    }

    return (
        <td
            ref={element}
            id={pos.join('-')}
            className={`border border-dark cell ${type}`}
            data-type={initType}
            data-weight={initWeight}
            onClick={clicked}
            onMouseEnter={hover}
            draggable={(type === 'start' || type === 'end') && !running}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
        >
            <CellIcon
                type={type}
                weight={weight}
            />
        </td>
    );
}

export default Cell;