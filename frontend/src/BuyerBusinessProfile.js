import React, { useState } from 'react';
import axios from 'axios';
import './BusinessProfileForm.css';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Swal from 'sweetalert2'; // ✅ ADD THIS
import { showCompactLoginSuccess } from './showSuccessModal';


const BusinessProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    contact: '',
    email: '',
    address: '',
    website: '',
    gst: '',
    vat: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/buyers/add`, formData);

    // Clear the form
    setFormData({
      name: '',
      companyName: '',
      contact: '',
      email: '',
      address: '',
      website: '',
      gst: '',
      vat: ''
    });

    // ✅ Custom SweetAlert2 alert with reused styles
    showCompactLoginSuccess('Buyer Profile Created', 'Business profile added successfully');

    // ✅ Navigate after modal closes
    setTimeout(() => {
      navigate('/dashboard1');
    }, 2500); // same delay as your modal timer
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to add buyer.',
      icon: 'error',
      confirmButtonText: 'Retry'
    });
  }
};


  return (
    <div className="form-container">
      <h2>Create Business Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="name" placeholder="Contact Person Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>

        <div className="form-row">
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required/>
          <input type="url" name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="text" name="gst" placeholder="GST Number/VAT" value={formData.gst} onChange={handleChange} />
        </div>

        <button type="submit">Add Buyer</button>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
