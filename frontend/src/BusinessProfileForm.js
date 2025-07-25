// BusinessProfileForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BusinessProfileForm.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { showCompactLoginSuccess } from './showSuccessModal';

const BusinessProfileForm = () => {
  const navigate = useNavigate();
  const [existingProfile, setExistingProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers/my-profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExistingProfile(res.data);
      } catch (err) {
        setExistingProfile(null); // No profile yet
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/suppliers/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      showCompactLoginSuccess('Supplier Profile Created', 'Business profile added successfully');
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add supplier.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  if (existingProfile) {
    return (
      <div className="form-container">
        <h2>Your Business Profile</h2>
        <div className="profile-view-box">
          <p><strong>Contact Person:</strong> {existingProfile.name}</p>
          <p><strong>Company:</strong> {existingProfile.companyName}</p>
          <p><strong>Contact:</strong> {existingProfile.contact}</p>
          <p><strong>Email:</strong> {existingProfile.email}</p>
          <p><strong>Address:</strong> {existingProfile.address}</p>
          <p><strong>Website:</strong> {existingProfile.website}</p>
          <p><strong>GST/VAT:</strong> {existingProfile.gst || existingProfile.vat}</p>
        </div>
      </div>
    );
  }

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

        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
