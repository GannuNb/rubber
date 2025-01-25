import React from 'react'
import "./Home.css";
import { Link } from "react-router-dom";
import fm1 from "./images/fm1.jpg";
import hsm1 from "./images/hms1.jpg";
import tw1 from "./images/tw1.jpg";

function Ferrousmetal() {
  return (
    <div>
    <div className="container py-5">
  <h2 className="text-center fw-bold mb-4">Ferrous Metals</h2>
  <div className="row">
    
    {/* Card 1 */}
    <div className="col-md-4 mb-4">
      <Link to="/stainless" className="no-link-style">
        <div className="card border-0 shadow-sm">
          <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
            <img src={fm1} className="card-img-top" alt="Ferrous Metals" style={{ height: '100%', objectFit: 'cover' }} />
            <div className="icon-overlay">
              <i className="bi bi-box-seam"></i>
              <span>Stainless Steel 304 and 316</span>
              <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
            </div>
          </div>
          <div className="card-body text-center">
            <p style={{ color: "#0c2957" }} className="card-text text-muted">
            We can offer mixes Stainless Steel SS304 and SS316 in container loads
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Card 2 */}
    <div className="col-md-4 mb-4">
      <Link to="/hms" className="no-link-style">
        <div className="card border-0 shadow-sm">
          <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
            <img src={hsm1} className="card-img-top" alt="Non Ferrous Metals" style={{ height: '100%', objectFit: 'cover' }} />
            <div className="icon-overlay">
              <i className="bi bi-bar-chart"></i>
              <span>HMS 1 and 2</span>
              <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
            </div>
          </div>
          <div className="card-body text-center">
            <p className="card-text text-muted">
            We can offer either hms 1 or hms 1 and 2 combined depending on the ...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Card 3 */}
    <div className="col-md-4 mb-4">
      <Link to="/tyrewire" className="no-link-style">
        <div className="card border-0 shadow-sm">
          <div className="image-overlay-container" style={{ height: '300px', overflow: 'hidden' }}>
            <img src={tw1} className="card-img-top" alt="Tyre Scrap" style={{ height: '100%', objectFit: 'cover' }} />
            <div className="icon-overlay">
              <i className="bi bi-shield"></i>
              <span>Tyre Wire</span>
              <i className="bi bi-arrow-right arrow-icon"></i> {/* Right arrow icon */}
            </div>
          </div>
          <div className="card-body text-center">
            <p className="card-text text-muted">
            Our steel wire is extracted from waste tyres. We provide tyre wire at two levels ...
            </p>
          </div>
        </div>
      </Link>
    </div>

  </div>
</div>
      
    </div>
  )
}

export default Ferrousmetal
