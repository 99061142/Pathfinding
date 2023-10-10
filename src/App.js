import { Component } from 'react';
import Settings from './settings';
import CellInformation from './cellInformation';
import Board from './board';

class App extends Component {
    constructor() {
        super();
        this.state = {
            pencilType: 'wall',
            pencilWeight: Infinity,
            running: false,
            board: [],
            startPos: null,
            endPos: null
        };
    }

    setPencilType = (type) => {
        this.setState({
            pencilType: type
        });
    }

    setPencilWeight = (weight) => {
        this.setState({
            pencilWeight: weight
        });
    }

    setStartPos = (pos) => {
        this.setState({
            startPos: pos,
        });
    };

    setEndPos = (pos) => {
        this.setState({
            endPos: pos,
        });
    };

    setRunning = (bool) => {
        this.setState({
            running: bool,
        });
    };

    addCellToBoard = (row, cell) => {
        // If the length of the board list is lower than the cell row, add a new row to the board
        let board = this.state.board;
        if (row >= board.length) {
            board.push([]);
        }

        // Add the cell to the row
        board[row].push(cell);
        this.setState({
            board
        });
    };

    render() {
        return (
            <>
                <Settings
                    setRunning={this.setRunning}
                    setPencilType={this.setPencilType}
                    setPencilWeight={this.setPencilWeight}
                    board={this.state.board}
                    startPos={this.state.startPos}
                    endPos={this.state.endPos}
                    running={this.state.running}
                    pencilType={this.state.pencilType}
                    pencilWeight={this.state.pencilWeight}
                />
                <CellInformation />
                <Board
                    addCellToBoard={this.addCellToBoard}
                    setStartPos={this.setStartPos}
                    setEndPos={this.setEndPos}
                    running={this.state.running}
                    pencilType={this.state.pencilType}
                    pencilWeight={this.state.pencilWeight}
                />
            </>
        );
    }
}

export default App;