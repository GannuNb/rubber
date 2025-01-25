import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import rg1 from "./images/rg1.jpg";
import rg2 from "./images/rg2.jpg";
import rg3 from "./images/rg3.jpg";
import rg4 from "./images/rg4.jpg";
import './Stainless.css';
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
          <Col md={8} className="text-left">
          <h1>Rubber Granules</h1>
            <p>We can Supply Rubber Granules of different sizes ranging from 0-2mm and 2-6mm for usage in different applications like:</p>
            <ul>
              <li><strong>Athletics Tracks</strong><br />
                Rubber granules are mixed with polyurethane binder and then painted to produce running surfaces. The use of recycled rubber provides assistance with impact absorption, increase in performance and injury reduction.
              </li>
              <li><strong>Building Insulation</strong><br />
                Mixed with a polyurethane binder, recycled rubber granules are rolled into noise-reducing insulation. These rubber matting insulations are especially used in units and apartments, under flooring, and in walls for reducing and isolating noise. The use of a waterproof flexible binder also provides protection from the elements.
              </li>
              <li><strong>Playground Surfaces</strong><br />
                Recycled rubber is used in Play Safe surfaces, such as children’s playgrounds, to lower the force of impact and reduce injuries. These durable and low-maintenance surfaces are also porous, allowing them to perform even in the harshest South African weather climate.
              </li>
              <li><strong>Brake Shoes</strong><br />
                Granulate Rubber crumb is used in asbestos-free brake shoes. The rubber component reduces noise and improves wear. The use of heat-resistant rubber instead of asbestos-based materials is a developing technology in South Africa. As well as lowering noise and improving wear, this product also minimizes dust output to a degree to enhance vehicle appearance.
              </li>
              <li><strong>Rubber Mats</strong><br />
                A variety of matting products are made from recycled rubber, for both internal and external use, in both commercial and domestic use. These include non-slip doormats, marine surfaces, and mats for workshops and kitchens. The mats are hard-wearing, weather-resistant, and can be washed easily.
              </li>
              <li><strong>Tarred Roads</strong><br />
                Recycled rubber granules are added to paint coating, providing grip in areas that may become slippery in treacherous marine conditions. Covered areas include walkways of boats or strips that are applied to the edges of stairs.
              </li>
              <li><strong>New Tyre</strong><br />
                Added to passenger and forklift tyres (solid), recycled rubber is mixed with uncured rubber as a predictable filling compound prior to baking. This reduces the use of new materials and lowers the cost of manufacture.
              </li>
              <li><strong>Sport Surfaces</strong><br />
                Recycled rubber is used under synthetic grass for softness, particularly useful for sporting grounds. The grass is often injected directly into the recycled rubber and a polyurethane binder. Also in combination with silica sand, a layer of rubber granulate is used to hold the synthetic grass strands upright when played onto the pitch.
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={rg1} alt="Rubber Granules 1" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={rg2} alt="Rubber Granules 2" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={rg3} alt="Rubber Granules 3" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
          <Col md={6} style={{ width: '25%' }}>
            <Card className="border-0 shadow-sm mb-4">
              <div className="overflow-hidden" style={{ height: '250px' }}>
                <Card.Img variant="top" src={rg4} alt="Rubber Granules 4" className="h-100 w-100 object-fit-cover" />
              </div>
            </Card>
          </Col>
        </Row>

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
