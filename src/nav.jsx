import { Navbar, Nav, Container, Dropdown, Button, Form, Row } from 'react-bootstrap'
import { createRef } from 'react';
import Board from './board';
import Bfs from './algorithms/bfs';
import Dfs from './algorithms/dfs';
import Dijkstra from './algorithms/dijkstra';
import AStar from './algorithms/aStar';

class Navigation extends Board {
    constructor() {
        super();
        this.state = {
            ...this.state,
            speed: 50,
            algorithm: {
                weighted: true,
                name: "a*"
            }
        };
        this.pencil = createRef();
    }

    getSpeed = () => {
        const SPEED = this.state.speed;
        return SPEED
    }

    setSpeed(value) {
        value = Number(value);
        this.setState({
            speed: value
        });
    }

    setAlgorithm(value) {
        const WEIGHTED_ALGORITHMS = ['a*', 'dijkstra'];
        const IS_WEIGHTED = WEIGHTED_ALGORITHMS.includes(value);
        this.setState({
            algorithm: {
                weighted: IS_WEIGHTED,
                name: value
            }
        });

        // If the algorithm isn't weighted, but the pencil value is, set pencil value to "wall" and clear weighted cells
        const PENCIL_ELEMENT = this.pencil.current;
        if (!IS_WEIGHTED) {
            PENCIL_ELEMENT.value = "wall";
            this.clearCells('weight');
        }
        this.clearCells('path');
    }

    async run() {
        const ALGORITHM = this.state.algorithm.name
        const STATES = {
            startPos: this.props.startPos,
            endPos: this.props.endPos,
            board: this.props.board,
            getSpeed: this.getSpeed,
            setCellData: this.props.setCellData
        }
        this.clearCells('path')
        this.props.setRunning(true);
        switch (ALGORITHM) {
            case "bfs":
                await new Bfs(STATES).run();
                break
            case "dfs":
                await new Dfs(STATES).run();
                break
            case "dijkstra":
                await new Dijkstra(STATES).run();
                break
            case "a*":
                await new AStar(STATES).run();
                break
            default:
                throw Error(`algorithm "${ALGORITHM}" not found.`);
        }
        this.props.setRunning(false);
    }

    refresh() {
        // Refresh the page
        window.location.reload();
    }

    render() {
        const RUN_DISABLED = this.props.running || !this.props.startPos || !this.props.endPos;
        return (
            <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand onClick={() => this.refresh} style={{ cursor: 'pointer' }}>Pathfinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" style={{ maxHeight: '130px' }} navbarScroll>
                            <Row>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="algorithm">Algorithm</Form.Label>
                                    <Form.Select id="algorithm" defaultValue={this.state.algorithm.name} onChange={(element) => this.setAlgorithm(element.target.value)} disabled={this.props.running}>
                                        <option value="bfs">BFS</option>
                                        <option value="dfs">DFS</option>
                                        <option value="dijkstra">Dijkstra</option>
                                        <option value="a*">A*</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="pencil">Pencil</Form.Label>
                                    <Form.Select ref={this.pencil} id="pencil" defaultValue="wall">
                                        <option value="erase">Erase</option>
                                        <option value="wall">Wall</option>
                                        <option value="weight-5" disabled={!this.state.algorithm.weighted}>Weight +5</option>
                                        <option value="weight-10" disabled={!this.state.algorithm.weighted}>Weight +10</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                                    <Form.Range id="speed" value={this.state.speed} onChange={(element) => this.setSpeed(element.target.value)} />
                                </Form.Group>
                                <Dropdown className="col-12 col-lg-2">
                                    <Dropdown.Toggle id="layout" className="px-3 my-4 w-100" variant={this.props.running ? "danger" : "success"} disabled={this.props.running}>
                                        Layout
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.randomCells('wall')}>Random Walls</Dropdown.Item>
                                        <Dropdown.Item disabled={!this.state.algorithm.weighted} onClick={() => this.randomCells('weight')}>Random weights</Dropdown.Item>
                                    </Dropdown.Menu >
                                </Dropdown>
                                <Dropdown className="col-12 col-lg-2">
                                    <Dropdown.Toggle id="clear" className="px-3 my-4 w-100" variant={this.props.running ? "danger" : "success"} disabled={this.props.running}>
                                        Clear
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.clearCells('wall')}>Walls</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.clearCells('weight')}>Weights</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.clearCells('path')}>Path</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.clearCells('all')}>All</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button className="col-12 col-lg-2 px-5 my-4" variant={RUN_DISABLED ? "danger" : "success"} disabled={RUN_DISABLED} onClick={() => this.run()}>Run</Button>
                            </Row>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navigation;