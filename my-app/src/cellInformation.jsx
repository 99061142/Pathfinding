import { faArrowRight, faHouse, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";

function CellInformation() {
    return (
        <Container className="cellInformation" fluid>
            <Row className="justify-content-around text-center">
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark start cell mx-auto">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <p>Start</p>
                </Col>
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark end cell mx-auto">
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <p>End</p>
                </Col>
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark weight cell mx-auto">
                        <FontAwesomeIcon icon={faWeightHanging} /></div>
                    <p>Weight</p>
                </Col>
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark wall cell mx-auto"></div>
                    <p>Wall</p>
                </Col>
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark visited cell mx-auto"></div>
                    <p>Visited</p>
                </Col>
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark next cell mx-auto"></div>
                    <p>Next</p>
                </Col>
                <Col xs={4} sm={3} md="auto" className="my-3">
                    <div className="border border-dark fastest cell mx-auto"></div>
                    <p>Fastest</p>
                </Col>
            </Row>
        </Container>
    );
}

export default CellInformation;