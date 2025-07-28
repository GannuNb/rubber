import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ForgotPassword() {
  const [email, setEmail] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
      email,
    });
    Swal.fire('Success', res.data.message, 'success');
  } catch (err) {
    Swal.fire('Error', err.response?.data?.message || 'Failed to send reset email', 'error');
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
