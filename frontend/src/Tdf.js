import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import tdf from "./images/tdf.png";
import './Stainless.css';
import fm1 from "./images/fm1.jpg";
import bt1 from "./images/bt1.jpeg";
import rc1 from "./images/rc2.jpg";

function Tdf() {
  return (
    <>
      <div className="full-width-heading">
        <h2 className="text-center fw-bold mb-4 text-white py-4">TDF (Tyre Derived Fuel)</h2>
      </div>
      <Container className="py-5">
        <Row>
          {/* Carousel on the Left */}
          <Col md={6}>
            <Carousel style={{ marginTop:"18%" }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={tdf}
                  alt="Tyre Derived Fuel"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>Tyre Derived Fuel (TDF)</h5>
                  <p>TDF is an energy-efficient alternative fuel derived from shredded scrap tires.</p>
                </Carousel.Caption>
              </Carousel.Item>
              {/* You can add more carousel items if you have more images related to TDF */}
            </Carousel>
          </Col>

          {/* Content on the Right */}
          <Col md={6} className="text-left">
            <h1>TDF (Tyre Derived Fuel)</h1>
            <p>
              Tyre-derived fuel (TDF) is made from shredded scrap tires and is commonly used as a replacement for fossil fuels in industries such as cement production, power plants, and paper mills. TDF has a high calorific value and is used primarily for its energy content.
            </p>
            <p>
              TDF has a very high energy content, with an average heat value of 15,500 BTUs per 0.45kg of fuel. This is roughly equivalent to heavy petroleum fuel oils. The fuel has a flashpoint ranging from 290 to 340 degrees Celsius, and complete combustion is achieved at temperatures around 650 degrees Celsius.
            </p>
            <p>
              Global Tyre Recyclers can supply TDF/Tyre Shreds ranging from 20 mm to 200 mm in size. These can be delivered in loose form or in bags, depending on the specific needs of the client.
            </p>
            
            <h4>Applications of TDF:</h4>
            <ul>
              <li><strong>Cement Kilns:</strong><br />
                TDF is commonly used as an alternative fuel in cement production. It helps reduce the reliance on coal and other fossil fuels, contributing to a more sustainable production process.
              </li>
              <li><strong>Power Plants:</strong><br />
                TDF is burned in power plants to generate electricity. Its high energy content makes it an ideal substitute for coal, helping to reduce the environmental impact of traditional fuel sources.
              </li>
              <li><strong>Paper Mills:</strong><br />
                In paper manufacturing, TDF is used as a supplementary fuel source, reducing the consumption of natural resources and minimizing waste.
              </li>
              <li><strong>Energy Recovery:</strong><br />
                TDF is utilized in industries for energy recovery. Its high energy output makes it an efficient and cost-effective fuel for many heavy industries.
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
              src={bt1}
              alt="Previous"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Baled Tyres</h6>
            <Link to="/baledtyres" className="btn btn-link text-primary">
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
              src={rc1}
              alt="Next"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <h6 className="mb-2">Rubber Crumb</h6>
            <Link to="/rubbercrumb" className="btn btn-link text-primary">
              Next Post<i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Tdf;
