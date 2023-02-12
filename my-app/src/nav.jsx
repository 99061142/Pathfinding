import { Navbar, Nav, Container, Dropdown, Button, Form, Row } from 'react-bootstrap'
import { Component } from 'react'

class Navigation extends Component {
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
                                    <Form.Select id="algorithm">
                                        <option value="bfs">BFS</option>
                                        <option value="dfs">DFS</option>
                                        <option value="dijkstra">Dijkstra</option>
                                        <option value="a*" selected>A*</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="pencil">Pencil</Form.Label>
                                    <Form.Select id="pencil">
                                        <option value="erase">Erase</option>
                                        <option value="wall" selected>Wall</option>
                                        <option value="weight-5">Weight +5</option>
                                        <option value="weight-10">Weight +10</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-12 col-lg-2">
                                    <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                                    <Form.Range id="speed" />
                                </Form.Group>
                                <Dropdown className="col-12 col-lg-2">
                                    <Dropdown.Toggle id="layout" className="px-3 my-4 w-100" variant="success">
                                        Layout
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Walls</Dropdown.Item>
                                        <Dropdown.Item>Random weights</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
                                <Button className="col-12 col-lg-2 px-5 my-4" variant="danger">Run</Button>
                            </Row>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        )
    }
}

export default Navigation;