import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sellreport.css'; // Ensure your custom CSS is imported
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const Sellreport = () => {
    const [approvedScrap, setApprovedScrap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setTimeout(() => {
                alert("Please log in to view sell reports");
                navigate('/Login'); // Navigate to login if no token
            }, 0);
            return;
        }
    }, [navigate]);

    useEffect(() => {
        const fetchApprovedScrap = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No authentication token found. Please log in.');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/getApprovedScrap`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setApprovedScrap(response.data.approvedScrap);
            } catch (error) {
                console.error('Error fetching approved scrap:', error);
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedScrap();
    }, []);

    const generatePDF = (scrap) => {
        const doc = new jsPDF();
        doc.text('Scrap Report', 14, 10);

        const tableColumn = ['Field', 'Value'];
        const tableRows = [
            ['Material', scrap.material],
            ['Application', scrap.application],
            ['Quantity', scrap.quantity],
            ['Company Name', scrap.companyName],
            ['Email', scrap.email],
            ['Approved At', new Date(scrap.approvedAt).toLocaleString()]
        ];

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save(`scrap-report-${scrap._id}.pdf`);
    };

    if (loading) return <div className="text-center mt-5">Loading approved scrap reports...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <div className="custom-margin">
            <div className="container my-5">
                <h2 className="text-center mb-4">Approved Scrap Reports</h2>
                {approvedScrap.length === 0 ? (
                    <p className="text-center">No approved scrap items found.</p>
                ) : (
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Material</th>
                                <th>Application</th>
                                <th>Quantity</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Approved At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedScrap.map((scrap) => (
                                <tr key={scrap._id}>
                                    <td>{scrap.material}</td>
                                    <td>{scrap.application}</td>
                                    <td>{scrap.quantity}</td>
                                    <td>{scrap.companyName}</td>
                                    <td>{scrap.email}</td>
                                    <td>{new Date(scrap.approvedAt).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => generatePDF(scrap)}
                                        >
                                            Download PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Sellreport;
