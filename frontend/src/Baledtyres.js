import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
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
          {/* Carousel on the Left */}
          <Col md={6}>
            <Carousel style={{ marginTop:"6%" }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bt1}
                  alt="Baled Tyres 1"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>Baled Tyres Overview</h5>
                  <p>Tyres that are no longer suitable for reuse are processed and baled for further recycling or energy recovery.</p>
                </Carousel.Caption>
              </Carousel.Item>
              {/* Add more carousel items if needed */}
            </Carousel>
          </Col>

          {/* Content on the Right */}
          <Col md={6} className="text-left">
            <h1>Baled Tyres</h1>
            <p>
              Baled tyres are waste tyres that cannot be used as part-worn tyres. These tyres are processed and compacted into bales, which can then be sent for recycling or used as raw materials in various industries.
              <br />
              We offer Baled Tyres in different sizes and weights, ensuring maximum load capacity in every container. The bales are compact and easy to handle, making transportation more efficient.
            </p>

            <h4>Applications of Baled Tyres:</h4>
            <ul>
              <li><strong>Energy Recovery:</strong><br />
                Baled tyres are often used as an energy source in industries that require a high calorific value, such as cement production and electricity generation.
              </li>
              <li><strong>Recycling:</strong><br />
                The tyres are shredded or processed further to be reused in the production of new products like rubber granules, rubber mats, and more.
              </li>
              <li><strong>Landfill Diversion:</strong><br />
                Using baled tyres reduces the environmental impact of landfill waste by repurposing them for useful applications or energy recovery.
              </li>
              <li><strong>Artificial Reefs:</strong><br />
                Some regions use large tyre bales to create artificial reefs for marine life to thrive on. This application helps both in recycling and ocean conservation.
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
