import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';




const BuyReport = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [itemNameFilter, setItemNameFilter] = useState('');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setTimeout(() => {
            alert("Please log in to view Buyreports");
            navigate('/Login'); // Navigate to login if no token
        }, 0);
        return;
    }
}, [navigate]);
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/business-profile`, config);
        if (response.data.profileExists) {
          setProfile(response.data.businessProfile);
        }
      } catch (err) {
        console.error('Error fetching business profile:', err);
      }
    };

    fetchOrders();
    fetchProfile();
  }, []);

  const filterOrders = () => {
    let filtered = orders;

    if (startDate && endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    if (itemNameFilter) {
      filtered = filtered.filter((order) =>
        order.itemName.toLowerCase().includes(itemNameFilter.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Order Summary', 14, 22);

    // Add Business Profile Details
    if (profile) {
      const profileTableRows = [
        ['Company Name', profile.companyName],
        ['Phone Number', profile.phoneNumber],
        ['Email', profile.email],
        ['GST Number', profile.gstNumber],
        ['Shipping Address', profile.shipAddress],
        ['Billing Address', profile.billAddress],
      ];
      doc.autoTable({
        startY: 30,
        head: [['Field', 'Details']],
        body: profileTableRows,
        theme: 'grid',
        styles: { fontSize: 12 },
      });
    }

    let finalY = profile ? doc.lastAutoTable.finalY + 10 : 30;
    const tableColumn = ['Field', 'Details'];
    const tableRows = [
      ['Item Name', order.itemName],
      ['Available Quantity', `${order.availableQuantity} tons`],
      ['Price Per Ton', `₹${order.pricePerTon}`],
      ['Required Quantity', `${order.requiredQuantity} tons`],
      ['Subtotal', `₹${order.subtotal}`],
      ['GST (18%)', `₹${order.gst}`],
      ['Total Price', `₹${order.totalPrice}`],
      ['Order Date', new Date(order.orderDate).toLocaleDateString()],
    ];

    doc.autoTable({
      startY: finalY,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 12 },
      headStyles: { fillColor: [52, 73, 94] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, doc.internal.pageSize.height - 10);
    doc.save(`order-${order._id}.pdf`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='setter'>
      <div className="container mt-5">
        <h2 className="text-center">Order History</h2>

        <div className="filter-section d-flex flex-column flex-md-row align-items-center justify-content-center mb-4 p-3 border rounded shadow-sm">
          <div className="d-flex flex-column align-items-start mb-3 mb-md-0 me-md-3">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              className="form-control"
            />
          </div>
          <div className="d-flex flex-column align-items-start mb-3 mb-md-0 me-md-3">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              className="form-control"
            />
          </div>
          <div className="d-flex flex-column align-items-start mb-3 mb-md-0 me-md-3">
            <label>Item Name:</label>
            <input
              type="text"
              value={itemNameFilter}
              onChange={(e) => setItemNameFilter(e.target.value)}
              placeholder="Enter item name"
              className="form-control"
            />
          </div>
          <button
            className="btn btn-secondary ms-md-3 mt-3 mt-md-0 align-self-md-end"
            onClick={filterOrders}
          >
            Filter Orders
          </button>
        </div>

        <div className="order-list">
          {filteredOrders.length === 0 ? (
            <p>No orders found for the selected criteria.</p>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="order-item border p-3 mb-3 shadow rounded">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="order-details-left mb-3 mb-md-0">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Item Name:</strong> {order.itemName}</p>
                    <p><strong>Available Quantity:</strong> {order.availableQuantity} tons</p>
                    <p><strong>Price Per Ton:</strong> ₹{order.pricePerTon}</p>
                  </div>
                  <div className="order-details-right">
                    <p><strong>Required Quantity:</strong> {order.requiredQuantity} tons</p>
                    <p><strong>Subtotal:</strong> ₹{order.subtotal}</p>
                    <p><strong>GST (18%):</strong> ₹{order.gst}</p>
                    <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={() => generatePDF(order)}
                >
                  Download PDF
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyReport;
