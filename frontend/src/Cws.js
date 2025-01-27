import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import "./Stainless.css";
import cws1 from "./images/cws1.jpg";
import cws2 from "./images/cws2.jpg";
import bs1 from "./images/bs1.jpg";
import as1 from "./images/as1.jpg";

function Cws() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">Copper Wire Scrap</h2>
      </div>
      <Container className="py-5">
        <Row className="align-items-center">
          {/* Carousel on the left side */}
          <Col md={6}>
            <Carousel>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "500px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={cws1}
                    alt="Copper Wire Scrap 1"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Copper Wire Scrap - Type 1</h3>
                  <p>Pure copper wire scrap ideal for recycling and industrial processes.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "500px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={cws2}
                    alt="Copper Wire Scrap 2"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Copper Wire Scrap - Type 2</h3>
                  <p>Copper wire scrap with varying copper purity, suitable for different applications.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Information Section on the right side */}
          <Col md={6}>
            <h4 className="text-center fw-bold mb-1 text-black py-4">Copper Wire Scrap </h4>
            <p className="text-left text-justify mx-5 lh-lg">
              Copper wire scrap is a valuable material for recycling due to its high copper content and its role in various industrial applications. Copper is one of the most recycled metals in the world, and copper wire scrap is highly sought after for its purity and conductivity properties.
              <br />
              We offer three types of copper wire scrap:
              <br />
              <ul>
                <li><strong>100% Copper Wire Scrap:</strong> This type of scrap contains pure copper with minimal impurities, perfect for industrial applications requiring high copper purity.</li>
                <li><strong>92% Copper Wire Scrap:</strong> Contains 92% copper and is suitable for use in electrical and electronic components where high conductivity is needed.</li>
                <li><strong>Copper Wire Scrap with Impurities:</strong> This includes copper wire with varying levels of impurities, ideal for applications where lower-grade copper can be used.</li>
              </ul>
              <br />
              We offer these copper wire scrap types in bulk container loads, providing flexibility based on your business needs. Our copper scrap is sourced from trusted suppliers and processed to meet the required industry standards, ensuring you get the best quality material at competitive prices.
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
              src={bs1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Brass Scrap</h6>
            <Link to="/brassscrap" className="btn btn-link text-primary">
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
              src={as1}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Aluminium Scrap</h6>
            <Link to="/aluminiumscrap" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cws;
