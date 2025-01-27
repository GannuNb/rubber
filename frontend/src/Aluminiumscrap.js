import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stainless.css";
import as1 from "./images/as1.jpg";
import as2 from "./images/as2.jpg";
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
          {/* Carousel on the left side */}
          <Col md={6}>
            <Carousel>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "400px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={as1}
                    alt="Aluminium Scrap 1"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Aluminium Scrap</h3>
                  <p>High-quality aluminium scrap ideal for recycling and industrial applications.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "400px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={as2}
                    alt="Aluminium Scrap 2"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Aluminium Scrap</h3>
                  <p>Recyclable aluminium scrap sourced from various industries to meet your requirements.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Information Section on the right side */}
          <Col md={6}>
  <h4 className="text-center fw-bold mb-1 text-black py-4">Aluminium Scrap </h4>
  <p className="text-left text-justify mx-5 lh-lg">
    Aluminium scrap is highly recyclable and plays a vital role in various industries, including aerospace, automotive, and construction. It's lightweight, corrosion-resistant, and energy-efficient when reused. We supply high-quality aluminium scrap that is sorted, clean, and ready for recycling.
    <br />
    Our aluminium scrap helps reduce energy consumption compared to producing new aluminium, making it an environmentally friendly choice.
    <br />
    <strong>Types of Aluminium Scrap We Offer:</strong>
    <ul>
      <li>UBC (Used Beverage Cans)</li>
      <li>Aluminium Radiators</li>
      <li>Cast Aluminium</li>
      <li>Taint/Tabor</li>
      <li>Tense</li>
    </ul>
    This variety ensures we meet the needs of different industries.
  </p>
</Col>

        </Row>
        <Row className="justify-content-center mt-5">
                  <Col md={4} className="text-center">
                    <Link to="/contact" className="btn btn-primary w-100">
                      Enquire Us
                    </Link>
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
  );
}

export default Aluminiumscrap;
