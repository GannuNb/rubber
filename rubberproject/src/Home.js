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
import carl from "./images/c1.webp"
import car2 from "./images/c2.jpg"
import car3 from "./images/c3.jpg"
import car4 from "./images/c4.jpg"
import { useNavigate } from 'react-router-dom';
import TechnologyCards from './TechnologyCards';
import HappyClients from './Clients';
import SrenComponent from './SrenComponent';


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
                                <img  src={car2} alt="Second Slide" className="carousel-image" />
                                <p className="legend">Mulch</p>
                            </div>
                            
                            <div>
                                <img  src={carl} alt="First Slide" className="carousel-image"/>
                                <p className="legend">Tyre Steel Scrap</p>
                            </div>
                            
                            <div>
                                <img  src={car3} alt="Third Slide" className="carousel-image"/>
                                <p className="legend">Tyre Steel Scrap</p>
                            </div>
                        
                
                                      

                        </Carousel>
                    </div>
            <div>
           

                <div className="row">
                    {/* Apply margin-left on larger screens and adjust on small screens */}
                    <div className="col-lg-10 offset-lg-2 col-md-12">



                   
                        <div className="container mt-5">  
                        <h2 className="display-4 fw-bold mb-3 text-black products-heading text-center d-flex  justify-content-center align-items-center">Our Products</h2>    
                                              
    <div className="row justify-content-center align-items-center">
        

        {/* Tyre Scrap Card */}
        <div className="col-lg-4 col-md-6 col-sm-12">
        
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front text-center">
                        <img
                            className="rounded-circle mt-3"
                            src={tyreScrap}
                            alt="Tyre Scrap"
                            width="140"
                            height="140"
                        />
                        <h2 className="mt-3 headings">Tyre Scrap</h2>
                    </div>
                    <div className="flip-card-back">
                        <h3>Products</h3>
                        <ul className="product-list text-start">
                            <li>Multiple_Baled_Tyres_PCR</li>
                            <li>Baled Tyres TBR</li>
                            <li>ThreePiecePCR</li>
                            <li>ThreePieceTBR</li>
                            <li>Shredds</li>
                            <li>Mulch</li>
                            <li>RubberGranules/crum</li>
                        </ul>
                        <Link to="/Tyrescrap">
                            <button className="btn btn-light btn-sm">
                                View Products
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Pyro Oil Card */}
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front text-center">
                        <img
                            className="rounded-circle mt-3"
                            src={pyroOil}
                            alt="Pyro Oil"
                            width="140"
                            height="140"
                        />
                        <h2 className="mt-3 headings">Pyro Oil</h2>
                    </div>
                    <div className="flip-card-back">
                        <h3>Products</h3>
                        <ul className="product-list text-start">
                            <li>No Products</li>
                        </ul>
                        <button className="btn btn-light btn-sm">
                            View Products
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Tyre Steel Scrap Card */}
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front text-center">
                        <img
                            className="rounded-circle mt-3"
                            src={istock}
                            alt="Tyre Steel Scrap"
                            width="140"
                            height="140"
                        />
                        <h2 className="mt-3 headings">Tyre Steel Scrap</h2>
                    </div>
                    <div className="flip-card-back">
                        <h3>Products</h3>
                        <ul className="product-list text-start">
                            <li>Pyro Steel</li>
                            <li>Rubber Crum Steel</li>
                        </ul>
                        <Link to="/TyresteelScrap">
                            <button className="btn btn-light btn-sm">
                                View Products
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                {/* About Us Section */}
<div className="bg-gradient py-5" style={{ width: '100%' }}>
  <div className="container text-center mx-2">
    <h2 className="display-4 fw-bold mb-3 text-black products-heading">About Us</h2>
    <p className="lead text-light mb-4 text-black" style={{ lineHeight: '1.6', textAlign: 'justify', maxWidth: '800px', margin: '0 auto' }}>
      At Vikah Rubber, we are committed to being a leading provider of high-quality rubber products that meet the diverse
      needs of our customers. Our focus on innovation and sustainability drives us to develop solutions that not only 
      enhance performance but also minimize environmental impact. With a team of experienced professionals and a 
      dedication to excellence, we strive to exceed customer expectations through reliable 
      service and superior products. Join us on our journey to a greener, more sustainable future.
    </p>

  </div>
</div>





<TechnologyCards/>










                       
                            <SrenComponent />
                            <Link style={{textDecoration:"none"}} to="/Sell">
                            <button 
                            className="btn btn-primary mt-4 d-block mx-auto" 
                            style={{ fontSize: '16px', padding: '10px 20px', maxWidth: '300px' }}>
                            Start Selling
                            </button></Link>
                            
                       <HappyClients/>
                        
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Home
