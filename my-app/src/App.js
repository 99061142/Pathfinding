import './app.css';
import Navigation from './nav.jsx';
import CellInformation from './cellInformation';
import Board from './board.jsx';

function App() {
    return (
        <>
            <Navigation />
            <CellInformation />
            <Board />
        </>
    );
}

export default App;