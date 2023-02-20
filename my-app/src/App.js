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

    render() {
        return (
            <>
                <Navigation 
                    running={this.state.running}
                    board={this.state.board}
                    startPos={this.state.startPos} 
                    endPos={this.state.endPos} 
                    setStartPos={this.setStartPos} 
                    setEndPos={this.setEndPos}
                    setRunning={this.setRunning}
                />
                <CellInformation />
                <Board
                    running={this.state.running}
                    board={this.state.board}
                    startPos={this.state.startPos} 
                    endPos={this.state.endPos} 
                    setStartPos={this.setStartPos} 
                    setEndPos={this.setEndPos}
                    setRunning={this.setRunning}
                />
            </>
        );
    }
}

export default App;