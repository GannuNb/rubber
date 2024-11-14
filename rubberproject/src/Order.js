// src/components/Order.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Sell.css';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { name, available_quantity, price, required_quantity } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAvailable, setCurrentAvailable] = useState(available_quantity);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setTimeout(() => {
            alert("Please log in to order");
            navigate('/Login'); // Navigate to login if no token
        }, 0);
        return;
    }
}, [navigate]);

  useEffect(() => {
    if (!name || !price || !required_quantity) {
      navigate('/', { replace: true });
    }
  }, [name, price, required_quantity, navigate]);

  useEffect(() => {
    if (price > 0 && required_quantity > 0) {
      const gstRate = 0.18;
      const subtotal = price * required_quantity;
      const gstAmount = subtotal * gstRate;
      setTotalPrice((subtotal + gstAmount).toFixed(2));
    } else {
      setTotalPrice(0);
    }
  }, [price, required_quantity]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/business-profile`, config);

        if (response.data.profileExists) {
          setProfile(response.data.businessProfile);
        } else {
          navigate('/BusinessProfile', { replace: true });
        }
      } catch (err) {
        setError('Failed to fetch profile.');
        console.error('Error fetching business profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Order Summary', 14, 22);

    if (profile) {
      const profileTableRows = [
        ['Company Name', profile.companyName],
        ['Phone Number', profile.phoneNumber],
        ['Email', profile.email],
        ['GST Number', profile.gstNumber],
        ['Shipping Address', profile.shipAddress],
        ['Billing Address', profile.billAddress],
      ];
      doc.autoTable({
        startY: 30,
        head: [['Field', 'Details']],
        body: profileTableRows,
        theme: 'grid',
        styles: { fontSize: 12 },
      });
    }

    let finalY = profile ? doc.lastAutoTable.finalY + 10 : 30;
    const orderTableRows = [
      [
        name,
        `${currentAvailable} tons`,
        `${price.toFixed(2)}`,
        `${required_quantity} tons`,
        `${(price * required_quantity).toFixed(2)}`,
        `${((price * required_quantity) * 0.18).toFixed(2)}`,
        `${totalPrice}`,
      ],
    ];
    doc.autoTable({
      startY: finalY,
      head: [['Item Name', 'Available', 'Price/Ton', 'Required', 'Subtotal', 'GST', 'Total']],
      body: orderTableRows,
      theme: 'striped',
    });

    return doc.output('blob'); // Return as Blob
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated.');
        navigate('/', { replace: true });
        return;
      }

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/place-order`,
        { itemName: name, requiredQuantity: required_quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (orderResponse.status === 200) {
        setCurrentAvailable(orderResponse.data.remainingQuantity);
        
        // Generate PDF blob
        const pdfBlob = generatePDF();

        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'order-summary.pdf');
        formData.append('userEmail', profile?.email);

        // Send email with the PDF attachment
        const emailResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload-pdf`,
          formData,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        );

        if (emailResponse.status === 200) {
          alert('Order placed and summary emailed.');
          navigate('/Getorders', { replace: true });
        } else {
          alert('Order placed but email failed.');
        }
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An unexpected error occurred.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="setter">
      <div className="container mt-5">
        <div className="border p-4 rounded bg-light shadow-lg">
          <h2 className="text-center">Order Summary</h2>
          <div className="border p-4 rounded bg-white mt-4">
            <h4>Business and Order Details</h4>
            <p><strong>Company Name:</strong> {profile?.companyName}</p>
            <p><strong>Phone:</strong> {profile?.phoneNumber}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>GST:</strong> {profile?.gstNumber}</p>
            <p><strong>Shipping Address:</strong> {profile?.shipAddress}</p>
            <p><strong>Billing Address:</strong> {profile?.billAddress}</p>
            <hr />
            <div className="row">
              <div className="col">
                <p><strong>Item:</strong> {name}</p>
                <p><strong>Available:</strong> {currentAvailable} tons</p>
                <p><strong>Price/Ton:</strong> ₹{price}</p>
                <p><strong>Required:</strong> {required_quantity} tons</p>
              </div>
              <div className="col text-right">
                <p><strong>Subtotal:</strong> ₹{(price * required_quantity).toFixed(2)}</p>
                <p><strong>GST:</strong> ₹{((price * required_quantity) * 0.18).toFixed(2)}</p>
                <p><strong>Total:</strong> ₹{totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleOrder}>Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;