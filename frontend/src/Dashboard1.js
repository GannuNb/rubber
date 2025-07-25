// src/Dashboard1.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Dashboard.css';

const Dashboard1 = () => {
  const navigate = useNavigate();
  const [hasBuyerProfile, setHasBuyerProfile] = useState(false);
  const [hasSupplierProfile, setHasSupplierProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfiles = async () => {
      const token = localStorage.getItem('token');
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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/buyers/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasBuyerProfile(!!res.data);
      } catch {
        setHasBuyerProfile(false);
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasSupplierProfile(!!res.data);
      } catch {
        setHasSupplierProfile(false);
      }

      setLoading(false);
    };

    checkProfiles();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

if (hasSupplierProfile && !hasBuyerProfile) {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center p-5 rounded shadow-lg bg-white border border-danger" style={{ maxWidth: '500px' }}>
        <h2 className="text-danger mb-3">🚫 Access Denied</h2>
        <p className="text-muted mb-4">
          You already have a <strong>Supplier</strong> profile.<br />
          Buyer access is <span className="fw-bold text-danger">restricted</span>.
        </p>
        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="container-fluid home-container d-flex align-items-center justify-content-center text-center">
      <div className="home-content p-4 rounded shadow-lg bg-white">
        <h1 className="mb-4 text-primary">Buyer Dashboard</h1>
        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
          {hasBuyerProfile ? (
            <>
              <button className="btn btn-secondary" onClick={() => navigate('/buyerbusinessprofile')}>
                View Business Profile
              </button>
              <button className="btn btn-info" onClick={() => navigate('/addlotbuyer')}>
                Manage Lots: Add or View
              </button>
            </>
          ) : (
            <button className="btn btn-success" onClick={() => navigate('/buyerbusinessprofile')}>
              Add Buyer Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
