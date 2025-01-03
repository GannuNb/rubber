import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mulchImage from './images/mulch.jpeg'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';
import './Mulch.css'; 

const Mulch = () => {
    const [scrapItems, setScrapItems] = useState([]);
    const [mulchData, setMulchData] = useState({ available_quantity: 0, price: 0 }); 
    const [requiredQuantity, setRequiredQuantity] = useState(1); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/scrap`);
                const items = response.data.scrap_items;

                // Find the mulch data
                const mulchItem = items.find(item => item.name === 'Mulch');

                // Set the mulch data if it exists
                if (mulchItem) {
                    setMulchData({
                        available_quantity: mulchItem.available_quantity,
                        price: mulchItem.price,
                    });
                }

                setScrapItems(items); // You can still store all scrap items if needed
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOrder = () => {
        // Navigate to the Order page with the mulch data and required quantity
        navigate('/Order', {
            state: {
                name: 'Mulch',
                available_quantity: mulchData.available_quantity,
                price: mulchData.price,
                required_quantity: requiredQuantity,
            },
        });
    };

    return (
        <div className="container mulch-container" style={{ padding: '20px', marginTop: '20px' , marginLeft: '115px'}}>
            <div className="row align-items-center mt-5">
                <div className="col-md-6">
                    <img 
                        src={mulchImage} 
                        alt="Mulch" 
                        className="img-fluid img-hover-effect" 
                        style={{ borderRadius: '8px', width: '80%', marginLeft: '20px' }} 
                    />
                </div>
                <div className="col-md-6">
                    <h2>Mulch</h2>
                    <p>
                        Mulch is a material applied to the surface of soil. It serves several purposes, including moisture retention, temperature regulation, and weed suppression. 
                        Organic mulches, such as wood chips, straw, and leaves, decompose over time, adding nutrients to the soil. 
                        Utilizing mulch can enhance the aesthetic appeal of gardens while also promoting healthy plant growth.
                    </p>
                </div>
            </div>

            {/* Specifications Section */}
            <h3 style={{ marginTop: '40px' }}>SPECIFICATIONS</h3>
            <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-md-6">
                    <label>AVAILABLE QUANTITY IN TONS:</label>
                    <span className="d-block p-2 border rounded" style={{ border: '1px solid #ccc' }}>
                        {mulchData.available_quantity} 
                    </span>
                </div>
                <div className="col-md-6">
                    <label>PRICE:</label>
                    <span className="d-block p-2 border rounded" style={{ border: '1px solid #ccc' }}>
                        ₹{mulchData.price} 
                    </span>
                </div>
            </div>

            {/* Required Quantity Section */}
            <div className="mt-3">
                <label>REQUIRED QUANTITY:</label>
                <input 
                    type="number" 
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(e.target.value)} 
                    placeholder="Enter required quantity" 
                    className="form-control" 
                />
            </div>

            {/* Order Button */}
            <div className="mt-3">
                <button className="btn btn-primary" onClick={handleOrder}>Order</button>
            </div>
        </div>
    );
};

export default Mulch;
