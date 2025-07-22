import React, { useState } from 'react';
import axios from 'axios';
import './BusinessProfileForm.css';
import { useNavigate } from 'react-router-dom';

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
      await axios.post(`${process.env.REACT_APP_API_URL}/api/suppliers/add`, formData);
      
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

      // ✅ Show alert first
      alert('Business profile created successfully');

      // ✅ Then navigate after alert is closed
      navigate('/dashboard');
    } catch (error) {
      alert('Error adding supplier');
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

        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
