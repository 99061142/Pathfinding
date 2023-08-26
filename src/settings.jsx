import { createRef, Component } from "react";
import { Col, Container, Row, FormGroup, FormLabel, FormSelect, Dropdown, Button } from 'react-bootstrap'
import { ClearAll, ClearPath, ClearWeights, ClearWalls } from './clear';
import FormRange from 'react-bootstrap/esm/FormRange';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import RandomWalls from './layouts/randomWalls';
import RandomWeights from './layouts/randomWeights';
import Run from './run';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            algorithm: '',
            algorithmWeighted: false,
            speed: 0,
            pencil: ''
        }
        this.algorithmSelect = createRef(null);
        this.pencilSelect = createRef(null);
        this.speedRange = createRef(null);
    }

    componentDidMount() {
        this.pencilChanged();
        this.algorithmChanged();
        this.speedChanged()
    }

    setAlgorithm(algorithm) {
        this.setState({
            algorithm
        });
    }

    setAlgorithmWeighted(bool) {
        this.setState({
            algorithmWeighted: bool
        });
    }

    setPencil(pencil) {
        this.setState({
            pencil
        });
    }

    setPencilWeighted(bool) {
        this.setState({
            pencilWeighted: bool
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

    algorithmChanged() {
        const ALGORITHM_SELECT = this.algorithmSelect.current;
        const CURRENT_ALGORITHM_OPTION = ALGORITHM_SELECT.options[ALGORITHM_SELECT.selectedIndex];

        const ALGORITHM = CURRENT_ALGORITHM_OPTION.value;
        this.setAlgorithm(ALGORITHM);

        const ALGORITHM_IS_WEIGHTED = CURRENT_ALGORITHM_OPTION.dataset.weighted === "true";
        this.setAlgorithmWeighted(ALGORITHM_IS_WEIGHTED);

        const CURRENT_PENCIL_WEIGHTED = this.currentPencilWeighted()
        if (CURRENT_PENCIL_WEIGHTED) {
            this.setPencil('wall');
        }
    }

    pencilChanged() {
        const PENCIL_SELECT = this.pencilSelect.current;
        const CURRENT_PENCIL_OPTION = PENCIL_SELECT.options[PENCIL_SELECT.selectedIndex];
        const PENCIL = CURRENT_PENCIL_OPTION.value;
        this.setPencil(PENCIL);
    }

    speedChanged() {
        const SPEED = Number(this.speedRange.current.value);
        this.setSpeed(SPEED)
    }

    currentPencilWeighted() {
        const PENCIL_SELECT = this.pencilSelect.current;
        const PENCIL_OPTION = PENCIL_SELECT.options[PENCIL_SELECT.selectedIndex];
        const PENCIL_WEIGHTED = PENCIL_OPTION.dataset.weighted;
        return PENCIL_WEIGHTED
    }

    async run() {
        this.props.setRunning(true)

        await Run({
            skip: false,
            board: this.props.board,
            startPos: this.props.startPos,
            endPos: this.props.endPos,
            algorithm: this.state.algorithm,
            getSpeed: this.getSpeed
        })

        this.props.setRunning(false)
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
                    <FormGroup
                        as={Col}
                        xs={4}
                        lg={true}
                        className="my-2"
                    >
                        <FormLabel
                            className="text-white"
                            htmlFor="algorithm"
                        >
                            Algorithm
                        </FormLabel>
                        <FormSelect
                            ref={this.algorithmSelect}
                            defaultValue="a*"
                            onChange={() => this.algorithmChanged()}
                            disabled={this.props.running}
                        >
                            <option
                                data-weighted={false}
                                value="bfs"
                            >
                                BFS
                            </option>
                            <option
                                data-weighted={false}
                                value="dfs"
                            >
                                DFS
                            </option>
                            <option
                                data-weighted={true}
                                value="dijkstra"
                            >
                                Dijkstra
                            </option>
                            <option
                                data-weighted={true}
                                value="a*"
                            >
                                A*
                            </option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup
                        as={Col}
                        xs={4}
                        lg={true}
                        className="my-2"
                    >
                        <FormLabel
                            className="text-white"
                            htmlFor="pencil"
                        >
                            Pencil
                        </FormLabel>
                        <FormSelect
                            id="pencil"
                            ref={this.pencilSelect}
                            value={this.state.pencil}
                            onChange={() => this.pencilChanged()}
                        >
                            <option
                                data-weighted={false}
                                data-weight={1}
                                data-type=""
                                value="erase"
                            >Erase
                            </option>
                            <option
                                data-weighted={false}
                                data-weight={Infinity}
                                data-type="wall"
                                value="wall"
                            >
                                Wall
                            </option>
                            <option
                                data-weighted={true}
                                disabled={!this.state.algorithmWeighted}
                                data-weight={10}
                                data-type=""
                                value="weight"
                            >
                                Weight
                            </option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup
                        as={Col}
                        xs={4}
                        lg={true}
                        className="my-2"
                    >
                        <FormLabel
                            className="text-white"
                            htmlFor="speed"
                        >
                            Speed
                        </FormLabel>
                        <FormRange
                            ref={this.speedRange}
                            onChange={() => this.speedChanged()}
                            id="speed"
                            max={99}
                        />
                    </FormGroup>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                        className="my-2"
                    >
                        <DropdownToggle
                            className="w-100"
                            variant={this.props.running ? "danger" : "success"}
                            disabled={this.props.running}
                        >
                            Layout
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => RandomWalls(this.props.board)}
                            >
                                Walls
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => RandomWeights(this.props.board)}
                                disabled={!this.state.algorithmWeighted}
                            >
                                Weights
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                        className="my-2"
                    >
                        <DropdownToggle
                            id="clear"
                            className="w-100"
                            variant={this.props.running ? "danger" : "success"}
                            disabled={this.props.running}
                        >
                            Clear
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => ClearWalls(this.props.board)}
                            >
                                Walls
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => ClearWeights(this.props.board)}
                            >
                                Weights
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => ClearPath(this.props.board)}
                            >
                                Path
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => ClearAll(this.props.board)}
                            >
                                All
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Col
                        xs={4}
                        lg={true}
                        className="my-2"
                    >
                        <Button
                            className="w-100"
                            variant={this.props.running ? "danger" : "success"}
                            disabled={this.props.running}
                            onClick={() => this.run()}
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