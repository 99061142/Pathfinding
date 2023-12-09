import { Component } from "react";
import { Button } from "react-bootstrap";

// Algorithms
import Bfs from './algorithms/bfs';
import Dfs from './algorithms/dfs';
import Dijkstra from './algorithms/dijkstra';
import AStar from './algorithms/aStar';
import Gbfs from './algorithms/gbfs';

class Run extends Component {
    get algorithm() {
        switch (this.props.algorithm.abbrivation) {
            case "bfs":
                return Bfs
            case "dfs":
                return Dfs
            case "dijkstra":
                return Dijkstra
            case "a*":
                return AStar
            case "gbfs":
                return Gbfs
            default:
                throw Error(`"${this.props.algorithm}" isn't an optional algorithm abbrivation`);
        }
    }

    async clicked() {
        const board = this.props.board.current;
        board.clearPath();

        this.props.setRunning(true);

        await new this.algorithm({
            speedRef: this.props.speedRef,
            getSpeed: this.props.getSpeed,
            board: board.cells,
            boardRows: board.rows,
            boardRowCols: board.rowCols,
            startPos: board.startPos,
            endPos: board.endPos,
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
                onClick={() => this.clicked()}
            >
                Run {this.props.algorithm.name}
            </Button>
        );
    }
}

export default Run;