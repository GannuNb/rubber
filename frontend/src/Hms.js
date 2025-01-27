import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import hms1 from "./images/hms1.jpg";
import hms2 from "./images/hms2.jpg";
import fm1 from "./images/fm1.jpg";
import tw1 from "./images/tw1.jpg";
import './Stainless.css';

function Hms() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">HMS 1 and 2</h2>
      </div>
      <Container className="py-5">
        <Row className="align-items-center">
          {/* Carousel on the left side */}
          <Col md={6}>
            <Carousel>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: '400px' }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={hms1}
                    alt="HMS 1"
                  />
                </div>
                <Carousel.Caption>
                  <h3>HMS 1</h3>
                  <p>High-quality scrap metal used in steel production.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: '400px' }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={hms2}
                    alt="HMS 2"
                  />
                </div>
                <Carousel.Caption>
                  <h3>HMS 2</h3>
                  <p>Contaminated scrap metal that requires additional processing.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Information on the right side */}
          <Col md={6}>
            <h4 className="text-center fw-bold mb-1 text-black py-4 mx-4">HMS 1 and 2</h4>
            <p className="text-left text-justify mx-5 lh-lg">
              HMS (Heavy Melting Scrap) 1 and 2 are types of ferrous scrap metals that are widely used in the steelmaking process.
              <br />
              <strong>HMS 1</strong> is a high-quality scrap metal that typically consists of clean, uncoated steel scrap that is free from contaminants. It can include items such as railroad rails, structural steel, and large industrial machinery parts. HMS 1 is highly sought after in steel production because of its minimal impurities.
              <br />
              <strong>HMS 2</strong>, on the other hand, contains a higher level of contamination, including coated metals, and may have some rust or other impurities. HMS 2 is generally used for steelmaking but requires additional processing to remove contaminants before it can be used effectively.
              <br />
              Both HMS 1 and 2 are essential raw materials in the production of new steel products, helping to reduce the environmental impact of steel manufacturing by recycling scrap metal. We supply both HMS 1 and 2 in bulk container loads, offering an economical and sustainable solution for your steel production needs.
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
              src={fm1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Stainless Steel</h6>
            <Link to="/stainless" className="btn btn-link text-primary">
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
              src={tw1}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Tyre Wire</h6>
            <Link to="/tyrewire" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Hms;
