import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import logo from "./images/logo.png"



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

  const numberToWords = (num) => {
    if (num === 0) return 'zero';
  
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
      'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    const numToWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '');
      return '';
    };
  
    const units = ['crore', 'lakh', 'thousand', ''];
    const divisors = [10000000, 100000, 1000, 1];
  
    let result = '';
    for (let i = 0; i < divisors.length; i++) {
      const quotient = Math.floor(num / divisors[i]);
      num %= divisors[i];
      if (quotient > 0) {
        result += numToWords(quotient) + ' ' + units[i] + ' ';
      }
    }
  
    return result.trim() + ' rupees only';
  };
  

    const generatePDF = (order) => {
      const doc = new jsPDF();
      if (logo) {
        doc.addImage(logo, 'JPEG', 11, 6, 40, 20); // Adjust the width and height of the logo
      }
  
  
      // Header
      doc.setFontSize(20);
      doc.text('INVOICE', 86, 20);
      doc.setFontSize(10);
      const formattedDate = new Date(order.orderDate).toLocaleDateString();

      // Display the formatted date
      doc.setFontSize(10);
      doc.text(`Invoice Date: ${formattedDate}`, 190, 20, { align: 'right' });
      doc.setDrawColor(0, 0, 0);
      doc.line(10, 25, 200, 25); // Underline
  
      // Billing and Shipping Information
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Billing Information', 14, 35);
      doc.text('Shipping Information', 110, 35);
      doc.setDrawColor(0, 0, 0);
      doc.line(10, 38, 200, 38); // Underline
  
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      if (profile) {
        // Billing Info
        doc.text(`Company: ${profile.companyName || 'N/A'}`, 14, 45);
        doc.text(`Address: ${profile.billAddress || 'N/A'}`, 14, 50);
        doc.text(`Email: ${profile.email || 'N/A'}`, 14, 55);
  
        // Shipping Info
        doc.text(`Address: ${profile.shipAddress || 'N/A'}`, 110, 45);
      }
  
      // Order Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Order Details', 14, 70);
      doc.setDrawColor(0, 0, 0);
      doc.line(10, 73, 200, 73); // Underline
  
      const subtotal = order.pricePerTon * order.requiredQuantity;
      const gst = subtotal * 0.18; // Assuming GST is 18%
      const total = subtotal + gst;
      const totalAmountInWords = numberToWords(total);
  
      doc.setFont('helvetica', 'normal');
      doc.autoTable({
        startY: 75,
        head: [['Item Name', 'Available Quantity', 'Price/Ton', 'Required Quantity', 'Subtotal', 'GST (18%)', 'Total']],
        body: [
          [
            order.itemName, // Item Name
            `${order.availableQuantity} tons`, // Available
            `₹${order.pricePerTon.toFixed(2)}`, // Price/Ton
            `${order.requiredQuantity} tons`, // Required
            `₹${subtotal.toFixed(2)}`, // Subtotal
            `₹${gst.toFixed(2)}`, // GST
            `₹${total.toFixed(2)}`, // Total
          ],
        ],
        theme: 'striped',
        styles: { fontSize: 10 },
      });
  
      // Total Amount in Words
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.text(`Total Amount (in words): ${totalAmountInWords}`, 14, finalY);
  
      // Address Details Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const addressY = finalY + 15;
      doc.text('Address Details', 14, addressY);
      doc.setDrawColor(0, 0, 0);
      doc.line(10, addressY + 3, 200, addressY + 3); // Underline
  
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('From:', 14, addressY + 10);
      doc.text('VIKAH RUBBERS', 14, addressY + 15);
      doc.text('Hyderabad', 14, addressY + 20);
      doc.text('Dispatch From:', 14, addressY + 25);
      doc.text('#406, 4th Floor, Patel Towers,', 14, addressY + 30);
      doc.text('Above EasyBuy Beside Nagole RTO Office,', 14, addressY + 35);
      doc.text('Nagole Hyderabad, Telangana-500035', 14, addressY + 40);
      doc.text('Hyderabad.', 14, addressY + 45);
  
      // Shipping Info Section
      doc.setFont('helvetica', 'bold');
      doc.text('Shipping Information', 110, addressY + 10);
      doc.setFont('helvetica', 'normal');
      doc.text('To:', 110, addressY + 15);
      doc.text(profile.shipAddress || 'N/A', 110, addressY + 20);
  
      // Terms and Conditions
      const termsY = addressY + 55;
      doc.setFont('helvetica', 'bold');
      doc.text('Terms and Conditions:', 14, termsY);
      doc.setDrawColor(0, 0, 0);
      doc.line(10, termsY + 3, 200, termsY + 3); // Underline
  
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(
        '1. The Seller shall not be liable to the Buyer for any loss or damage.',
        14,
        termsY + 10
      );
      doc.text(
        '2. The Seller warrants the product for one (1) year from the date of shipment.',
        14,
        termsY + 15
      );
      doc.text(
        '3. The purchase order will be interpreted as acceptance of this offer.',
        14,
        termsY + 20
      );
  
      // Download PDF
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
