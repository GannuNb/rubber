import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import as1 from "./images/as1.jpg";
import as2 from "./images/as2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stainless.css'; 
import cws1 from "./images/cws1.jpg";
import bs1 from "./images/bs1.jpg";


function Aluminiumscrap() {
  return (
    <>
    <div className="full-width-heading">
      <h2 className="text-center fw-bold mb-4 text-white py-4">Aluminium Scrap</h2>
    </div>
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={8}>
          <Row>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <div className="overflow-hidden" style={{ height: '400px' }}>
                  <Card.Img variant="top" src={as1} alt="HMS 1" className="h-100 w-100 object-fit-cover" />
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <div className="overflow-hidden" style={{ height: '400px' }}>
                  <Card.Img variant="top" src={as2} alt="HMS 2" className="h-80 w-80 object-fit-cover" />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <p className="text-center">We can offer different kinds of aluminum scrap like UBC, Alu Radiators, Cast Aluminium, Taint/Tabor, Tense ETC.</p>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between mt-5">
                {/* Previous Section */}
                <Col md={5} className="text-center">
                  <img
                    src={cws1}
                    alt="Previous"
                    className="rounded-circle mb-2"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <h6 className="mb-2">Copper Wire Scrap</h6>
                  <Link to="/copperwirescrap" className="btn btn-link text-primary">
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
                    src={bs1}
                    alt="Next"
                    className="rounded-circle mb-2"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <h6 className="mb-2">Brass Scrap</h6>
                  <Link to="/brassscrap" className="btn btn-link text-primary">
                    Next Post<i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </Col>
              </Row>
    </Container>
  </>
  )
}

export default Aluminiumscrap
