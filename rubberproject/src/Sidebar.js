import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import vmateimg from "./images/vikahmates.png"
import './Sidebar.css';

import { Dropdown } from 'react-bootstrap';
function Sidebar() {
  const navigate = useNavigate();
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(false);
  const [isTyreScrapOpen, setIsTyreScrapOpen] = useState(false);
  const [isTyreSteelScrapOpen, setIsTyreSteelScrapOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const toggleGettingStarted = () => {
    setIsGettingStartedOpen(!isGettingStartedOpen);
  };

  const toggleTyreScrap = () => {
    setIsTyreScrapOpen(!isTyreScrapOpen);
  };

  const toggleTyreSteelScrap = () => {
    setIsTyreSteelScrapOpen(!isTyreSteelScrapOpen);
  };

  const toggleReports = () => {
    setIsReportsOpen(!isReportsOpen);
  };
  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decoded.exp < currentTime) {
        handleLogout(); // Logout if token is expired
      }
    }
  };

  useEffect(() => {
    checkTokenExpiry(); // Check token expiry on component mount
  }, []);

  return (
    <header>
      {/* Sidebar Navigation */}
      <nav id="sidebarMenu" className="collapse d-lg-block sidebar bg-white">
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            {/* Home Link */}
            <Link to="/" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
              <i className="fas fa-home fa-fw me-3"></i><span>Home</span>
            </Link>

            {/* Business Profile Link */}
            <Link to="/BusinessProfile" className="list-group-item list-group-item-action py-2 ripple">
              <i className="fas fa-user-circle fa-fw me-3"></i><span>Business Profile</span>
            </Link>

            {/* Sell Link */}
            <Link to="/Sell" className="list-group-item list-group-item-action py-2 ripple">
              <i className="fas fa-dollar-sign fa-fw me-3"></i><span>Sell</span>
            </Link>

            {/* Shipping Details */}
            <Link to="/ShippingDetails" className="list-group-item list-group-item-action py-2 ripple">
              <i className="fas fa-shipping-fast fa-fw me-3"></i><span>Shipping Details</span>
            </Link>

            {/* Reports Section */}
            <div 
              className={`list-group-item list-group-item-action py-2 ripple ${isReportsOpen ? 'active' : ''}`} 
              onClick={toggleReports} 
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center">
                <i className="fas fa-file-alt fa-fw me-3"></i>
                <span>Reports</span>
                <i className={`fas fa-angle-down ms-auto rotate-icon ${isReportsOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </div>
            {isReportsOpen && (
              <div className="list-group list-group-flush ">
                <Link className="list-group-item list-group-item-action py-2 ripple" to="/Buyreport">
                  Buy Reports
                </Link>
                <Link className="list-group-item list-group-item-action py-2 ripple" to="/Sellerreport">
                  Sell Reports
                </Link>
              </div>
            )}

            {/* Contact Us Link */}
            <Link to="/Contact" className="list-group-item list-group-item-action py-2 ripple">
              <i className="fas fa-envelope fa-fw me-3"></i><span>Contact Us</span>
            </Link>

            {/* Orders Link */}
            <Link to="/Getorders" className="list-group-item list-group-item-action py-2 ripple">
              <i className="fas fa-shopping-cart fa-fw me-3"></i><span>Orders</span>
            </Link>
           

            {/* Products Section */}
            <div 
              className={`list-group-item list-group-item-action py-2 ripple ${isGettingStartedOpen ? 'active' : ''}`} 
              onClick={toggleGettingStarted} 
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center">
                <i className="fas fa-box-open fa-fw me-3"></i> {/* Updated Product Icon */}
                <span>Products</span>
                <i className={`fas fa-angle-down ms-auto rotate-icon ${isGettingStartedOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </div>
            {isGettingStartedOpen && (
              <div className="list-group list-group-flush ">
                {/* Tyre Scrap Section */}
                <div 
                  className={`list-group-item list-group-item-action py-2 ripple ${isTyreScrapOpen ? 'active' : ''}`} 
                  onClick={toggleTyreScrap} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <span>Tyre Scrap</span>
                    <i className={`fas fa-angle-down ms-auto rotate-icon ${isTyreScrapOpen ? 'rotate-180' : ''}`}></i>
                  </div>
                </div>
                {isTyreScrapOpen && (
                  <div className="list-group list-group-flush ">
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/Mulch">
                      Mulch
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/MultipleBaledTyresPcr">
                      Multiple Baled Tyres PCR
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/ThreePiecePcr">
                      Three Piece PCR
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/BaledTyresTbr">
                      Baled Tyres TBR
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/ThreePieceTbr">
                      Three Piece TBR
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/RubberGranules/Crum">
                      Rubber Granules/Crum
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/Shredds">
                      Shredds
                    </Link>
                  </div>
                )}
                 {/* Pyro Oil Section */}
                 <Link className="list-group-item list-group-item-action py-2 ripple" to="https://material-minimal.com/" target="_blank" rel="noopener noreferrer">
                  Pyro Oil
                </Link>


                {/* Tyre Steel Scrap Section */}
                <div 
                  className={`list-group-item list-group-item-action py-2 ripple ${isTyreSteelScrapOpen ? 'active' : ''}`} 
                  onClick={toggleTyreSteelScrap} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <span>Tyre Steel Scrap</span>
                    <i className={`fas fa-angle-down ms-auto rotate-icon ${isTyreSteelScrapOpen ? 'rotate-180' : ''}`}></i>
                  </div>
                </div>
                {isTyreSteelScrapOpen && (
                  <div className="list-group list-group-flush ">
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/RubberCrumsteel">
                      Rubber Crum Steel
                    </Link>
                    <Link className="list-group-item list-group-item-action py-2 ripple" to="/PyroSteel">
                    Pyro Steel
                    </Link>
                
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Top Navbar */}
      <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container-fluid">
          {/* Sidebar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand Logo */}
          <Link className="navbar-brand" to="#">
            <img
              src={vmateimg}
              height="25"
              alt="Logo"
              loading="lazy"
            />
          </Link>

          {/* Search Form */}
          <form className="d-none d-md-flex input-group w-auto my-auto">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded"
              placeholder='Search Products'
              style={{ minWidth: '225px' }}
            />
            <span className="input-group-text border-0">
              <i className="fas fa-search"></i>
            </span>
          </form>

          {/* Social Icons and User Actions */}
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
            {/* Social Icons */}
            <li className="nav-item">
              <Link className="nav-link me-3 me-lg-0" to="https://www.youtube.com/@vikahecotech">
                <i className="fab fa-youtube" style={{ color: 'black' }}></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-3 me-lg-0" to="https://x.com/i/flow/login?redirect_after_login=%2Fvikahecotech">
                <i className="fab fa-twitter" style={{ color: 'black' }}></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-3 me-lg-0" to="https://www.facebook.com/people/Vikah-Ecotech/61562484014600/?mibextid=qi2Omg&rdid=DtTaZ8FyfC8gsDCh&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Mxsd16XWYMsvCyi%2F%3Fmibextid%3Dqi2Omg">
                <i className="fab fa-facebook" style={{ color: 'black' }}></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-3 me-lg-0" to="https://www.instagram.com/vikahecotech/ ">
                <i className="fab fa-instagram" style={{ color: 'black' }}></i>
              </Link>
            </li>

            {!localStorage.getItem("token") ? (
  <Dropdown>
    <Dropdown.Toggle id="dropdown-basic">
      Login/Signup
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
      <Dropdown.Item as={Link} to="/signup">Signup</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
) : (
  <button onClick={handleLogout} className="btn btn-outline-success ms-3">
    <i className="fas fa-sign-out-alt"></i> Logout
  </button>
)}

          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Sidebar;
