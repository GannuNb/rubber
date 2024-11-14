import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Sellreport.css"
import { useNavigate } from 'react-router-dom';

const Getorders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setTimeout(() => {
            alert("Please log in to view your orders");
            navigate('/Login'); // Navigate to login if no token
        }, 0);
        return;
    }
}, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <><div className='setter'>
    <div className="container py-5">
      <h2 className="text-center mb-4">All Orders</h2>
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card order-card shadow-sm h-100">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 mb-2">
                      <h5 className="card-title">Order ID: {order._id}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="mb-1"><strong>Item Name:</strong> {order.itemName}</p>
                      <p className="mb-1"><strong>Required Quantity:</strong> {order.requiredQuantity}</p>
                      <p className="mb-1"><strong>Subtotal:</strong> ₹{order.subtotal}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="mb-1"><strong>GST:</strong> ₹{order.gst}</p>
                      <p className="mb-1"><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                      <span className="badge bg-primary">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          No orders found
        </div>
      )}
    </div>
    </div></>
  );
};

export default Getorders;
