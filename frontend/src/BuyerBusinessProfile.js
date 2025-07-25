// src/BusinessProfileForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BusinessProfileForm.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';
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

  const [existingProfile, setExistingProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/buyers/my-profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data) {
          setExistingProfile(res.data);
        }
      } catch (error) {
        setExistingProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/buyers/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      showCompactLoginSuccess('Buyer Profile Created', 'Business profile added successfully');

      setTimeout(() => {
        navigate('/dashboard1');
      }, 2500);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add buyer.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  };

  if (loading) return <div className="form-container">Loading...</div>;

  // ✅ Show existing profile if found
  if (existingProfile) {
    return (
      <div className="form-container">
        <h2> Business Profile</h2>
        <div className="form-view">
          <p><strong>Name:</strong> {existingProfile.name}</p>
          <p><strong>Company Name:</strong> {existingProfile.companyName}</p>
          <p><strong>Contact:</strong> {existingProfile.contact}</p>
          <p><strong>Email:</strong> {existingProfile.email}</p>
          <p><strong>Address:</strong> {existingProfile.address}</p>
          <p><strong>Website:</strong> {existingProfile.website}</p>
          <p><strong>GST/VAT:</strong> {existingProfile.gst}</p>
          
        </div>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/dashboard1')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // 📝 Show form if no profile
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
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
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
