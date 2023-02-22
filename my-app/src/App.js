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
            board: board
        });
    }

    setEndPos = pos => {
        this.setState({
            endPos: pos
        });
    }

    setStartPos = pos => {
        this.setState({
            startPos: pos,
        });
    }

    setRunning = bool => {
        this.setState({
            startPos: bool,
        });
    }

    setBoard = board => {
        this.setState({
            board: board
        });
    }

    setCellName = (name, row, cell) => {
        let board = [...this.state.board];
        board[row][cell] = name;
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
        }
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