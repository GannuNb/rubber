import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import rc1 from "./images/rc1.jpg";
import rc2 from "./images/rc2.jpg";
import './Stainless.css'; // Add any custom styles here
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
        <Row className="align-items-center">
          {/* Carousel on the Left */}
          <Col md={6}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={rc1}
                  alt="First slide"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>High Quality Rubber Crumb</h5>
                  <p>Recycled from tyres, our rubber crumb provides an eco-friendly solution for various industries like construction and sports.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={rc2}
                  alt="Second slide"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>Versatile Uses</h5>
                  <p>Our rubber crumb is used in playgrounds, artificial turf, and more, offering shock absorption, noise reduction, and durability.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Content on the Right */}
          <Col md={6} className="text-left ">
            <h4 className="fw-bold mb-4">Rubber Crumb Overview</h4>
            <p className="lh-lg">
              Rubber crumb is a versatile material derived from recycled tyres and is used in a wide range of applications. It is commonly utilized in industries such as construction, sports, and landscaping due to its durability and sustainability. 
              <br />
              At Lakss Europe Limited, we provide rubber crumb in various sizes, including 30 Mesh and 24 Mesh, to cater to your specific requirements. Our rubber crumb is available in 1 tonne PP bags, 50 KG bags, or loose, depending on your needs.
              <br />
              Rubber crumb offers several environmental benefits by promoting the recycling of tyres and reducing landfill waste. It is also known for its shock absorption, noise reduction, and resilience properties, making it suitable for use in artificial turf, playgrounds, and more.
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
