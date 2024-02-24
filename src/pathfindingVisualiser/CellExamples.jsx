import { Container, Row, Col } from "react-bootstrap";
import './styling/cell.scss';

function CellExamples() {
    // Show every possible type of the cell
    const TYPES = [
        "start",
        "end",
        "wall",
        "weight",
        "visited",
        "queued",
        "route"
    ];
    return (
        <Container
            className="my-3 d-none d-sm-block"
            fluid
        >
            <Row
                className="justify-content-around text-center"
            >
                {TYPES
                    .map(type =>
                        <Col
                            key={type}
                        >
                            <div
                                className={"cell-example mx-auto " + type}
                            >
                            </div>
                            <p
                                className="mb-0 text-capitalize"
                            >
                                {type}
                            </p>
                        </Col>
                    )}
            </Row>
        </Container>
    );
}

export default CellExamples;