// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import custom CSS

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid home-container d-flex align-items-center justify-content-center text-center">
      <div className="home-content p-4 rounded shadow-lg bg-white">
        <h1 className="mb-4 text-primary">Welcome to Dashboard</h1>

        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
          <button className="btn btn-success" onClick={() => navigate('/add-supplier')}>
            Add Supplier
          </button>

          <button className="btn btn-info" onClick={() => navigate('/add-lot')}>
            Add Lot
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
