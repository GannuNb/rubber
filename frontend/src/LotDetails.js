import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './LotDetails.css';
import lavalogo from './images/lavalogo.png'; 
import "./Login.css";
import Swal from 'sweetalert2'; // ✅ ADD THIS
import { showCompactLoginSuccess } from './showSuccessModal';

const LotDetails = () => {
  const location = useLocation();
  const { companyName, lotNumber } = location.state || {};

  const [pricePerTon, setPricePerTon] = useState('');
  const [form, setForm] = useState({ containerNo: '', sealNo: '', material: '', quantity: '' });
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (companyName && lotNumber) {
      fetchLotData();
      fetchTransactions();
    }
  }, [companyName, lotNumber]);

  const fetchLotData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/all`);
      const selectedLot = res.data.find(
        lot => lot.companyName === companyName && lot.lotNumber === lotNumber
      );
      if (selectedLot) setPricePerTon(selectedLot.price);
    } catch (err) {
      console.error('Error fetching lot price:', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const detailsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/details/all`);
      const amountRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/amounts/all`);

      const detailRows = detailsRes.data
        .filter(item => item.companyName === companyName && item.lotNumber === lotNumber)
        .map(item => {
          const quantityInTons = parseFloat(item.quantity) / 1000;
          const price = parseFloat(item.price);
          const containerAmount = price * quantityInTons;

          return {
            type: 'Container',
            timestamp: item.createdAt,
            date: new Date(item.createdAt).toLocaleDateString('en-GB'),
            containerNo: item.containerNo,
            sealNo: item.sealNo,
            material: item.material,
            quantity: quantityInTons,
            pricePerTon: price,
            containerAmount,
            amountAdded: '',
            totalPaid: 0,
          };
        });

      const filteredAmounts = amountRes.data
        .filter(item => item.companyName === companyName && item.lotNumber === lotNumber)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const amountRows = filteredAmounts.map((item, index) => ({
        type: index === 0 ? 'Advance' : 'Amount',
        timestamp: item.createdAt,
        date: new Date(item.createdAt).toLocaleDateString('en-GB'),
        containerNo: '',
        sealNo: '',
        material: '',
        quantity: '',
        pricePerTon: '',
        containerAmount: '',
        amountAdded: parseFloat(item.amount),
        totalPaid: 0,
      }));

      const allRows = [...detailRows, ...amountRows].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      let runningBalance = 0;
      let cumulativePaid = 0;

      const finalRows = allRows.map((item, index) => {
        const containerAmount = parseFloat(item.containerAmount) || 0;
        const amountAdded = parseFloat(item.amountAdded) || 0;

        if (item.type === 'Advance' || item.type === 'Amount') {
          runningBalance += amountAdded;
          cumulativePaid += amountAdded;
        } else if (item.type === 'Container') {
          runningBalance -= containerAmount;
        }

        const remainingBalance =
          runningBalance >= 0
            ? `Amount Left: $${runningBalance.toLocaleString()}`
            : `Due: $${Math.abs(runningBalance).toLocaleString()}`;

        return {
          ...item,
          id: index + 1,
          containerAmount: containerAmount ? `$${containerAmount.toLocaleString()}` : '',
          amountAdded: amountAdded ? `$${amountAdded.toLocaleString()}` : '',
          totalPaid: `$${cumulativePaid.toLocaleString()}`,
          remainingBalance,
        };
      });

      setTransactions(finalRows);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  const handleFormChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddDetails = async () => {
    const { containerNo, sealNo, material, quantity } = form;
    if (!containerNo || !sealNo || !material || !quantity) {
                  showCompactLoginSuccess('Please fill all detail fields');
            return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/lots/details/add`, {
        companyName,
        lotNumber,
        ...form,
        price: pricePerTon
      });
      setForm({ containerNo: '', sealNo: '', material: '', quantity: '' });
      fetchTransactions();
    } catch (err) {
      console.error('Error adding detail:', err);
    }
  };

  const handleAddAmount = async () => {
    if (!amount) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/lots/amounts/add`, {
        companyName,
        lotNumber,
        amount: parseFloat(amount)
      });
      setAmount('');
      fetchTransactions();
    } catch (err) {
      console.error('Error adding amount:', err);
    }
  };

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  const img = new Image();
  img.src = lavalogo;

  img.onload = () => {
    // Add logo on the left
    doc.addImage(img, 'PNG', 10, 5, 30, 15);

    // Title (centered)
    doc.setFontSize(16);
    doc.text(`${companyName}`, 105, 12, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Lot Details -   ${lotNumber}`, 105, 20, { align: 'center' });

    autoTable(doc, {
      startY: 28,
      head: [[
        '#', 'Date', 'Type', 'Container No', 'Seal No', 'Material',
        'Qty', 'Price/Ton', 'Container Amount', 'Amount Added', 'Total Paid', 'Rem. Balance'
      ]],
      body: transactions.map(tx => ([
        tx.id,
        tx.date,
        tx.type,
        tx.containerNo,
        tx.sealNo,
        tx.material,
        tx.quantity,
        tx.pricePerTon,
        tx.containerAmount.replace('$', ''),
        tx.amountAdded.replace('$', ''),
        tx.totalPaid.replace('$', ''),
        tx.remainingBalance
      ])),
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
      didParseCell: function (data) {
        const rowIndex = data.row.index;
        const txType = transactions[rowIndex]?.type;

        if (data.section === 'body') {
          if (txType === 'Advance') {
            data.cell.styles.fillColor = [255, 255, 153]; // yellow
          } else if (txType === 'Amount') {
            data.cell.styles.fillColor = [212, 237, 218]; // green
          }
        }
      }
    });

    // Final Balance
    const lastBalance = transactions[transactions.length - 1]?.remainingBalance || '';
    const y = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.text('Final Balance Summary:', 14, y);
    doc.setFontSize(11);
    doc.text(`Amount Left: ${lastBalance}`, 14, y + 8);

    doc.save(`Lot_${companyName}_${lotNumber}.pdf`);
  };
};


  return (
    <div style={{ padding: '30px' }}>
      <h2>Lot: {companyName} - {lotNumber}</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
        {[
          { key: 'containerNo', label: 'Container No' },
          { key: 'sealNo', label: 'Seal No' },
          { key: 'material', label: 'Material' },
          { key: 'quantity', label: 'Quantity (kg)' }
        ].map(({ key, label }) => (
          <div key={key} style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={key} style={{ marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
            <input
              id={key}
              name={key}
              value={form[key]}
              onChange={handleFormChange}
              style={{ padding: '8px' }}
            />
          </div>
        ))}

        <div style={{ flex: '1 1 100%', marginTop: '10px' }}>
          <b>Price/Ton:</b> ${pricePerTon || '0'}
        </div>
        <div style={{ flex: '1 1 100%', marginTop: '10px', textAlign: 'center' }}>
          <button
            onClick={handleAddDetails}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '12px 20px',
              width: '200px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '-10px'
            }}
          >
            Add Details
          </button>
        </div>

      </div>


      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{
            padding: '10px 16px',
            fontSize: '16px',
            width: '200px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleAddAmount}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add Amount
        </button>
        <button
          onClick={handleDownloadPDF}
          style={{
            background: '#007bff',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          📄 Download PDF
        </button>
      </div>


      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th>#</th><th>Date</th><th>Type</th><th>Container No</th><th>Seal No</th><th>Material</th>
            <th>Qty(MT)</th><th>Price/Ton</th><th>Container Amount</th><th>Amount  Added</th><th>Total Paid</th><th>Rem. Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="12" style={{ textAlign: 'center' }}>No transactions yet</td>
            </tr>
          ) : (
            transactions.map(tx => (
              <tr
                key={tx.id}
                style={{
                  backgroundColor:
                    tx.type === 'Advance' ? '#fff3cd'
                      : tx.type === 'Amount' ? '#d4edda'
                        : 'transparent',
                  whiteSpace: 'nowrap'
                }}
              >

                <td>{tx.id}</td>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.containerNo}</td>
                <td>{tx.sealNo}</td>
                <td>{tx.material}</td>
                <td>{tx.quantity}</td>
                <td>{tx.pricePerTon}</td>
                <td>{tx.containerAmount}</td>
                <td>{tx.amountAdded}</td>
                <td>{tx.totalPaid}</td>
                <td>{tx.remainingBalance}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default LotDetails;
