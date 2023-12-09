import { Component, createRef } from 'react';
import Settings from './Settings';
import CellExamples from './CellExamples';
import Board from './Board';

class App extends Component {
    constructor() {
        super();
        this.settings = createRef(null);
        this.board = createRef(null);
    }

    render() {
        return (
            <>
                <Settings
                    board={this.board}
                    ref={this.settings}
                />
                <CellExamples />
                <Board
                    settings={this.settings}
                    board={this.board}
                    ref={this.board}
                />
            </>
        );
    }
}

export default App;