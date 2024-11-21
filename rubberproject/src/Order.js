import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Sell.css';
import logo from "./images/logo.png"


const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, available_quantity, price, required_quantity } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAvailable, setCurrentAvailable] = useState(available_quantity);
  const [loadingButton, setLoadingButton] = useState(false); // Loading state for button

  // Redirect to Login if no token is present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => {
        alert("Please log in to order");
        navigate('/Login'); // Navigate to login if no token
      }, 0);
      return;
    }
  }, [navigate]);

  // Redirect to home if required data is missing
  useEffect(() => {
    if (!name || !price || !required_quantity) {
      navigate('/', { replace: true });
    }
  }, [name, price, required_quantity, navigate]);

  // Calculate total price with GST
  useEffect(() => {
    if (price > 0 && required_quantity > 0) {
      const gstRate = 0.18;
      const subtotal = price * required_quantity;
      const gstAmount = subtotal * gstRate;
      setTotalPrice((subtotal + gstAmount).toFixed(2));
    } else {
      setTotalPrice(0);
    }
  }, [price, required_quantity]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
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
          navigate('/BusinessProfile', { replace: true });
        }
      } catch (err) {
        setError('Failed to fetch profile.');
        console.error('Error fetching business profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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

  const generatePDF = () => {
    const doc = new jsPDF();
    if (logo) {
      doc.addImage(logo, 'JPEG', 11, 6, 40, 20); // Adjust the width and height of the logo
    }


    // Header
    doc.setFontSize(20);
    doc.text('INVOICE', 86, 20);
    doc.setFontSize(10);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 190, 20, { align: 'right' });
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 25, 200, 25); // Underline

  
    // Billing and Shipping Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text('Billing Information', 14, 35);
    doc.text('Shipping Information', 110, 35);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 38, 200, 38); // Underline
  
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal'); // Reset font to normal
    if (profile) {
      // Billing Info
      doc.text(`Company: ${profile.companyName || 'N/A'}`, 14, 45);
      doc.text(`Address: ${profile.billAddress || 'N/A'}`, 14, 50);
      doc.text(`Email: ${profile.email || 'N/A'}`, 14, 55);
  
      // Shipping Info
      doc.text(`Address: ${profile.shipAddress || 'N/A'}`, 110, 45);
    }
  
    // Products Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Products', 14, 70);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 73, 200, 73); // Underline
  
    const subtotal = price * required_quantity;
    const gst = subtotal * 0.18; // Assuming GST is 18%
    const total = subtotal + gst;
    const totalAmountInWords = numberToWords(total);
  
    doc.setFont('helvetica', 'normal');
    doc.autoTable({
      startY: 75,
      head: [['Item Name', 'Available', 'Price/Ton', 'Required', 'Subtotal', 'GST (18%)', 'Total']],
      body: [
        [
          name, // Item Name
          `${available_quantity} tons`, // Available
          `₹${price.toFixed(2)}`, // Price/Ton
          `${required_quantity} tons`, // Required
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
    doc.text(profile?.shipAddress || 'N/A', 110, addressY + 20);
  
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
  
    return doc.output('blob');
  };
  
    
  

  // Handle Order Button
  const handleOrder = async () => {
    try {
      setLoadingButton(true); // Set loading state to true when button is clicked

      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated.');
        navigate('/', { replace: true });
        return;
      }

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/place-order`,
        { itemName: name, requiredQuantity: required_quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (orderResponse.status === 200) {
        setCurrentAvailable(orderResponse.data.remainingQuantity);

        // Generate PDF blob
        const pdfBlob = generatePDF();

        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'order-summary.pdf');
        formData.append('userEmail', profile?.email);

        // Send email with the PDF attachment
        const emailResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload-pdf`,
          formData,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        );

        if (emailResponse.status === 200) {
          alert('Order placed and summary emailed.');
          navigate('/Getorders', { replace: true });
        } else {
          alert('Order placed but email failed.');
        }
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An unexpected error occurred.');
    } finally {
      setLoadingButton(false); // Reset loading state when request is complete
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="setter">
      <div className="container mt-5">
        <div className="border p-4 rounded bg-light shadow-lg">
          <h2 className="text-center">Order Summary</h2>
          <div className="border p-4 rounded bg-white mt-4">
            <h4>Business and Order Details</h4>
            <p><strong>Company Name:</strong> {profile?.companyName}</p>
            <p><strong>Phone:</strong> {profile?.phoneNumber}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>GST:</strong> {profile?.gstNumber}</p>
            <p><strong>Shipping Address:</strong> {profile?.shipAddress}</p>
            <p><strong>Billing Address:</strong> {profile?.billAddress}</p>
            <hr />
            <div className="row">
              <div className="col">
                <p><strong>Item:</strong> {name}</p>
                <p><strong>Available:</strong> {currentAvailable} tons</p>
                <p><strong>Price/Ton:</strong> ₹{price}</p>
                <p><strong>Required:</strong> {required_quantity} tons</p>
              </div>
              <div className="col text-right">
                <p><strong>Subtotal:</strong> ₹{(price * required_quantity).toFixed(2)}</p>
                <p><strong>GST:</strong> ₹{((price * required_quantity) * 0.18).toFixed(2)}</p>
                <p><strong>Total:</strong> ₹{totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleOrder} disabled={loadingButton}>
              {loadingButton ? (
                <span>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  &nbsp;Processing...
                </span>
              ) : (
                'Order Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
