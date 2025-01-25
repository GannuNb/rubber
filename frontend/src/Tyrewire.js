import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import tw1 from "./images/tw1.jpg";
import tw2 from "./images/tw2.jpg";
import './Stainless.css'; 
import fm1 from "./images/fm1.jpg";
import hms1 from "./images/hms1.jpg";

function Tyrewire() {
  return (
    <>
    <div className="full-width-heading">
      <h2 className="text-center fw-bold mb-4 text-white py-4">Tyre Wire</h2>
    </div>
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={8}>
          <Row>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <div className="overflow-hidden" style={{ height: '400px' }}>
                  <Card.Img variant="top" src={tw1} alt="HMS 1" className="h-100 w-100 object-fit-cover" />
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <div className="overflow-hidden" style={{ height: '400px' }}>
                  <Card.Img variant="top" src={tw2} alt="HMS 2" className="h-100 w-100 object-fit-cover" />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <p className="text-center">Our steel wire is extracted from waste tyres. We provide tyre wire at two levels of rubber content as well as steel beads from commercial tyres. We can offer 5% impurities and 25% impurities of Tyre wire scrap loaded in Loose or in bags on clients preference.</p>
        </Col>
      </Row>
              <Row className="align-items-center justify-content-between mt-5">
                {/* Previous Section */}
                <Col md={5} className="text-center">
                  <img
                    src={hms1}
                    alt="Previous"
                    className="rounded-circle mb-2"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <h6 className="mb-2">HMS 1 and 2</h6>
                  <Link to="/hms" className="btn btn-link text-primary">
                    <i className="bi bi-arrow-left me-2"></i>Prev Post
                  </Link>
                </Col>
      
                {/* Divider */}
                <Col md={1} className="text-center">
                  <div
                    className="border-start"
                    style={{ height: "50px", borderWidth: "2px" }}
                  ></div>
                </Col>
      
                {/* Next Section */}
                <Col md={5} className="text-center">
                  <img
                    src={fm1}
                    alt="Next"
                    className="rounded-circle mb-2"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <h6 className="mb-2">Stainless Steel</h6>
                  <Link to="/stainless" className="btn btn-link text-primary">
                    Next Post<i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </Col>
              </Row>
    </Container>
  </>
  )
}

export default Tyrewire
