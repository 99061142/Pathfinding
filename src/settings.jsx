import { Component, createRef } from 'react';
import { Col, Container, Row, FormGroup, FormLabel, Dropdown, Button } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import './styling/settings.scss';
import Run from './Run';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            running: false,
            algorithmIndex: 3, // A*
            pencilIndex: 1 // Wall
        };
        this.speedRef = createRef(null);
        this.speed = null; // Set when component did mount (default value of speed range)
        this.pencils = [
            {
                name: "erase",
                weighted: false,
                cellStates: {
                    type: '',
                    weight: 1
                }
            },
            {
                name: "wall",
                weighted: false,
                cellStates: {
                    type: "wall",
                    weight: Infinity
                }
            },
            {
                name: "weight",
                weighted: true,
                cellStates: {
                    type: "weight",
                    weight: 10
                }
            }
        ]
        this.algorithms = [
            {
                abbrivation: "bfs",
                name: "Best First Search",
                weighted: false,
                guaranteed_shortest_path: true
            },
            {
                abbrivation: "dfs",
                name: "Depth First Search",
                weighted: false,
                guaranteed_shortest_path: false
            },
            {
                abbrivation: "dijkstra",
                name: "Dijkstra",
                weighted: true,
                guaranteed_shortest_path: true
            },
            {
                abbrivation: "a*",
                name: "A*",
                weighted: true,
                guaranteed_shortest_path: true
            },
            {
                abbrivation: "gbfs",
                name: "Greedy Best First Search",
                weighted: true,
                guaranteed_shortest_path: false
            }
        ];
    }

    componentDidMount() {
        this.speed = Number(this.speedRef.current.value);
    }

    get running() {
        const RUNNING = this.state.running;
        return RUNNING
    }

    setRunning = (bool) => {
        this.setState({
            running: bool
        });
    }

    get pencilCellStates() {
        const PENCIL_CELL_STATES = this.pencils[this.state.pencilIndex].cellStates;
        return PENCIL_CELL_STATES
    }

    get pencil() {
        const PENCIL = this.pencils[this.state.pencilIndex];
        return PENCIL
    }

    /**
     * @param {int} pencilIndex
     */
    set pencilIndex(pencilIndex) {
        this.setState({
            pencilIndex
        });
    }

    get algorithm() {
        const ALGORITHM = this.algorithms[this.state.algorithmIndex];
        return ALGORITHM
    }

    /**
     * @param {int} algorithmIndex
     */
    set algorithmIndex(algorithmIndex) {
        this.setState({
            algorithmIndex
        });
    }


    async algorithmChanged(algorithmIndex) {
        // If the algorithm isn't changed, return
        if (algorithmIndex === this.state.algorithmIndex) return

        // If the algorithm is changed from weighted to unweighted
        const board = this.props.board.current;
        if (
            this.algorithm.weighted &&
            !this.algorithms[algorithmIndex].weighted
        ) {
            if (this.pencil.weighted) this.pencilIndex = 1; // Set the pencil to a wall
            if (document.querySelector('.cell[class*="weight"]')) await board.clearWeights();
        }
        if (board.hasPath) await board.clearPath();
        this.algorithmIndex = algorithmIndex;
    }

    speedChanged(ev) {
        const SPEED = Number(ev.target.value);
        this.speed = SPEED;
    }

    get pencilType() {
        const PENCIL_TYPE = this.state.pencilType;
        return PENCIL_TYPE
    }

    set pencilType(type) {
        this.setState({
            pencilType: type
        })
    }

    pencilChanged(pencilIndex) {
        this.pencilIndex = Number(pencilIndex);
    }

    render() {
        const clearButtonValues = [
            "walls",
            "weights",
            "path",
            "all"
        ];

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
                        onSelect={(algorithmIndex) => this.algorithmChanged(Number(algorithmIndex))}
                    >
                        <DropdownToggle
                            id="this.algorithms"
                            className={
                                "w-100 m-0 text-center btn btn-dark" +
                                (this.state.running ? " text-danger" : '')
                            }
                            disabled={this.state.running}
                        >
                            Algorithms
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.algorithms
                                .map((algorithm, i) =>
                                    <DropdownItem
                                        active={this.state.algorithmIndex === i}
                                        eventKey={i}
                                        as={Button}
                                        key={algorithm.abbrivation}
                                    >
                                        {algorithm.name}
                                        {algorithm.guaranteed_shortest_path &&
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                            />
                                        }
                                        {algorithm.weighted &&
                                            <FontAwesomeIcon
                                                icon={faWeightHanging}
                                            />
                                        }
                                    </DropdownItem>
                                )}
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
                            ref={this.speedRef}
                            defaultValue={50}
                            onChange={(ev) => this.speedChanged(ev)}
                            id="speed"
                            max={99}
                        />
                    </FormGroup>
                    <Col
                        xs={4}
                        lg={true}
                    >
                        <Run
                            speedRef={this.speedRef}
                            getSpeed={() => this.speed}
                            setRunning={this.setRunning}
                            algorithm={this.algorithm}
                            running={this.state.running}
                            board={this.props.board}
                        />
                    </Col>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                        onSelect={(pencilIndex) => this.pencilChanged(Number(pencilIndex))}
                    >
                        <DropdownToggle
                            id="pencils"
                            className="w-100 m-0 text-center btn btn-dark"
                        >
                            Pencil
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.pencils
                                .map((pencil, i) =>
                                    <DropdownItem
                                        className="text-capitalize"
                                        active={this.state.pencilIndex === i}
                                        disabled={
                                            pencil.weighted &&
                                            !this.algorithm.weighted
                                        }
                                        as={Button}
                                        eventKey={i}
                                        key={i}
                                    >
                                        {pencil.name}
                                    </DropdownItem>
                                )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                    >
                        <DropdownToggle
                            id="layouts"
                            className={
                                "w-100 m-0 text-center btn btn-dark" +
                                (this.state.running ? " text-danger" : '')
                            }
                            disabled={this.state.running}
                        >
                            Layouts
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                as={Button}
                                onClick={() => this.props.board.current.randomWalls()}
                            >
                                Random Walls
                            </DropdownItem>
                            <DropdownItem
                                as={Button}
                                onClick={() => this.props.board.current.randomWeights()}
                                disabled={
                                    !this.algorithm.weighted
                                }
                            >
                                Random Weights
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                    >
                        <DropdownToggle
                            id="clear"
                            className={
                                "w-100 m-0 text-center btn btn-dark" +
                                (this.state.running ? " text-danger" : '')
                            }
                            disabled={this.state.running}
                        >
                            Clear
                        </DropdownToggle>
                        <DropdownMenu>
                            {clearButtonValues
                                .map(clearButtonValue => {
                                    const UPPERCASED_BTN_VALUE = clearButtonValue[0].toUpperCase() + clearButtonValue.slice(1);
                                    return (
                                        <DropdownItem
                                            as={Button}
                                            onClick={() => this.props.board.current["clear" + UPPERCASED_BTN_VALUE]()}
                                            key={clearButtonValue}
                                        >
                                            {UPPERCASED_BTN_VALUE}
                                        </DropdownItem>
                                    );
                                }
                                )}
                        </DropdownMenu>
                    </Dropdown>
                </Row>
            </Container>
        )
    }
}

export default Settings;