import { Container, Row, Col } from "react-bootstrap";
import CellIcon from './cellIcon';

function CellInformation() {
    const TYPES = ["start", "end", "weight", "wall", "visited", "next", "fastest"];
    return (
        <Container fluid>
            <Row className="justify-content-around text-center">
                {TYPES.map((type, key) =>
                    <Col xs={4} sm={3} md="auto" className="my-3" key={key}>
                        <div style={{ maxWidth: '24px' }} className={`border border-dark cell mx-auto ${type}`}>
                            <CellIcon type={type} />
                        </div>
                        <p style={{ textTransform: 'capitalize' }}>{type}</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CellInformation;