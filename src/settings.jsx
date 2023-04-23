import { Component, createRef } from 'react';
import { Col, Container, Row, FormGroup, FormLabel, FormSelect, Dropdown, Button } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { ClearAll, ClearPath, ClearWeights, ClearWalls } from './clear';
import RandomWalls from './layouts/randomWalls'
import RandomWeights from './layouts/randomWeights';
import RecursiveDivision from './layouts/recursiveDivision';
import Run from './run';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            algorithmWeighted: false
        };
        this.speed = createRef();
        this.algorithm = createRef();
        this.pencil = createRef();
    }

    componentDidMount() {
        // Set algorithmWeighted state based on if the default algorithm is weighted
        const ALGORITHM_WEIGHTED = this.isAlgorithmWeighted();
        this.setAlgorithmWeighted(ALGORITHM_WEIGHTED);
    }

    isPencilWeighted() {
        const CURRENT_PENCIL_VALUE = this.pencil.current.value;
        const CURRENT_OPTION = document.querySelector(`[value = ${CURRENT_PENCIL_VALUE}]`);
        const IS_WEIGHTED = CURRENT_OPTION.dataset.weighted === "true";
        return IS_WEIGHTED
    }

    isAlgorithmWeighted() {
        const CURRENT_ALGORITHM_VALUE = this.algorithm.current.value;
        const CURRENT_OPTION = document.querySelector(`[value = ${CURRENT_ALGORITHM_VALUE}]`);
        const IS_WEIGHTED = CURRENT_OPTION.dataset.weighted === "true";
        return IS_WEIGHTED
    }

    async algorithmChanged() {
        // If there is a path on the board, clear it
        const HAS_PATH = document.querySelector('td.next, td.visited, td.fastest');
        if (HAS_PATH) {
            await ClearPath(this.props.cells);
        }

        // Set algorithmWeighted state based on if the chosen algorithm is weighted
        const ALGORITHM_WEIGHTED = this.isAlgorithmWeighted();
        this.setAlgorithmWeighted(ALGORITHM_WEIGHTED);

        // If the algorithm is weighted, return
        if (ALGORITHM_WEIGHTED) { return }

        // If the pencil value is weighted, set the pencil to "wall"
        if (this.isPencilWeighted()) {
            this.pencil.current.value = "wall";
        }
        // Delete all weights on the board
        await ClearWeights(this.props.cells);
    }

    setAlgorithmWeighted(bool) {
        this.setState({
            algorithmWeighted: bool
        });
    }

    render() {
        return (
            <Container className="bg-dark py-3" fluid>
                <Row className="d-flex align-items-center">
                    <FormGroup as={Col} xs={4} lg={true} className="my-2">
                        <FormLabel className="text-white" htmlFor="algorithm">Algorithm</FormLabel>
                        <FormSelect
                            ref={this.algorithm}
                            id="algorithm"
                            defaultValue="aStar"
                            onChange={() => this.algorithmChanged()}
                            disabled={this.props.running}
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
                            ref={this.pencil}
                            id="pencil"
                            defaultValue="wall"
                        >
                            <option data-weighted={false} value=''>Erase</option>
                            <option data-weighted={false} value="wall">Wall</option>
                            <option data-weighted={true} value="weight-10" disabled={!this.state.algorithmWeighted}>Weight</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup as={Col} xs={4} lg={true} className="my-2">
                        <FormLabel className="text-white" htmlFor="speed">Speed</FormLabel>
                        <FormRange ref={this.speed} id="speed" max={99} />
                    </FormGroup>
                    <Dropdown as={Col} xs={4} lg={true} className="my-2">
                        <DropdownToggle
                            className="w-100"
                            variant={this.props.running ? "danger" : "success"}
                            disabled={this.props.running}
                        >
                            Layout
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => RecursiveDivision(this.props.cells)}>Recursive Division</DropdownItem>
                            <DropdownItem onClick={() => RandomWalls(this.props.cells)}>Walls</DropdownItem>
                            <DropdownItem onClick={() => RandomWeights(this.props.cells)} disabled={!this.state.algorithmWeighted}>Weights</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown as={Col} xs={4} lg={true} className="my-2">
                        <DropdownToggle
                            id="clear"
                            className="w-100"
                            variant={this.props.running ? "danger" : "success"}
                            disabled={this.props.running}
                        >
                            Clear
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => ClearWalls(this.props.cells)}>Walls</DropdownItem>
                            <DropdownItem onClick={() => ClearWeights(this.props.cells)}>Weights</DropdownItem>
                            <DropdownItem onClick={() => ClearPath(this.props.cells)}>Path</DropdownItem>
                            <DropdownItem onClick={() => ClearAll(this.props.cells)}>All</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Col xs={4} lg={true} className="my-2">
                        <Button
                            className="w-100"
                            variant={this.props.running ? 'danger' : 'success'}
                            disabled={this.props.running}
                            onClick={() => Run({
                                setRunning: this.props.setRunning,
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
}

export default Settings;