// Imports to render the component
import { Component } from "react";
import { Button } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

// Import to clear the board cells
import { ClearAll } from "../clear";

class RandomWalls extends Component {
    async clicked() {
        // CLear the board before creating a new layout
        const BOARD = this.props.board;
        await ClearAll(BOARD);

        // Create a new layout with random walls
        for (let row of BOARD) {
            for(let cell of row) {
                // If the cell is already filled, or the random % is higher than 15%, continue
                if(cell.getType() !== '' || Math.random() > .15) { 
                    continue
                }
                // Set the cell as wall
                cell.setType('wall');
                cell.setWeight(Infinity);
            }
        }
    }

    render() {
        return (
            <DropdownItem
                as={Button}
                onClick={() => this.clicked()}
            >
                Random walls
            </DropdownItem>
        );
    }
}

export default RandomWalls;