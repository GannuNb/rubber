import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tyreScrap from './images/tyre_scrap.jpeg'; 
import pyroOil from './images/pyro_oil.jpeg'; 
import istock from './images/istockphoto.webp';
import './Home.css'; 
import axios from 'axios';
import home from './images/home.jpeg';
import logo from './images/logo.jpeg';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carl from "./images/car1.webp"
import car2 from "./images/car2.webp"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [scrapItems, setScrapItems] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/scrap`);
                console.log('Fetched data:', response.data);
                setScrapItems(response.data.scrap_items); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); 
    }, []);

    const categorizedItems = scrapItems.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = [];
        }
        acc[item.type].push(item); 
        return acc;
    }, {});
    const navigate = useNavigate();  // Initialize navigate for programmatic navigation
    const isLoggedIn = localStorage.getItem('token');  // Check if user is logged in by verifying 'userToken' in local storage

    const handleOrderClick = (itemName) => {
        if (!isLoggedIn) {
            alert("please login to order")
            navigate('/Login');
        } else {
            // Otherwise, proceed with the order action (e.g., navigate to the item page)
            navigate(`/${itemName.replaceAll(" ", "")}`);
        }
    };

    return (
        <>

        
            <div  className='abt'>
            <div className='carousel-container-home'>
                        <Carousel
                            showArrows={true}
                            autoPlay={true}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={true}
                            interval={1500}
                        >
                            <div>
                                <img  src={carl} alt="First Slide" className="carousel-image"/>
                                <p className="legend">Tyre scrap image1</p>
                            </div>
                            <div>
                                <img  src={car2} alt="Second Slide" className="carousel-image" />
                                <p className="legend">Tyre scrap image2</p>
                            </div>
                            <div>
                                <img  src={home} alt="Third Slide" className="carousel-image"/>
                                <p className="legend">Tyre scrap image3</p>
                            </div>
                        
                
                                      

                        </Carousel>
                    </div>
            <div>
           

                <div className="row">
                    {/* Apply margin-left on larger screens and adjust on small screens */}
                    <div className="col-lg-10 offset-lg-2 col-md-12">
                        {/* About Us Section */}
                        <div className="bg-light py-5" style={{ width: '100%' }}>
                            <div className="text-center mx-2">
                               

                                <h2 className="display-4 fw-bold mb-3 text-dark">About Us</h2>
                                <p className="lead text-muted mb-4" style={{ lineHeight: '1.6', textAlign: 'justify', maxWidth: '1000px', margin: '0 auto' }}>
                                At Vikah Rubber, we are committed to being a leading provider of high-quality rubber products that meet the diverse
                                 needs of our customers. Our focus on innovation and sustainability drives us to develop solutions that not only 
                                 enhance performance but also minimize environmental impact. With a team of experienced professionals and a 
                                 dedication to excellence, we strive to exceed customer expectations through reliable 
                                 service and superior products. Join us on our journey to a greener, more sustainable 
                                 future.                                </p>

                                <button className="btn btn-success btn-lg"
                                    style={{
                                        padding: '10px 30px',
                                        fontSize: '18px',
                                        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                                        transition: 'background-color 0.3s, transform 0.3s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#218838'; 
                                        e.target.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#28a745'; 
                                        e.target.style.transform = 'scale(1)';
                                    }}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Scrap Items Section */}
                        <div className="container marketing mt-5">
                            <div className="row">
                                {/* Tyre Scrap Card */}
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h2 className="card-title">Tyre Scrap</h2>
                                        </div>
                                        <img
                                            className="rounded-circle mx-auto d-block mt-3"
                                            src={tyreScrap}
                                            alt="Tyre Scrap"
                                            width="140"
                                            height="140"
                                        />
                                        <div className="card-body">
                                            {/* Material List */}
                                            <div>
                                                {categorizedItems["Tyre scrap"]?.map((item, index) => (
                                                    <div key={index} className="material-item">
                                                        <div className="material-info">
                                                            <span className="material-name">{item.name}</span><br />
                                                            <small>Qty: {item.available_quantity}</small>
                                                        </div>
                                                        <div>
                                                        <button
                                                onClick={() => handleOrderClick(item.name)} 
                                                className="btn btn-primary btn-sm order-button">
                                                Order
                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pyro Oil Card */}
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h2 className="card-title">Pyro Oil</h2>
                                        </div>
                                        <img
                                            className="rounded-circle mx-auto d-block mt-3"
                                            src={pyroOil}
                                            alt="Pyro Oil"
                                            width="140"
                                            height="140"
                                        />
                                        <div className="card-body">
                                            {/* Material List */}
                                            <div>
                                                {categorizedItems["Pyro oil"]?.map((item, index) => (
                                                    <div key={index} className="material-item">
                                                        <div className="material-info">
                                                            <span className="material-name">{item.name}</span><br />
                                                            <small>Qty: {item.available_quantity}</small>
                                                        </div>
                                                        <div>
                                                        <button
                                                onClick={() => handleOrderClick(item.name)} 
                                                className="btn btn-primary btn-sm order-button">
                                                Order
                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tyre Steel Scrap Card */}
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h2 className="card-title">Tyre Steel Scrap</h2>
                                        </div>
                                        <img
                                            className="rounded-circle mx-auto d-block mt-3"
                                            src={istock}
                                            alt="Tyre Steel Scrap"
                                            width="140"
                                            height="140"
                                        />
                                        <div className="card-body">
                                            {/* Material List */}
                                            <div>
                                                {categorizedItems["Tyre steel scrap"]?.map((item, index) => (
                                                    <div key={index} className="material-item">
                                                        <div className="material-info">
                                                            <span className="material-name">{item.name}</span><br />
                                                            <small>Qty: {item.available_quantity}</small>
                                                        </div>
                                                        <div>
                                                        <button
                                                onClick={() => handleOrderClick(item.name)} 
                                                className="btn btn-primary btn-sm order-button">
                                                Order
                                            </button>
                                                            </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional sections like Features and Testimonials */}
                        <div className="container text-center mt-5">
                            <img 
                                src={home} 
                                alt="Home" 
                                className="img-fluid" 
                                style={{ width: '50%', maxWidth: '1000px' }} 
                            />
                        </div>

                        {/* Features Section */}
                        <div className="container mt-5">
                            <div className="row text-center mb-4">
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <div className="feature-panel">
                                        <i className="fas fa-shopping-cart"></i>
                                        <h5>Easy Buying</h5>
                                        <p>Browse products and make purchases with a seamless experience.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <div className="feature-panel">
                                        <i className="fas fa-store"></i>
                                        <h5>Simple Selling</h5>
                                        <p>List your products easily and reach a wide range of buyers.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <div className="feature-panel">
                                        <i className="fas fa-user-check"></i>
                                        <h5>Verified Sellers</h5>
                                        <p>We ensure all sellers are verified, so you can trust who you buy from.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <div className="feature-panel">
                                        <i className="fas fa-headset"></i>
                                        <h5>24/7 Support</h5>
                                        <p>Our customer support team is available 24/7 to help you with any inquiries.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonials Section */}
                        <div className="container mt-5">
                    <h2 className="fw-bold">What Our Users Say</h2>
                    <div className="row mt-4">
                        <div className="col-md-4 col-sm-12 mb-4">
                            <div className="testimonial">
                                <p>"The buying process was so easy and the customer support was amazing!"</p>
                                <h6>- Sarah, Buyer</h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-4">
                            <div className="testimonial">
                                <p>"I quickly sold my products and had a smooth experience with the platform."</p>
                                <h6>- John, Seller</h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-4">
                            <div className="testimonial">
                                <p>"This is the best marketplace I have ever used. I totally recommend it for you all!"</p>
                                <h6>- Alex, Buyer & Seller</h6>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Home
