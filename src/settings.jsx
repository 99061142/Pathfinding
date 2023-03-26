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
            algorithmWeighted: true
        };
        this.speed = createRef();
        this.algorithm = createRef();
        this.pencil = createRef();
    }

    getSpeed = () => {
        const SPEED = this.speed.current.value;
        return SPEED
    }

    pencilIsWeighted() {
        const CURRENT_PENCIL_VALUE = this.pencil.current.value;
        const CURRENT_OPTION = document.querySelector(`[value = ${CURRENT_PENCIL_VALUE}]`);
        const IS_WEIGHTED = CURRENT_OPTION.dataset.weighted === "true";
        return IS_WEIGHTED
    }

    algorithmChanged(algorithm) {
        // Clear the fastest path of the previous algorithm
        this.clearCells('path');

        // Set the 'algorithmWeighted' state value based on if the current algorithm is weighted
        const WEIGHTED_ALGORITHMS = ['dijkstra', 'a*'];
        const IS_WEIGHTED = WEIGHTED_ALGORITHMS.includes(algorithm);
        this.setAlgorithmWeighted(IS_WEIGHTED);

        // If the algorithm is weighted, return
        if (IS_WEIGHTED) { return }

        // If the pencil value is weighted, set the pencil to "wall"
        if (this.pencilIsWeighted()) {
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
            case "a*":
                return AStar
            default:
                throw Error(`Algorithm "${ALGORITHM}" couln't be found.`);
        }
    }

    async run() {
        this.clearCells('path');
        this.props.setRunning(true);

        // Run the algorithm
        const STATES = {
            startPos: this.props.startPos,
            endPos: this.props.endPos,
            board: this.props.board,
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
                            <Form.Select ref={this.algorithm} id="algorithm" defaultValue="a*" onChange={(e) => this.algorithmChanged(e.target.value)} disabled={this.props.running}>
                                <option value="bfs">BFS</option>
                                <option value="dfs">DFS</option>
                                <option value="dijkstra">Dijkstra</option>
                                <option value="a*">A*</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="pencil">Pencil</Form.Label>
                            <Form.Select ref={this.pencil} id="pencil" defaultValue="wall">
                                <option data-weighted={false} value="">Erase</option>
                                <option data-weighted={false} value="wall">Wall</option>
                                <option data-weighted={true} value="weight-5" disabled={!this.state.algorithmWeighted}>Weight +5</option>
                                <option data-weighted={true} value="weight-10" disabled={!this.state.algorithmWeighted}>Weight +10</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="my-2">
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                            <Form.Range ref={this.speed} id="speed" />
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
                        <Button className="w-100" variant={RUN_DISABLED ? "danger" : "success"} disabled={RUN_DISABLED} onClick={() => this.run()}>Run</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Settings;