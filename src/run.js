import Bfs from './algorithms/bfs';
import Dfs from './algorithms/dfs';
import Dijkstra from './algorithms/dijkstra';
import AStar from './algorithms/aStar';
import { ClearPath } from './clear';

async function Run({setRunning, skip}) {
    const getAlgorithmClass = () => {
        const ALGORITHM = document.getElementById('algorithm').value;
        switch (ALGORITHM) {
            case "bfs":
                return Bfs
            case "dfs":
                return Dfs
            case "dijkstra":
                return Dijkstra
            case "aStar":
                return AStar
            default:
                throw Error(`Algorithm "${ALGORITHM}" couldn't be found.`);
        }
    }
    
    await ClearPath();
    setRunning(true);

    // Run the algorithm
    const Algorithm = getAlgorithmClass();
    await new Algorithm({
        skip
    }).run();

    setRunning(false);
}

export default Run;