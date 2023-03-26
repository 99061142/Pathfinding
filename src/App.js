import './app.css';
import Settings from './settings.jsx';
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

    setStartPos = pos => {
        this.setState({
            startPos: pos
        });
        this.setCellData(pos, { type: 'start' })
    }

    setEndPos = pos => {
        this.setState({
            endPos: pos
        });
        this.setCellData(pos, { type: 'end' })
    }

    render() {
        const STATES = {
            running: this.state.running,
            board: this.state.board,
            startPos: this.state.startPos,
            endPos: this.state.endPos,
            setRunning: this.setRunning,
            setCellData: this.setCellData,
            setStartPos: this.setStartPos,
            setEndPos: this.setEndPos
        };
        return (
            <>
                <Settings {...STATES} />
                <CellInformation />
                <Board {...STATES} />
            </>
        );
    }
}

export default App;