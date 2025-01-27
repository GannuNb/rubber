import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import fm1 from "./images/fm1.jpg";
import "./Stainless.css";
import hms1 from "./images/hms1.jpg";
import tw1 from "./images/tw1.jpg";
import "./Tyrescrap.css";

const Stainless = () => {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-3 text-white py-4">
          Stainless Steel 304 and 316
        </h2>
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
                    src={fm1}
                    alt="Stainless Steel"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Stainless Steel 304</h3>
                  <p>Highly resistant to corrosion and rust, perfect for various industries.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="overflow-hidden" style={{ height: "400px" }}>
                  <img
                    className="d-block w-100 h-100 object-fit-cover"
                    src={fm1}
                    alt="Stainless Steel"
                  />
                </div>
                <Carousel.Caption>
                  <h3>Stainless Steel 316</h3>
                  <p>Enhanced corrosion resistance, especially for marine and medical use.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Text information on the right side */}
          <Col md={6}>
            <h4 className="text-center fw-bold mb-1 text-black py-4">
              Stainless Steel 304 and 316
            </h4>
            <p className="text-left text-justify mx-5 lh-lg">
              We can offer mixes of Stainless Steel SS304 and SS316 in container
              loads. Stainless Steel 304 and 316 are two of the most popular
              grades used in a wide range of industries due to their excellent
              corrosion resistance, durability, and strength.
              <br />
              <strong>SS304</strong>, also known as 18/8 stainless steel, is
              composed of 18% chromium and 8% nickel, making it highly resistant
              to oxidation and rust. It's ideal for food processing, chemical,
              and pharmaceutical industries.
              <br />
              <strong>SS316</strong>, with an added molybdenum component, offers
              enhanced corrosion resistance, especially against chloride
              environments, making it perfect for marine applications, medical
              devices, and other high-salinity environments.
              <br />
              We supply both SS304 and SS316 in bulk container loads, ensuring a
              reliable and cost-effective solution for your business needs.
            </p>
          </Col>
        </Row>

        {/* Enquire Us Button Section */}
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
              src={tw1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Tyre Wire</h6>
            <Link to="/tyrewire" className="btn btn-link text-primary">
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
              src={hms1}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">HMS 1 and 2</h6>
            <Link to="/hms" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Stainless;
