import React from 'react'
import "./Home.css";
import { Link } from "react-router-dom";
import bs1 from "./images/bs1.jpg";
import cws1 from "./images/cws1.jpg";
import as1 from "./images/as1.jpg";


function Nonferrousmetal() {
  return (
    <div>
    <div className="container py-5">
  <h2 className="text-center fw-bold mb-4">Non Ferrous Metals</h2>
  <div className="row">
    
    {/* Card 1 */}
    <div className="col-md-4 mb-4">
      <Link to="/brassscrap" className="no-link-style">
        <div className="card border-0 shadow-sm">
          <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
            <img src={bs1} className="card-img-top" alt="Ferrous Metals" style={{ height: '100%', objectFit: 'cover' }} />
            <div className="icon-overlay">
              <i className="bi bi-box-seam"></i>
              <span>Brass Scrap</span>
              <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
            </div>
          </div>
          <div className="card-body text-center">
            <p style={{ color: "#0c2957" }} className="card-text text-muted">
            We supply mixed brass scrap in loose.
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Card 2 */}
    <div className="col-md-4 mb-4">
      <Link to="/copperwirescrap" className="no-link-style">
        <div className="card border-0 shadow-sm">
          <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
            <img src={cws1} className="card-img-top" alt="Non Ferrous Metals" style={{ height: '100%', objectFit: 'cover' }} />
            <div className="icon-overlay">
              <i className="bi bi-bar-chart"></i>
              <span>Copper wire Scrap</span>
              <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
            </div>
          </div>
          <div className="card-body text-center">
            <p className="card-text text-muted">
            We can offer 100% copper Scrap, 92% copper, and Copper ...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Card 3 */}
    <div className="col-md-4 mb-4">
      <Link to="/aluminiumscrap" className="no-link-style">
        <div className="card border-0 shadow-sm">
          <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
            <img src={as1} className="card-img-top" alt="Tyre Scrap" style={{ height: '100%', objectFit: 'cover' }} />
            <div className="icon-overlay">
              <i className="bi bi-shield"></i>
              <span>Aluminum Scrap</span>
              <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
            </div>
          </div>
          <div className="card-body text-center">
            <p className="card-text text-muted">
            We can offer different kinds of aluminum scrap like UBC, ...            </p>
          </div>
        </div>
      </Link>
    </div>

  </div>
</div>
      
    </div>
  )
}

export default Nonferrousmetal
