import './app.css';
import { Component } from 'react';
import Settings from './settings.jsx';
import CellInformation from './cellInformation';
import Board from './board.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            running: false,
            cells: []
        };
    }

    setRunning = bool => {
        this.setState({
            running: bool
        });
    }

    setCellData = (pos, data) => {
        const [ROW, COL] = pos;
        let cells = this.state.cells;

        // If the row isnt created yet, create it
        if(cells.length === ROW) {
            cells.push([]);
        }

        // Add the cell to the cells
        cells[ROW][COL] = data;
        this.setCells(cells);
    }

    setCells(cells) {
        this.setState({
            cells
        });
    }

    render() {
        const PROPS = {
            running: this.state.running,
            cells: this.state.cells,
            setRunning: this.setRunning,
            setCellData: this.setCellData
        };
        return (
            <>
                <Settings {...PROPS} />
                <CellInformation />
                <Board {...PROPS} />
            </>
        );
    }
}

export default App;