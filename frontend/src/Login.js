import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import { showCompactLoginSuccess } from './showSuccessModal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="mb-4 position-relative">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={{ height: '2.75rem', paddingRight: '2.5rem' }}  // leave space for icon
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              top: '38px',
              right: '10px',
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: '1.2rem',
              color: '#666',
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword); }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>


        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      {/* Signup and Forgot Password links below the form */}
      <p className="mt-3 text-center">
        Not a user? Please <Link to="/signup">signup</Link>.
      </p>
      <p className="text-center">
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>

    </div>
  );
}

export default Login;
