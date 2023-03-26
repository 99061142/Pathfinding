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

    setCellData = (pos, newData) => {
        const [ROW, COL] = pos;
        let board = this.state.board;

        // If the row isnt created yet, create it
        if(board.length === ROW) {
            board.push([]);
        }

        // Set every data value that can be a number to a number
        for(let [key, value] of Object.entries(newData)) {
            if(parseInt(value)) {
                newData[key] = Number(value);
            }
        }
        // Merge the new data with the old data and set the data to the cell
        const OLD_DATA = this.state.board[ROW][COL]
        newData = Object.assign({}, OLD_DATA, newData)
        board[ROW][COL] = newData
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

        // If the position isn't equal to null, add the data to the board
        if(pos !== null) {
            this.setCellData(pos, { type: 'start', weight: 1 })
        }
    }

    setEndPos = pos => {
        this.setState({
            endPos: pos
        });

        // If the position isn't equal to null, add the data to the board
        if(pos !== null) {
            this.setCellData(pos, { type: 'end', weight: 1 })
        }
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