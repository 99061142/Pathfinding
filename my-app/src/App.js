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

    setCellName = (name, weight, row, cell) => {
        let board = [...this.state.board];
        board[row][cell] = {
            name,
            weight
        };
        this.setBoard(board);
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
            setCellName: this.setCellName
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