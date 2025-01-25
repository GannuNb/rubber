import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./Home.css";
import car1 from "./images/car1.jpg";
import car2 from "./images/car2.webp";
import car3 from "./images/car3.png";
import ss304 from "./images/ss304.jpg";
import { Link } from "react-router-dom";
import fm1 from "./images/fm1.jpg";
import hsm1 from "./images/hms1.jpg";
import bt1 from "./images/bt1.jpeg";

function Home() {
  return (
    <div>
      {/* Carousel Section */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={car3}
              className="d-block w-100 h-50"
              style={{ objectFit: "cover" }}
              alt="Car 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src={car2}
              className="d-block w-100 h-50"
              style={{ objectFit: "cover" }}
              alt="Car 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src={car1}
              className="d-block w-100 h-50"
              style={{ objectFit: "cover" }}
              alt="Car 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Side: Image */}
          <div className="col-md-6">
            <img src={ss304} alt="Scrap Image" className="img-fluid rounded" />
          </div>

          {/* Right Side: Text */}
          <div className="col-md-6">
            <h2 className="fw-bold text-center fs-1">Welcome To LAVA RUBBER</h2>
            {/* Dotted structure */}
            <div className="d-flex align-items-center justify-content-center mb-3">
              {/* Left small dot */}
              <span
                className="d-inline-block"
                style={{
                  width: "0.6em",
                  height: "0.6em",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  marginRight: "1em",
                }}
              ></span>
              {/* Middle big dot */}
              <span
                className="d-inline-block"
                style={{
                  width: "0.8em",
                  height: "0.8em",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  marginRight: "1em",
                }}
              ></span>
              {/* Right small dot */}
              <span
                className="d-inline-block"
                style={{
                  width: "0.6em",
                  height: "0.6em",
                  borderRadius: "50%",
                  backgroundColor: "black",
                }}
              ></span>
            </div>
            <p className="text-muted text-left text-justify mx-5 fs-5">
              <b>
                Lava Rubber was formed in the UK to operate with the most modern
                recycling methods to recycle Metal and Rubber Scrap.
              </b>
            </p>
            <p className="text-muted text-left text-justify mx-5 fs-5">
              <b>
                Lava Rubber is equipped with extensive trading experience and
                has been focusing solely on ferrous, non-ferrous, and rubber
                scrap.
              </b>
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Our Products</h2>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <Link to="/ferrousmetal" className="no-link-style">
              <div className="card border-0 shadow-sm">
                <div
                  className="image-overlay-container"
                  style={{ height: "300px", overflow: "hidden" }}
                >
                  <img
                    src={fm1}
                    className="card-img-top"
                    alt="Ferrous Metals"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <div className="icon-overlay">
                    <i className="bi bi-box-seam"></i>
                    <span>Ferrous Metals</span>
                    <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
                  </div>
                </div>
                <div className="card-body text-center">
                  <p
                    style={{ color: "#0c2957" }}
                    className="card-text text-muted"
                  >
                    Tyre Wire, HMS1 HMS2, Steel 304
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <Link to="/nonferrousmetal" className="no-link-style">
              <div className="card border-0 shadow-sm">
                <div
                  className="image-overlay-container"
                  style={{ height: "300px", overflow: "hidden" }}
                >
                  <img
                    src={hsm1}
                    className="card-img-top"
                    alt="Non Ferrous Metals"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <div className="icon-overlay">
                    <i className="bi bi-bar-chart"></i>
                    <span>Non Ferrous Metals</span>
                    <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
                  </div>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-muted">
                    Aluminum Scrap: We can offer different kinds of alu scrap...
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <Link to="/tyrescrap" className="no-link-style">
              <div className="card border-0 shadow-sm">
                <div
                  className="image-overlay-container"
                  style={{ height: "300px", overflow: "hidden" }}
                >
                  <img
                    src={bt1}
                    className="card-img-top"
                    alt="Tyre Scrap"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <div className="icon-overlay">
                    <i className="bi bi-shield"></i>
                    <span>Tyre Scrap</span>
                    <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
                  </div>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-muted">
                    Baled Tyres: All the tyres which cannot be used as...
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="reasons-section">
        <div className="reasons-content">
          <h2 className="reasons-title">
            Reason For Choosing <br />
            <span>LAVA RUBBER</span>
          </h2>
          <ul className="reasons-list">
            <li>
              <i className="bi bi-check-circle"></i> Quick Response
            </li>
            <li>
              <i className="bi bi-check-circle"></i> Experienced
            </li>
          </ul>
        </div>
      </div>

      <div className="recycling-section">
        <h2 className="recycling-title">Recycling</h2>
        <div className="recycling-cards">
          <div className="recycling-card">
            <div className="recycling-card-icon">
              <i className="bi bi-truck"></i>
            </div>
            <div className="recycling-card-step">
              <span></span>STEP : 01<span></span>
            </div>
            <h4 className="recycling-card-title">
              Collection and Transportation
            </h4>
            <p className="recycling-card-text">
              <strong>
                Lava Rubber collects metals and scrap tyres from each
                retail location, and transports them to a secure tyre recycling
                processing facility for processing.
              </strong>
            </p>
          </div>
          <div className="recycling-card">
            <div className="recycling-card-icon">
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="recycling-card-step">
              <span></span>STEP : 02<span></span>
            </div>
            <h4 className="recycling-card-title">Sorting</h4>
            <p className="recycling-card-text">
              <strong>
                All scrap are unloaded and sorted by size and composition for
                processing.
              </strong>
            </p>
          </div>
          <div className="recycling-card">
            <div className="recycling-card-icon">
              <i className="bi bi-gear-fill"></i>
            </div>
            <div className="recycling-card-step">
              <span></span>STEP : 03<span></span>
            </div>
            <h4 className="recycling-card-title">Shredding or Baling</h4>
            <p className="recycling-card-text">
              <strong>
                Once the scrap has been sorted, we do the shredding or baling
                depending on customers.
              </strong>
            </p>
          </div>
          <div className="recycling-card">
            <div className="recycling-card-icon">
              <i className="bi bi-globe"></i>
            </div>
            <div className="recycling-card-step">
              <span></span>STEP : 04<span></span>
            </div>
            <h4 className="recycling-card-title">Transportation</h4>
            <p className="recycling-card-text">
              <strong>
                Upon baling or shredding, we export to end users globally.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
