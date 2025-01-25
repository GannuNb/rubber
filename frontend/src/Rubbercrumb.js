import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import rc1 from "./images/rc1.jpg";
import rc2 from "./images/rc2.jpg";
import './Stainless.css';
import fm1 from "./images/fm1.jpg";
import rg1 from "./images/rg1.jpg";
import tdf from "./images/tdf.png";



function Rubbercrumb() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">Rubber Crumb</h2>
      </div>
      <Container className="py-5">
        <Row>
          <Col md={8} className="text-left">
          <h1>Rubber Crumb</h1>
            <p>Lakss Europe Limited can supply rubber crumb in different sizes of 30 Mesh and 24 Mesh in 1 tonne PP bags or 50 KGS bags, or in loose as per Clients' Requirement.</p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={rc1} alt="Rubber Crumb 1" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={rc2} alt="Rubber Crumb 2" className="h-100 w-100 object-fit-cover" />
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
            <h6 className="mb-2">TDF (Tyre Derived Fuel)</h6>
            <Link to="/tdf" className="btn btn-link text-primary">
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
            <h6 className="mb-2">Rubber Granules</h6>
            <Link to="/rubbergranules" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Rubbercrumb;
