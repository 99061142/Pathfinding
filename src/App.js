import './css/app.scss';
import { Component  } from 'react';
import Settings from './settings';
import CellInformation from './cellInformation';
import Board from './board';

class App extends Component {
    constructor() {
        super();
        this.state = {
            running: false,
            board: [],
            startPos: null,
            endPos: null
        };
    }

    setStartPos = (pos) => {
        this.setState({
            startPos: pos
        });
    }

    setEndPos = (pos) => {
        this.setState({
            endPos: pos
        });
    }
    
    setRunning = (bool) => {
        this.setState({
            running: bool
        });
    }

    addCellToBoard = (row, cell) => {
        let board = this.state.board
        if (row >= board.length) {
            board.push([])
        }
        board[row].push(cell)

        this.setState({
            board
        });
    }

    render() {
        return (
            <>
                <Settings 
                    setRunning={this.setRunning}
                    board={this.state.board}
                    startPos={this.state.startPos}
                    endPos={this.state.endPos}
                    running={this.state.running}
                />
                <CellInformation />
                <Board 
                    addCellToBoard={this.addCellToBoard} 
                    setStartPos={this.setStartPos}
                    setEndPos={this.setEndPos}
                    running={this.state.running}
                />
            </>
        );
    }
}

export default App;