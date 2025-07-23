import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import { showCompactLoginSuccess } from './showSuccessModal';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      formData
    );

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      // ✅ Custom alert: show "Welcome, Mounika!" with message "Login Successful"
      showCompactLoginSuccess('Welcome,Login Successful');

      setTimeout(() => {
        navigate('/', { replace: true });
        setTimeout(() => window.location.reload(), 100);
      }, 2500);
    } else {
      Swal.fire({ title: 'Oops!', text: 'Token not received.', icon: 'warning' });
    }
  } catch (err) {
    Swal.fire({
      title: 'Login Failed',
      text: err.response?.data?.message || 'Something went wrong!',
      icon: 'error',
    });
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            style={{ height: '2.75rem' }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={{ height: '2.75rem' }}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      {/* Signup link text below the form */}
      <p className="mt-3 text-center">
        Not a user? Please <Link to="/signup">signup</Link>.
      </p>
    </div>
  );
}

export default Login;
