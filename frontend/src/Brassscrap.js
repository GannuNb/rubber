import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import "./Stainless.css";
import bs1 from "./images/bs1.jpg";
import bs2 from "./images/bs2.jpg";
import cws1 from "./images/cws1.jpg";
import as1 from "./images/as1.jpg";

function Brassscrap() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">Brass Scrap</h2>
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
                    src={bs1}
                    alt="Brass Scrap 1"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Brass Scrap - Type 1</h3>
                  <p>This type of brass scrap consists of high-quality, clean brass suitable for recycling and industrial use.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "500px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={bs2}
                    alt="Brass Scrap 2"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Brass Scrap - Type 2</h3>
                  <p>Brass scrap with varying alloy contents, ideal for specific manufacturing and industrial processes.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Information Section on the right side */}
          <Col md={6}>
            <h4 className="text-center fw-bold mb-1 text-black py-4">Brass Scrap</h4>
            <p className="text-left text-justify mx-5 lh-lg">
              We supply high-quality brass scrap that is suitable for a wide range of industrial applications. Brass is an alloy made primarily of copper and zinc, and sometimes small amounts of other metals. Due to its unique properties such as corrosion resistance, strength, and attractive appearance, brass is widely used in various industries, including manufacturing, electronics, automotive, and more.
              <br />
             
              <br />
              All our brass scrap is available in loose form and can be supplied in bulk according to your needs. We ensure a consistent supply of high-grade brass scrap that meets international quality standards.
              <br />
              We provide brass scrap with minimal contamination, ensuring a cost-effective and sustainable solution for industries looking to recycle and reuse brass materials.
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
              src={as1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Aluminium Scrap</h6>
            <Link to="/aluminiumscrap" className="btn btn-link text-primary">
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
              src={cws1}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Copper Wire Scrap</h6>
            <Link to="/copperwirescrap" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Brassscrap;
