import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bt1 from "./images/bt1.jpeg";
import './Stainless.css';
import fm1 from "./images/fm1.jpg";
import rg1 from "./images/rg1.jpg";
import tdf from "./images/tdf.png";



function Baledtyres() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">Baled Tyres</h2>
      </div>
      <Container className="py-5">
        <Row>
          <Col md={8} className="text-left">
          <h1>
          Baled Tyres
          </h1>
            <p>All the tyres which cannot be used as part worn tyres are put into the waste stream for further processing. We offer Baled Tyres with different sizes and weights to ensure maximum load capacity in every container.</p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={bt1} alt="Baled Tyres" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-between mt-5">
          {/* Previous Section */}
          <Col md={5} className="text-center">
            <img
              src={rg1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Rubber Granules</h6>
            <Link to="/rubbergranules" className="btn btn-link text-primary">
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
              src={tdf}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">TDF (Tyre Derived Fuel)</h6>
            <Link to="/tdf" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Baledtyres;
