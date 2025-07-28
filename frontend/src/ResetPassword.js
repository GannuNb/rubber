import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // at the top of your component
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`, { password });

            Swal.fire('Success', res.data.message, 'success').then(() => {
                navigate('/login'); // Redirect after user clicks "OK"
            });

        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Failed to reset password', 'error');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: '2.5rem' }} // space for eye icon
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            userSelect: 'none',
                            fontSize: '1.2rem',
                            color: '#666',
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);
                        }}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>
                <button className="btn btn-success w-100" type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
