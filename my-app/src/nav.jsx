import { Navbar, Nav, Container, Dropdown, Button, Form, Row } from 'react-bootstrap'
import Board from './board';
import Bfs from './algorithms/bfs';

class Navigation extends Board {
    constructor() {
        super();
        this.state = {
            ...this.state,
            speed: 50,
            algorithm: "a*",
            pencil: "wall"
        };
    }

    setSpeed(element) {
        const VAL = Number(element.target.value);
        this.setState({
            speed: VAL
        });
    }

    setAlgorithm(element) {
        const VAL = element.target.value;
        this.setState({
            algorithm: VAL
        })
    }

    setPencil(element) {
        const VAL = element.target.value;
        this.setState({
            pencil: VAL
        })
    }

    run() {
        const ALGORITHM = this.state.algorithm
        const STATES = {
            board: this.state.board,
            start: this.state.startPos,
            end: this.state.endPos,
            speed: this.state.speed
        }
        if (ALGORITHM == "bfs") {
            new Bfs(STATES);
            return;
        }
        throw Error(`ALGORITHM "${ALGORITHM}" not found.`)
    }

    render() {
        return (
            <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Pathfinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" style={{ maxHeight: '130px' }} navbarScroll>
                            <Row>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="algorithm">Algorithm</Form.Label>
                                    <Form.Select id="algorithm" defaultValue={this.state.algorithm} onChange={(element) => this.setAlgorithm(element)}>
                                        <option value="bfs">BFS</option>
                                        <option value="dfs">DFS</option>
                                        <option value="dijkstra">Dijkstra</option>
                                        <option value="a*">A*</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="pencil">Pencil</Form.Label>
                                    <Form.Select id="pencil" defaultValue={this.state.pencil} onChange={(element) => this.setPencil(element)}>
                                        <option value="erase">Erase</option>
                                        <option value="wall">Wall</option>
                                        <option value="weight-5">Weight +5</option>
                                        <option value="weight-10">Weight +10</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                                    <Form.Range id="speed" value={this.state.speed} onChange={(element) => this.setSpeed(element)} />
                                </Form.Group>
                                <Dropdown className="col-12 col-lg-2">
                                    <Dropdown.Toggle id="layout" className="px-3 my-4 w-100" variant="success">
                                        Layout
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Random Walls</Dropdown.Item>
                                        <Dropdown.Item>Random weights</Dropdown.Item>
                                    </Dropdown.Menu >
                                </Dropdown >
                                <Dropdown className="col-12 col-lg-2">
                                    <Dropdown.Toggle id="clear" className="px-3 my-4 w-100" variant="success">
                                        Clear
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Walls</Dropdown.Item>
                                        <Dropdown.Item>Weights</Dropdown.Item>
                                        <Dropdown.Item>Path</Dropdown.Item>
                                        <Dropdown.Item>All</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button className="col-12 col-lg-2 px-5 my-4" variant={this.state.running || !this.state.startPos || !this.state.endPos ? "danger" : "success"} onClick={() => this.run()}>Run</Button>
                            </Row >
                        </Nav >
                    </Navbar.Collapse >
                </Container >
            </Navbar >
        )
    }
}

export default Navigation;