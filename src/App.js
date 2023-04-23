import './app.css';
import { useState } from 'react';
import Settings from './settings';
import CellInformation from './cellInformation';
import Board from './board';

function App() {
    const [running, setRunning] = useState(false);
    const PROPS = {
        running,
        setRunning
    };
    return (
        <>
            <Settings {...PROPS} />
            <CellInformation />
            <Board {...PROPS} />
        </>
    );
}

export default App;