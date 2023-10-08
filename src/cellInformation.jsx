import { Container, Row, Col } from "react-bootstrap";

function CellInformation() {
    // Show the user every type of cell with the given SVG (if the type has an SVG)
    const TYPES = ["start", "end", "weight", "wall", "visited", "queued", "fastest"];
    return (
        <Container
            className="my-3 d-none d-sm-block"
            fluid
        >
            <Row
                className="justify-content-around text-center"
            >
                {TYPES.map((type, key) =>
                    <Col
                        key={key}
                    >
                        <div
                            className={"cell mx-auto" + (type === "weight" ? '' : ' ' + type)}
                            data-weight={type === "weight" ? 10 : 1}
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

export default CellInformation;