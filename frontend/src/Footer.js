import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3 ml-4">
            <h5>About Us</h5>
            <p className="small mb-2">
            Lava Rubber  is a well-established company located at FDRK 4258, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE. The company is recognized for its excellence in the rubber industry
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none hover-text-primary">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none hover-text-primary">About Us</Link>
              </li>
              
             
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none hover-text-primary">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Our Products</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/ferrousmetal" className="text-white text-decoration-none hover-text-primary">Ferrous Metals</Link>
              </li>
              <li className="mb-2">
                <Link to="/nonferrousmetal" className="text-white text-decoration-none hover-text-primary">Non Ferrous Metals</Link>
              </li>
              <li className="mb-2">
                <Link to="/tyrescrap" className="text-white text-decoration-none hover-text-primary">Tyre Scrap</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Address :</h5>
            <p className="small mb-2">
            Lava Rubber
              <br />FDRK 4258, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE
              <br />
            </p>
            <p className="mb-2">CONTACT NO: +971585513239</p>
            <p className="mb-2">Email: info@lavarubberllc.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
