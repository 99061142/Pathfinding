import { Container, Row, Col } from "react-bootstrap";
import CellIcon from './cellIcon';

function CellInformation() {
    const TYPES = ['start', 'end', 'weight', 'wall', 'visited', 'next', 'fastest'];
    return (
        <Container fluid className="my-3 d-none d-sm-block">
            <Row className="justify-content-around text-center">
                {TYPES.map((type, key) =>
                    <Col key={key}>
                        <div className={`border border-dark cell mx-auto ${type}`}>
                            <CellIcon type={type} />
                        </div>
                        <p className="mb-0 text-capitalize">{type}</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CellInformation;