import { useState, useEffect, createRef } from 'react';
import { Col, Container, Row, FormGroup, FormLabel, FormSelect, Dropdown, Button } from 'react-bootstrap'
import { ClearAll, ClearPath, ClearWeights, ClearWalls } from './clear';
import FormRange from 'react-bootstrap/esm/FormRange';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import RandomWalls from './layouts/randomWalls'
import RandomWeights from './layouts/randomWeights';
import RecursiveDivision from './layouts/recursiveDivision';
import Run from './run';

function Settings({ running, setRunning }) {
    const [algorithmWeighted, setAlgorithmWeighted] = useState(false);
    const speed = createRef(null);
    const algorithm = createRef(null);
    const pencil = createRef(null);

    useEffect(() => {
        // Set the algorithm weighted state based on the default algorithm value
        const ALGORITHM_WEIGHTED = currentAlgorithmWeighted();
        setAlgorithmWeighted(ALGORITHM_WEIGHTED);
    }, [])

    const currentPencilWeighted = () => {
        const CURRENT_PENCIL_OPTION_ELEMENT = pencil.current.selectedOptions[0];
        const IS_WEIGHTED = CURRENT_PENCIL_OPTION_ELEMENT.dataset.weighted === 'true';
        return IS_WEIGHTED
    }

    const currentAlgorithmWeighted = () => {
        const CURRENT_ALGORITHM_OPTION_ELEMENT = algorithm.current.selectedOptions[0];
        const IS_WEIGHTED = CURRENT_ALGORITHM_OPTION_ELEMENT.dataset.weighted === 'true';
        return IS_WEIGHTED
    }

    const algorithmChanged = async () => {
        // If there is a path on the board, clear it
        const HAS_PATH = document.querySelector('td.next, td.visited, td.fastest');
        if (HAS_PATH) {
            await ClearPath();
        }

        // If a algorithm has been chosen that has is weighted/non weighted, but the state is/isn't update it
        const CURRENT_ALGORITHM_WEIGHTED = currentAlgorithmWeighted();
        if (algorithmWeighted !== CURRENT_ALGORITHM_WEIGHTED) {
            setAlgorithmWeighted(CURRENT_ALGORITHM_WEIGHTED);
        }

        // If the algorithm is weighted, return
        if (CURRENT_ALGORITHM_WEIGHTED) { return }

        // If the pencil value is weighted, set the pencil to "wall"
        if (currentPencilWeighted()) {
            pencil.current.value = "wall";
        }
        // If there are weight(s) on the board, delete it
        const HAS_WEIGHTS = document.querySelector('td[data-weight="10"]');
        if (HAS_WEIGHTS) {
            await ClearWeights();
        }
    }

    return (
        <Container className="bg-dark py-3" fluid>
            <Row className="d-flex align-items-center">
                <FormGroup as={Col} xs={4} lg={true} className="my-2">
                    <FormLabel className="text-white" htmlFor="algorithm">Algorithm</FormLabel>
                    <FormSelect
                        ref={algorithm}
                        id="algorithm"
                        defaultValue="aStar"
                        onChange={algorithmChanged}
                        disabled={running}
                    >
                        <option data-weighted={false} value="bfs">BFS</option>
                        <option data-weighted={false} value="dfs">DFS</option>
                        <option data-weighted={true} value="dijkstra">Dijkstra</option>
                        <option data-weighted={true} value="aStar">A*</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col} xs={4} lg={true} className="my-2">
                    <FormLabel className="text-white" htmlFor="pencil">Pencil</FormLabel>
                    <FormSelect
                        ref={pencil}
                        id="pencil"
                        defaultValue="wall"
                    >
                        <option data-weighted={false} value=''>Erase</option>
                        <option data-weighted={false} value="wall">Wall</option>
                        <option data-weighted={true} value="weight-10" disabled={!algorithmWeighted}>Weight</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col} xs={4} lg={true} className="my-2">
                    <FormLabel className="text-white" htmlFor="speed">Speed</FormLabel>
                    <FormRange ref={speed} id="speed" max={99} />
                </FormGroup>
                <Dropdown as={Col} xs={4} lg={true} className="my-2">
                    <DropdownToggle
                        className="w-100"
                        variant={running ? "danger" : "success"}
                        disabled={running}
                    >
                        Layout
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={RecursiveDivision}>Recursive Division</DropdownItem>
                        <DropdownItem onClick={RandomWalls}>Walls</DropdownItem>
                        <DropdownItem onClick={RandomWeights} disabled={!algorithmWeighted}>Weights</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown as={Col} xs={4} lg={true} className="my-2">
                    <DropdownToggle
                        id="clear"
                        className="w-100"
                        variant={running ? "danger" : "success"}
                        disabled={running}
                    >
                        Clear
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={ClearWalls}>Walls</DropdownItem>
                        <DropdownItem onClick={ClearWeights}>Weights</DropdownItem>
                        <DropdownItem onClick={ClearPath}>Path</DropdownItem>
                        <DropdownItem onClick={ClearAll}>All</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Col xs={4} lg={true} className="my-2">
                    <Button
                        className="w-100"
                        variant={running ? 'danger' : 'success'}
                        disabled={running}
                        onClick={() => Run({
                            setRunning,
                            skip: false
                        })}
                    >
                        Run
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Settings;