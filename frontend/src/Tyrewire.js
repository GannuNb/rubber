import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import tw1 from "./images/tw1.jpg";
import tw2 from "./images/tw2.jpg";
import fm1 from "./images/fm1.jpg";
import hms1 from "./images/hms1.jpg";
import "./Stainless.css"; 

function Tyrewire() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">Tyre Wire</h2>
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
                    src={tw1}
                    alt="Tyre Wire 1"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Tyre Wire - Low Rubber Content</h3>
                  <p>Extracted from waste tyres with minimal rubber impurities, ideal for various industrial uses.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "500px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={tw2}
                    alt="Tyre Wire 2"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Tyre Wire - High Rubber Content</h3>
                  <p>Higher rubber content for applications requiring flexibility and specific material properties.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Information Section on the right side */}
          <Col md={6}>
            <h4 className="text-center fw-bold mb-1 text-black py-4">
              Tyre Wire Scrap
            </h4>
            <p className="text-left text-justify mx-5 lh-lg">
              Our steel wire is extracted from waste tyres, offering a sustainable and cost-effective material for various industries. Tyre wire is predominantly used in the production of steel products and is highly valued for its durability and strength. We offer tyre wire at two different impurity levels:
              <br />
              <strong>Low Rubber Content (5% Impurities):</strong> This grade is ideal for applications where minimal contamination is required. It is perfect for recycling purposes, such as in steel mills, and ensures minimal processing before reuse.
              <br />
              <strong>High Rubber Content (25% Impurities):</strong> This grade has a higher rubber content, which may be suitable for specific applications that require greater flexibility or specific characteristics. It is also ideal for manufacturing tires or for other industrial uses that don’t require high purity.
              <br />
              Additionally, we supply steel beads extracted from commercial tyres, which are used for a variety of applications. All of our tyre wire scrap can be delivered in loose form or in bags, depending on the client's preference.
              <br />
              We strive to provide our clients with high-quality tyre wire scrap, ensuring a reliable and efficient supply chain. Let us know your requirements, and we will work with you to deliver the best solution for your needs.
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
  );
}

export default Tyrewire;
