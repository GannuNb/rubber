// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [hasSupplierProfile, setHasSupplierProfile] = useState(false);
  const [hasBuyerProfile, setHasBuyerProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfiles = async () => {
      const token = localStorage.getItem('token');

      // 🔐 Redirect to login if token is missing
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'Unauthorized',
          text: 'Please login first',
        }).then(() => {
          navigate('/login');
        });
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasSupplierProfile(!!res.data);
      } catch {
        setHasSupplierProfile(false);
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/buyers/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasBuyerProfile(!!res.data);
      } catch {
        setHasBuyerProfile(false);
      }

      setLoading(false);
    };

    checkProfiles();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  // ❌ Buyer profile exists → Block supplier access
if (hasBuyerProfile && !hasSupplierProfile) {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center p-5 rounded shadow-lg bg-white border border-danger" style={{ maxWidth: '500px' }}>
        <h2 className="text-danger mb-3">🚫 Access Denied</h2>
        <p className="text-muted mb-4">
          You already have a <strong>Buyer</strong> profile.<br />
          Supplier access is <span className="fw-bold text-danger">restricted</span>.
        </p>
        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}


  // ✅ Supplier Dashboard
  return (
    <div className="container-fluid home-container d-flex align-items-center justify-content-center text-center">
      <div className="home-content p-4 rounded shadow-lg bg-white">
        <h1 className="mb-4 text-primary">Supplier Dashboard</h1>

        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
          {hasSupplierProfile ? (
            <>
              <button className="btn btn-secondary" onClick={() => navigate('/add-supplier')}>
                View Business Profile
              </button>
              <button className="btn btn-info" onClick={() => navigate('/add-lot')}>
                Manage Lots: Add or View
              </button>
            </>
          ) : (
            <button className="btn btn-success" onClick={() => navigate('/add-supplier')}>
              Add Supplier Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
