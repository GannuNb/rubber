import React, { useState, useEffect } from 'react';
import axios from 'axios';
import verify from './images/verify.jpeg';
import sell from './images/sell.jpeg';
import './Sell.css';
import { useNavigate } from 'react-router-dom';
import SrenComponent from './SrenComponent';
import SellTop from './SellTop';


const Sell = () => {
    const [material, setMaterial] = useState('Tyre scrap'); 
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setTimeout(() => {
                alert("Please log in to sell");
                navigate('/Login'); // Navigate to login if no token
            }, 0);
            return;
        }
    }, [navigate]);
    useEffect(() => {
        if (material === 'Tyre scrap') {
            setApplications([
                'Multiple Baled Tyres PCR',
                'Baled Tyres TBR',
                'Three Piece PCR',
                'Three Piece TBR',
                'Shredds',
                'Mulch',
                'Rubber Granules/Crum'
            ]);
            setSelectedApplication('');
        } else if (material === 'pyro oil') {
            setApplications([]);
            setSelectedApplication('');
        } else if (material === 'Tyre steel scrap') {
            setApplications(['Pyro Steel', 'Rubber Crum Steel']);
            setSelectedApplication('');
        }
    }, [material]);

    // Fetch business profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/business-profile`, config);

                if (response.data.profileExists) {
                    setProfile(response.data.businessProfile);
                } else {
                    setError('No business profile found.');
                }
            } catch (err) {
                setError(`Failed to fetch profile. ${err.message}`);
                console.error('Error fetching business profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleMaterialChange = (e) => setMaterial(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);
    
        const scrapData = {
            material,
            application: selectedApplication,
            quantity: parseFloat(quantity),
            companyName: profile?.companyName,
            phoneNumber: profile?.phoneNumber,
            email: profile?.email,
        };
    
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) throw new Error('User is not authenticated. Please log in.');
    
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/uploadscrap`,
                scrapData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );
    
            if (response.data.success) {
                setMessage('Scrap details uploaded successfully!');
                setMaterial('Tyre scrap');
                setQuantity('');
                setSelectedApplication('');
            } else {
                setError('Failed to upload scrap details.');
            }
        } catch (err) {
            console.error('Error uploading scrap details:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
        <div className='setbgimg'>
        <div className='setter'>
            <SellTop/>
            
 
            <div className="container" style={{ marginTop: '40px', marginBottom: '20px' }}>
                <h2 className="tyre-scrap-heading">Upload Your Scrap Details</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
                    <div className="mb-3">
                        <label htmlFor="material" className="form-label">Choose Material</label>
                        <select 
                            id="material" 
                            className="form-select" 
                            value={material} 
                            onChange={handleMaterialChange}
                            required
                        >
                            <option value="Tyre scrap">Tyre scrap</option>
                            <option value="pyro oil">Pyro Oil</option>
                            <option value="Tyre steel scrap">Tyre Steel Scrap</option>
                        </select>
                    </div>

                    {material && (
                        <div className="mb-3">
                            <label htmlFor="applications" className="form-label">Applications</label>
                            <select 
                                id="applications" 
                                className="form-select" 
                                value={selectedApplication} 
                                onChange={(e) => setSelectedApplication(e.target.value)} 
                                required
                            >
                                <option value="">Select Application</option>
                                {applications.length > 0 ? (
                                    applications.map((app, index) => (
                                        <option key={index} value={app}>{app}</option>
                                    ))
                                ) : (
                                    <option value="">No applications available.</option>
                                )}
                            </select>
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            className="form-control" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
            <SrenComponent/>
            
            <h2 className="text-center my-5">Your Profile Details</h2>
{profile ? (
  <div className="card mx-auto" style={{ maxWidth: "500px", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
    <div className="card-body">
      <p className="card-text"><strong>Company Name:</strong> {profile.companyName}</p>
      <p className="card-text"><strong>Phone Number:</strong> {profile.phoneNumber}</p>
      <p className="card-text"><strong>Email:</strong> {profile.email}</p>
    </div>
  </div>
) : (
  <div className="text-center my-5">
    <p className="text-muted">{error || "Loading profile..."}</p>
  </div>
)}

        </div>


        </div></>
    );
};

export default Sell;
