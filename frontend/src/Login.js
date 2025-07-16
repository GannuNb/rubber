import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
      console.log('Response data:', res.data);
      alert(res.data.message);
      if (res.data.token) {
        console.log('Saving token:', res.data.token);
        localStorage.setItem('token', res.data.token);
        // Optionally, store user info if available
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        navigate('/');
      } else {
        alert('Token not received');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed');
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
