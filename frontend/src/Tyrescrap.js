  import React from 'react';
  import "./Home.css";
  import { Link } from "react-router-dom";
  import rc2 from "./images/rc2.jpg";
  import rg3 from "./images/rg3.jpg";
  import bt1 from "./images/bt1.jpeg";
  import tdf from "./images/tdf.png";
  import './Tyrescrap.css';

  function Tyrescrap() {
    return (
      <div>
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-4">Tyre Scrap</h2>
          <div className="row">

            {/* Card 1 */}
            <div className="col-md-4 mb-4">
              <Link to="/rubbercrumb" className="no-link-style">
                <div className="card border-0 shadow-sm">
                  <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
                    <img src={rc2} className="card-img-top" alt="Rubbercrumb" style={{ height: '100%', objectFit: 'cover' }} />
                    <div className="icon-overlay">
                      <i className="bi bi-box-seam"></i>
                      <span>Rubbercrumb</span>
                      <i className="bi bi-arrow-right arrow-icon" style={{ marginLeft: '20px' }}></i> {/* Right arrow icon */}
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <p style={{ color: "#0c2957" }} className="card-text text-muted">
                      Lava Rubber Limited can supply rubber crumb in different ...
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <Link to="/rubbergranules" className="no-link-style">
                <div className="card border-0 shadow-sm">
                  <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
                    <img src={rg3} className="card-img-top" alt="Rubber Granules" style={{ height: '100%', objectFit: 'cover' }} />
                    <div className="icon-overlay">
                      <i className="bi bi-bar-chart"></i>
                      <span>Rubber Granules</span>
                      <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <p className="card-text text-muted">
                      We can Supply Rubber Granules of different sizes ranging from ..
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <Link to="/baledtyres" className="no-link-style">
                <div className="card border-0 shadow-sm">
                  <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
                    <img src={bt1} className="card-img-top" alt="Baled Tyres" style={{ height: '100%', objectFit: 'cover' }} />
                    <div className="icon-overlay">
                      <i className="bi bi-shield"></i>
                      <span>Baled Tyres</span>
                      <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <p className="card-text text-muted">
                      All the tyres which cannot be used as part worn ...
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="col-md-4 mb-4">
              <Link to="/tdf" className="no-link-style">
                <div className="card border-0 shadow-sm">
                  <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
                    <img src={tdf} className="card-img-top" alt="TDF" style={{ height: '100%', objectFit: 'cover' }} />
                    <div className="icon-overlay">
                      <i className="bi bi-shield"></i>
                      <span>TDF (Tyre Derived Fuel)</span>
                      <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <p className="card-text text-muted">
                      Tyre-derived fuel (TDF) is composed of shredded scrap tires. Tires ...
                    </p>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  export default Tyrescrap;
