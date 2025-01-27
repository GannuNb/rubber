import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import rg1 from "./images/rg1.jpg";
import rg2 from "./images/rg2.jpg";
import rg3 from "./images/rg3.jpg";
import rg4 from "./images/rg4.jpg";
import './Stainless.css'; // Add any custom styles here
import fm1 from "./images/fm1.jpg";
import rc1 from "./images/rc2.jpg";
import bt1 from "./images/bt1.jpeg";

function RubberGranules() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">Rubber Granules</h2>
      </div>
      <Container className="py-5">
        <Row>
          {/* Carousel on the Left */}
          <Col md={6}>
            <Carousel style={{ marginTop:"18%" }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={rg1}
                  alt="Rubber Granules 1"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>High-Quality Rubber Granules</h5>
                  <p>Recycled from tyres, these rubber granules are suitable for various applications including sports surfaces, playgrounds, and insulation.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={rg2}
                  alt="Rubber Granules 2"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>Recycled Rubber for Playgrounds</h5>
                  <p>Our rubber granules help in creating safe and durable playground surfaces that minimize impact and reduce injuries.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={rg3}
                  alt="Rubber Granules 3"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>Soundproofing Applications</h5>
                  <p>Recycled rubber granules are used in noise-reducing insulation materials for buildings and transportation areas.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={rg4}
                  alt="Rubber Granules 4"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>Enhancing Sports Surfaces</h5>
                  <p>Rubber granules are used to improve the performance of synthetic sports surfaces, making them more durable and comfortable.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Content on the Right */}
          <Col md={6} className="text-left">
            <h1>Rubber Granules</h1>
            <p>We can supply Rubber Granules in different sizes ranging from 0-2mm and 2-6mm for various applications like:</p>
            <ul>
              <li><strong>Athletics Tracks</strong><br />
                Rubber granules mixed with polyurethane binder create resilient running surfaces that offer shock absorption, increased performance, and injury reduction.
              </li>
              <li><strong>Building Insulation</strong><br />
                Mixed with polyurethane binder, recycled rubber granules provide noise-reducing insulation for walls and flooring, helping isolate sound and reduce energy costs.
              </li>
              <li><strong>Playground Surfaces</strong><br />
                Recycled rubber is used in playgrounds to minimize injury risk. These surfaces are durable, low-maintenance, and perform well in extreme weather conditions.
              </li>
              <li><strong>Brake Shoes</strong><br />
                Granulate rubber is used in the manufacture of brake shoes, reducing noise and improving wear resistance. It's also a safer and more eco-friendly alternative to asbestos-based materials.
              </li>
              <li><strong>Rubber Mats</strong><br />
                Rubber mats are produced for a variety of uses including non-slip doormats, marine surfaces, and workshop mats. These mats are hard-wearing, weather-resistant, and easy to clean.
              </li>
              <li><strong>Tarred Roads</strong><br />
                Recycled rubber granules are mixed with paint to provide added grip on tarred surfaces, improving safety in slippery areas like walkways and stairs.
              </li>
              <li><strong>New Tyres</strong><br />
                Recycled rubber is used in the manufacture of passenger and forklift tyres, reducing the need for new materials and cutting down on production costs.
              </li>
              <li><strong>Sport Surfaces</strong><br />
                Rubber granules are used beneath synthetic grass on sports fields to provide cushioning and improve the durability of the turf, especially in contact sports.
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
                  <Col md={4} className="text-center">
                    <Link to="/contact" className="btn btn-primary w-100">
                      Enquire Us
                    </Link>
                  </Col>
                </Row>

        {/* Navigation Section */}
        <Row className="align-items-center justify-content-between mt-5">
          {/* Previous Section */}
          <Col md={5} className="text-center">
            <img
              src={rc1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Rubber Crumb</h6>
            <Link to="/rubbercrumb" className="btn btn-link text-primary">
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
              src={bt1}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Baled Tyres</h6>
            <Link to="/baledtyres" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RubberGranules;
