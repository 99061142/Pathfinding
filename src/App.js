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

    setBoard = board => {
        this.setState({
            board
        });
    }

    setEndPos = (row, cell) => {
        const POS = [row, cell]
        this.setState({
            endPos: POS
        });
    }

    setStartPos = (row, cell) => {
        const POS = [row, cell]
        this.setState({
            startPos: POS,
        });
    }

    setRunning = bool => {
        this.setState({
            running: bool,
        });
    }

    setCellData = (newData, row, cell) => {
        // When an data value can be a number, set it to a number
        for (let key in newData) {
            let val = newData[key]
            if(!isNaN(val) && val !== '') { 
                newData[key] = Number(val)
            }
        }

        // Update board with the values that were changed inside the newData parameter
        let board = [...this.state.board];
        let oldData = board[row][cell];
        newData = Object.assign({}, oldData, newData);
        board[row][cell] = newData;
        this.setBoard(board);

        if(newData.name === "start") {
            this.setStartPos(row, cell);
            return
        }
        if(newData.name === "end") {
            this.setEndPos(row, cell);
            return
        }
    }

    render() {
        const PROPS = {
            running: this.state.running,
            board: this.state.board,
            startPos: this.state.startPos,
            endPos: this.state.endPos,
            setStartPos: this.setStartPos,
            setEndPos: this.setEndPos,
            setRunning: this.setRunning,
            setBoard: this.setBoard,
            setCellData: this.setCellData
        };
        return (
            <>
                <Navigation {...PROPS} />
                <CellInformation />
                <Board {...PROPS} />
            </>
        );
    }
}

export default App;