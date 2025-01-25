import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from './images/lavalogo.png'; // Adjust the path if needed
import './Navbar.css'; // Import custom CSS for hover effect
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={() => setIsNavbarCollapsed(true)}>
          <img className='logo' src={logo} alt="LG Industry Logo" /> 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link nav-hover" onClick={() => setIsNavbarCollapsed(true)}>
                <b>Home</b>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/About" className="nav-link nav-hover" onClick={() => setIsNavbarCollapsed(true)}>
              <b>About us</b>
              </Link>
            </li>
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle nav-hover"
                href="#products"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <b>Our Products</b>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/ferrousmetal" onClick={() => setIsNavbarCollapsed(true)}>
                  Ferrous Metals
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nonferrousmetal" onClick={() => setIsNavbarCollapsed(true)}>
                  Non - Ferrous Metals
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Tyrescrap" onClick={() => setIsNavbarCollapsed(true)}>
                  Tyre Scrap
                  </Link>
                </li>
              </ul>
            </li>
            
            <li className="nav-item mx-2">
              <Link className="nav-link nav-hover" to="/Contact" onClick={() => setIsNavbarCollapsed(true)}>
              <b>Contact Us</b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
