import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
          <Col md={8} className="text-left">
          <h1>TDF (Tyre Derived Fuel)</h1>
            <p>
              Tyre-derived fuel (TDF) is composed of shredded scrap tires. Tires may be mixed with coal or other fuels, such as wood or chemical wastes, to be burned in concrete kilns, power plants, or paper mills.
            </p>
            <p>
              TDF has a very high energy content, with an average heat value of 15,500 BTUs per 0.45Kg of fuel. This is roughly the same as heavy petroleum fuel oils. Fuel begins to burn (flashpoint) at 290 to 340 degrees Celsius. Complete combustion is achieved with flame temperatures of 650 degrees Celsius.
            </p>
            <p>
              Global Tyre Recyclers can supply TDF/Tyre Shreds from 20 mm to 200mm in loose or bags as per clients’ requirements.
            </p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={tdf} alt="Tyre Derived Fuel" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
        </Row>

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
