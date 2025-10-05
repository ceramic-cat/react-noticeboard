import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return <footer>
    <Container fluid>
      <Row>
        <Col className="text-center py-3 text-bg-primary">
          {/* If no longer 2025, shows 2025 - (current year) */}
          © NoticeBoard {(new Date().getFullYear() > 2025) && '2025 - '}
          {new Date().getFullYear()}
        </Col>
      </Row>
    </Container>
  </footer>;
}