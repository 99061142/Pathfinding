// Imports to render the component
import { Component, createRef } from 'react';
import { Col, Container, Row, FormGroup, FormLabel, Dropdown, Button } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { faCheck, faWeightHanging } from '@fortawesome/free-solid-svg-icons'

// Styling for the component
import './styling/settings.scss';

// Imports to clear the board cell(s)
import { ClearAll, ClearPath, ClearWeights, ClearWalls } from './clear';

// Board layouts
import RandomWalls from './layouts/randomWalls';
import RandomWeights from './layouts/randomWeights';

// Run function for the algorithm
import Run from './run';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            algorithm: 'A*',
            algorithmWeighted: true,
            speed: 50,
        };
        this.pencilWeighted = false;
        this.pencilDropdownMenu = createRef(null);
    }

    setAlgorithm(algorithm) {
        this.setState({
            algorithm
        });
    }

    setAlgorithmWeighted(weighted) {
        this.setState({
            algorithmWeighted: weighted
        });
    }

    getSpeed = () => {
        const SPEED = this.state.speed;
        return SPEED
    }

    setSpeed(speed) {
        this.setState({
            speed
        });
    }

    async algorithmChanged(algorithm, e) {
        this.setAlgorithm(algorithm);

        const ALGORITHM_WEIGHTED = e.target.dataset.weighted === "true";
        this.setAlgorithmWeighted(ALGORITHM_WEIGHTED);

        // Set the pencil to 'wall' if the chosen algorithm isn't weighted, but the pencil is
        // And clear all weights on the board
        if (!ALGORITHM_WEIGHTED) {
            ClearWeights(this.props.board);

            if (this.pencilWeighted) {
                this.pencilChanged('wall');
            }
        }
        ClearPath(this.props.board);
    }

    pencilChanged(type) {
        this.props.setPencilType(type);

        const DROPDOWN_MENU = this.pencilDropdownMenu.current;
        const CLICKED_OPTION = DROPDOWN_MENU.querySelector(`[data-type=${type}]`);

        const WEIGHT = Number(CLICKED_OPTION.dataset.weight);
        this.props.setPencilWeight(WEIGHT);

        const PENCIL_WEIGHTED = CLICKED_OPTION.dataset.weighted === "true";
        this.pencilWeighted = PENCIL_WEIGHTED;
    }

    speedChanged(e) {
        const SPEED = Number(e.target.value);
        this.setSpeed(SPEED);
    }

    render() {
        return (
            <Container
                className="bg-dark py-3"
                fluid
            >
                <Row
                    className="d-flex align-items-center"
                >
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                        onSelect={
                            (algorithm, e) => this.algorithmChanged(
                                algorithm,
                                e
                            )
                        }
                    >
                        <DropdownToggle
                            id="algorithm"
                            className={"w-100 m-0 text-center btn btn-dark" + (this.props.running ? " text-danger" : '')}
                            disabled={this.props.running}
                        >
                            Algorithms
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                data-weighted={false}
                                active={this.state.algorithm === "BFS"}
                                eventKey="BFS"
                                as={Button}
                            >
                                Best First Search
                                <FontAwesomeIcon
                                    icon={faCheck}
                                />
                            </DropdownItem>
                            <DropdownItem
                                data-weighted={false}
                                active={this.state.algorithm === "DFS"}
                                eventKey="DFS"
                                as={Button}
                            >
                                Depth First Search
                            </DropdownItem>
                            <Dropdown.Divider />
                            <DropdownItem
                                data-weighted={true}
                                active={this.state.algorithm === "Dijkstra"}
                                eventKey="Dijkstra"
                                as={Button}
                            >
                                Dijkstra
                                <FontAwesomeIcon
                                    icon={faCheck}
                                />
                                <FontAwesomeIcon
                                    icon={faWeightHanging}
                                />
                            </DropdownItem>
                            <DropdownItem
                                data-weighted={true}
                                active={this.state.algorithm === "A*"}
                                eventKey="A*"
                                as={Button}
                            >
                                A*
                                <FontAwesomeIcon
                                    icon={faCheck}
                                />
                                <FontAwesomeIcon
                                    icon={faWeightHanging}
                                />
                            </DropdownItem>
                            <DropdownItem
                                data-weighted={true}
                                active={this.state.algorithm === "GBFS"}
                                eventKey="GBFS"
                                as={Button}
                            >
                                Greedy Best First Search
                                <FontAwesomeIcon
                                    icon={faWeightHanging}
                                />
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <FormGroup
                        as={Col}
                        xs={4}
                        lg={true}
                    >
                        <FormLabel
                            className="text-white"
                            htmlFor="speed"
                        >
                            Speed
                        </FormLabel>
                        <FormRange
                            onChange={(e) => this.speedChanged(e)}
                            id="speed"
                            max={99}
                        />
                    </FormGroup>
                    <Col
                        xs={4}
                        lg={true}
                    >
                        <Run
                            algorithm={this.state.algorithm}
                            getSpeed={this.getSpeed}
                            setRunning={this.props.setRunning}
                            running={this.props.running}
                            board={this.props.board}
                            startPos={this.props.startPos}
                            endPos={this.props.endPos}
                        />
                    </Col>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                        onSelect={
                            (type) => this.pencilChanged(
                                type
                            )
                        }
                    >
                        <DropdownToggle
                            id="pencil"
                            className="w-100 m-0 text-center btn btn-dark"
                        >
                            Pencil
                        </DropdownToggle>
                        <DropdownMenu
                            ref={this.pencilDropdownMenu}
                        >
                            <DropdownItem
                                data-weighted={false}
                                data-weight={1}
                                data-type="erase"
                                active={this.props.pencilType === "erase"}
                                eventKey="erase"
                                as={Button}
                            >
                                Erase
                            </DropdownItem>
                            <DropdownItem
                                data-weighted={false}
                                data-weight={Infinity}
                                data-type="wall"
                                active={this.props.pencilType === "wall"}
                                eventKey="wall"
                                as={Button}
                            >
                                Wall
                            </DropdownItem>
                            <Dropdown.Divider />
                            <DropdownItem
                                style={{
                                    color: this.state.algorithmWeighted ? null : "#dc3545"
                                }}
                                disabled={!this.state.algorithmWeighted}
                                data-weight={10}
                                data-weighted={true}
                                data-type="weight"
                                active={this.props.pencilType === "weight"}
                                eventKey="weight"
                                as={Button}
                            >
                                Weight
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                    >
                        <DropdownToggle
                            id="layout"
                            className={"w-100 m-0 text-center btn btn-dark" + (this.props.running ? " text-danger" : '')}
                            disabled={this.props.running}
                        >
                            Layout
                        </DropdownToggle>
                        <DropdownMenu>
                            <RandomWalls
                                board={this.props.board}
                            />
                            <Dropdown.Divider />
                            <RandomWeights
                                board={this.props.board}
                                algorithmWeighted={this.state.algorithmWeighted}
                            />
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                    >
                        <DropdownToggle
                            id="clear"
                            className={"w-100 m-0 text-center btn btn-dark" + (this.props.running ? " text-danger" : '')}
                            disabled={this.props.running}
                        >
                            Clear
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                as={Button}
                                onClick={() => ClearWalls(this.props.board)}
                            >
                                Walls
                            </DropdownItem>
                            <DropdownItem
                                as={Button}
                                onClick={() => ClearWeights(this.props.board)}
                            >
                                Weights
                            </DropdownItem>
                            <DropdownItem
                                as={Button}
                                onClick={() => ClearPath(this.props.board)}
                            >
                                Path
                            </DropdownItem>
                            <DropdownItem
                                as={Button}
                                onClick={() => ClearAll(this.props.board)}
                            >
                                All
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Row>
            </Container>
        );
    }
}

export default Settings;