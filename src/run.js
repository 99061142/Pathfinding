import { ClearPath } from './clear';
import Bfs from './algorithms/bfs';
import Dfs from './algorithms/dfs';
import Dijkstra from './algorithms/dijkstra';
import AStar from './algorithms/aStar';

async function Run(props) {
    const getAlgorithmClass = () => {
        const ALGORITHM = props.algorithm;
        switch (ALGORITHM) {
            case "bfs":
                return Bfs
            case "dfs":
                return Dfs
            case "dijkstra":
                return Dijkstra
            case "a*":
                return AStar
            default:
                const ERROR_MESSAGE = `"${ALGORITHM}" is not an optional algorithm`
                throw Error(ERROR_MESSAGE);
        }
    }

    await ClearPath(props.board);

    // Run the algorithm
    const Algorithm = getAlgorithmClass();
    await new Algorithm({
        ...props
    }).run();
}

export default Run;