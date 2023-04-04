import { Col, Container, Dropdown, Button, Form, Row } from 'react-bootstrap'
import { createRef } from 'react';
import Board from './board';
import Bfs from './algorithms/bfs';
import Dfs from './algorithms/dfs';
import Dijkstra from './algorithms/dijkstra';
import AStar from './algorithms/aStar';

class Settings extends Board {
    constructor() {
        super();
        this.state = {
            ...this.state,
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

    getSpeed = () => {
        const SPEED = this.speed.current.value;
        return SPEED
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

    algorithmChanged() {
        // Clear the fastest path of the previous algorithm
        this.clearCells('path');

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
        this.clearCells('weight');
    }

    setAlgorithmWeighted(bool) {
        this.setState({
            algorithmWeighted: bool
        });
    }

    getAlgorithmClass() {
        const ALGORITHM = this.algorithm.current.value;
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

    async run() {
        this.clearCells('path');
        this.props.setRunning(true);

        // Run the algorithm
        const MAX_SPEED = Number(this.speed.current.max);
        const STATES = {
            startPos: this.props.startPos,
            endPos: this.props.endPos,
            board: this.props.board,
            maxSpeed: MAX_SPEED,
            getSpeed: this.getSpeed,
            setCellData: this.props.setCellData
        };
        const Algorithm = this.getAlgorithmClass();
        await new Algorithm(STATES).run();

        this.props.setRunning(false);
    }

    render() {
        const RUN_DISABLED = this.props.running || !this.props.startPos || !this.props.endPos;
        return (
            <Container className="bg-dark py-3" fluid>
                <Row className="d-flex align-items-center">
                    <Col xs={4} lg={true} className="my-2">
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="algorithm">Algorithm</Form.Label>
                            <Form.Select ref={this.algorithm} id="algorithm" defaultValue="aStar" onChange={() => this.algorithmChanged()} disabled={this.props.running}>
                                <option data-weighted={false} value="bfs">BFS</option>
                                <option data-weighted={false} value="dfs">DFS</option>
                                <option data-weighted={true} value="dijkstra">Dijkstra</option>
                                <option data-weighted={true} value="aStar">A*</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="pencil">Pencil</Form.Label>
                            <Form.Select ref={this.pencil} id="pencil" defaultValue="wall">
                                <option data-weighted={false} value="">Erase</option>
                                <option data-weighted={false} value="wall">Wall</option>
                                <option data-weighted={true} value="weight-10" disabled={!this.state.algorithmWeighted}>Weight</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                            <Form.Range ref={this.speed} id="speed" max={100} />
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Dropdown>
                            <Dropdown.Toggle id="layout" className="w-100" variant={this.props.running ? "danger" : "success"} disabled={this.props.running}>
                                Layout
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.setRandomCells('wall')}>Random Walls</Dropdown.Item>
                                <Dropdown.Item disabled={!this.state.algorithmWeighted} onClick={() => this.setRandomCells('weight')}>Random weights</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Dropdown>
                            <Dropdown.Toggle id="clear" className="w-100" variant={this.props.running ? "danger" : "success"} disabled={this.props.running}>
                                Clear
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.clearCells('wall')}>Walls</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.clearCells('weight')}>Weights</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.clearCells('path')}>Path</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.clearCells('all')}>All</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Button className="w-100" variant={RUN_DISABLED ? "danger" : "success"} disabled={RUN_DISABLED} onClick={() => this.run()}>
                            Run
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Settings;