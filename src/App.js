import './app.css';
import Navigation from './nav.jsx';
import CellInformation from './cellInformation';
import Board from './board.jsx';
import { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            startPos: null,
            endPos: null,
            running: false,
            board: []
        };
    }

    setRunning = bool => {
        this.setState({
            running: bool
        });
    }

    setCellData = (pos, data) => {
        const [ROW, COL] = pos;
        let board = this.state.board;

        // If the row isnt created yet, create it
        if(board.length === ROW) {
            board.push([]);
        }

        // Set every data value that can be a number to a number
        for(let [key, value] of Object.entries(data)) {
            if(parseInt(value)) {
                data[key] = Number(value);
            }
        }
        // Add the cell data to the board
        board[ROW][COL] = data
        this.setBoard(board)
    }

    setBoard(board) {
        this.setState({
            board
        });
    }

    render() {
        const STATES = {
            running: this.state.running,
            board: this.state.board,
            setRunning: this.setRunning,
            setCellData: this.setCellData
        };
        return (
            <>
                <Navigation {...STATES} />
                <CellInformation />
                <Board {...STATES} />
            </>
        );
    }
}

export default App;