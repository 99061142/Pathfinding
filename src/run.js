// Imports to render the component
import { Component } from 'react';
import { Button } from 'react-bootstrap';

// Imports to clear the board cell(s)
import { ClearPath } from './clear';

// Algorithms
import Bfs from './algorithms/bfs';
import Dfs from './algorithms/dfs';
import Dijkstra from './algorithms/dijkstra';
import AStar from './algorithms/aStar';
import Gbfs from './algorithms/gbfs';

class Run extends Component {
    get algorithmClass() {
        const ALGORITHM_NAME = this.props.algorithm;
        switch (ALGORITHM_NAME) {
            case "BFS":
                return Bfs
            case "DFS":
                return Dfs
            case "Dijkstra":
                return Dijkstra
            case "A*":
                return AStar
            case "GBFS":
                return Gbfs
            default:
                const ERROR_MESSAGE = `"${ALGORITHM_NAME}" is not an optional algorithm`;
                throw Error(ERROR_MESSAGE);
        }
    }

    async run() {
        await ClearPath(this.props.board);
        this.props.setRunning(true);

        const Algorithm = this.algorithmClass;
        await new Algorithm({
            board: this.props.board,
            startPos: this.props.startPos,
            endPos: this.props.endPos,
            getSpeed: this.props.getSpeed
        }).run();

        this.props.setRunning(false);
    }

    render() {
        return (
            <Button
                className="w-100"
                style={{
                    backgroundColor: this.props.running ? "#dc3545" : "#28a745",
                    border: "transparent"
                }}
                disabled={this.props.running}
                onClick={() => this.run()}
            >
                Run {this.props.algorithm}
            </Button>
        );
    }
}

export default Run;