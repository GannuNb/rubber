import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './AddLot.css';
import logo from './images/lavalogo.png';
import "./Login.css";
import Swal from 'sweetalert2'; // ✅ ADD THIS
import { showCompactLoginSuccess } from './showSuccessModal';

const AddLot = () => {
  const [companyNames, setCompanyNames] = useState([]);
  const [allLots, setAllLots] = useState([]);
  const [companyLots, setCompanyLots] = useState([]);

  const [form, setForm] = useState({
    companyName: '',
    lotNumber: '',
    price: '',
    startDate: '',
    endDate: ''
  });


  const [isExistingLotSelected, setIsExistingLotSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');  // get token from storage
        const suppliersResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/suppliers/my-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // <-- include token here
            },
          }
        );

        const companyName = suppliersResponse.data.companyName;
        setCompanyNames([companyName]);
        setForm(prev => ({ ...prev, companyName }));

        const lotsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/all`);
        setAllLots(lotsResponse.data);
      } catch (error) {
        console.error('Failed to fetch supplier profile:', error);
        setCompanyNames([]);  // reset on failure
        setAllLots([]);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (!form.companyName || allLots.length === 0) return;

    const filtered = allLots.filter(lot => lot.companyName === form.companyName);
    setCompanyLots(filtered);

    setForm(prev => ({
      ...prev,
      lotNumber: '',
      price: ''
    }));

    setIsExistingLotSelected(false);
  }, [form.companyName, allLots]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'lotNumber') {
      const exists = companyLots.some(lot => lot.lotNumber === value);
      setIsExistingLotSelected(exists);
    }
  };

  const handleAddLot = async (e) => {
    e.preventDefault();
    if (!form.companyName || !form.lotNumber || !form.price) {
      showCompactLoginSuccess('Please fill in all fields');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/lots/add`, {
        companyName: form.companyName,
        lotNumber: form.lotNumber,
        price: parseFloat(form.price)
      });

      showCompactLoginSuccess('Lot added successfully');

      const updatedLots = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/all`);
      setAllLots(updatedLots.data);

      navigate('/lot-details', {
        state: {
          companyName: form.companyName,
          lotNumber: form.lotNumber
        }
      });

    } catch (err) {
      showCompactLoginSuccess('Error adding lot');
    }
  };

  const handleFetchResult = (e) => {
    e.preventDefault();
    if (form.companyName && form.lotNumber) {
      navigate('/lot-details', {
        state: {
          companyName: form.companyName,
          lotNumber: form.lotNumber
        }
      });
    }
  };

  const startDate = form.startDate ? new Date(form.startDate) : null;
  const endDate = form.endDate ? new Date(form.endDate + 'T23:59:59') : null; // include the full end day


  const handleDownloadDetailedPDF = async () => {
    const doc = new jsPDF();
    let y = 15;

    const addHeader = () => {
      const logoWidth = 50; // wider
      const logoHeight = 20; // taller proportionally
      doc.addImage(logo, 'PNG', 10, 5, logoWidth, logoHeight);
      doc.setFontSize(14);
      doc.text(form.companyName, 105, 12, { align: 'center' });
      y = 25; // Adjust if needed based on logo height
    };

    try {
      const detailsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/details/all`);
      const amountsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/lots/amounts/all`);

      let totalContainers = 0;
      let totalPaid = 0;

      addHeader();

      // Add filter date range to PDF
      doc.setFontSize(10);
      if (startDate || endDate) {
        doc.text(
          `Filtered from ${startDate?.toLocaleDateString('en-GB') || 'Start'} to ${endDate?.toLocaleDateString('en-GB') || 'End'}`,
          105,
          y,
          { align: 'center' }
        );
        y += 5;
      }

      for (const lot of companyLots) {
        const { lotNumber, price } = lot;

        const lotDetails = detailsRes.data.filter(d =>
          d.companyName === form.companyName &&
          d.lotNumber === lotNumber &&
          (!startDate || new Date(d.createdAt) >= startDate) &&
          (!endDate || new Date(d.createdAt) <= endDate)
        );

        const lotAmounts = amountsRes.data
          .filter(a =>
            a.companyName === form.companyName &&
            a.lotNumber === lotNumber &&
            (!startDate || new Date(a.createdAt) >= startDate) &&
            (!endDate || new Date(a.createdAt) <= endDate)
          )
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));


        const detailRows = lotDetails.map((item) => {
          const quantity = parseFloat(item.quantity) / 1000;
          const containerAmount = price * quantity;
          totalContainers += containerAmount;

          return {
            type: 'Container',
            timestamp: item.createdAt,
            date: new Date(item.date || item.createdAt).toLocaleDateString('en-GB'),
            containerNo: item.containerNo,
            sealNo: item.sealNo,
            material: item.material,
            quantity: quantity.toFixed(2),
            pricePerTon: price,
            containerAmount,
            amountAdded: '',
            totalPaid: 0,
          };
        });

        let isFirstAdvance = true;
        const amountRows = lotAmounts.map(item => {
          const type = isFirstAdvance ? 'Advance' : 'Amount';
          const amount = parseFloat(item.amount);
          totalPaid += amount;

          const row = {
            type: type,
            timestamp: item.createdAt,
            date: new Date(item.date || item.createdAt).toLocaleDateString('en-GB'),
            containerNo: '',
            sealNo: '',
            material: '',
            quantity: '',
            pricePerTon: '',
            containerAmount: '',
            amountAdded: amount,
            totalPaid: 0,
          };
          isFirstAdvance = false;
          return row;
        });

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
              ? `Amount Left with ${form.companyName}: $ ${runningBalance.toLocaleString('en-US')}`
              : `Due : $ ${Math.abs(runningBalance).toLocaleString('en-US')}`;

          return [
            index + 1,
            item.date,
            item.type,
            item.containerNo,
            item.sealNo,
            item.material,
            item.quantity,
            item.pricePerTon,
            containerAmount ? `$ ${containerAmount.toLocaleString('en-US')}` : '',
            amountAdded ? `$ ${amountAdded.toLocaleString('en-US')}` : '',
            `$ ${cumulativePaid.toLocaleString('en-US')}`,
            remainingBalance
          ];
        });

        doc.setFontSize(11);
        doc.text(`Lot Number: ${lotNumber}`, 105, y, { align: 'center' });
        y += 6;

        autoTable(doc, {
          head: [[
            '#', 'Date', 'Type', 'Container No', 'Seal No', 'Material',
            'Qty', 'Price/Ton', 'Container Amount', 'Amount Added', 'Total Paid', 'Rem. Balance'
          ]],
          body: finalRows,
          startY: y,
          styles: { fontSize: 7, cellPadding: 1.5 },
          headStyles: { fillColor: [40, 100, 200], halign: 'center' },
          bodyStyles: { halign: 'center' },
          margin: { left: 10, right: 10 },
          tableWidth: 'auto',
          didDrawPage: (data) => {
            if (data.pageCount > 1) addHeader(); // Add logo & title on new page
            y = data.cursor.y + 10;
          },
          didParseCell: function (data) {
            const typeColumnIndex = 2;
            const type = data.row.raw?.[typeColumnIndex];

            if (data.section === 'body') {
              if (type === 'Advance') {
                data.cell.styles.fillColor = [255, 255, 153];
              } else if (type === 'Amount') {
                data.cell.styles.fillColor = [204, 255, 204];
              }
            }
          }
        });

        y += 10;
        if (y > 250) {
          doc.addPage();
          y = 15;
        }
      }

      const remaining = totalContainers - totalPaid;
      const remText =
        remaining < 0
          ? `Amount Left with ${form.companyName}: $ ${Math.abs(remaining).toLocaleString('en-US')}`
          : `Due : $ ${remaining.toLocaleString('en-US')}`;

      doc.setFontSize(12);
      doc.text('Overall Summary:', 105, y, { align: 'center' });
      y += 6;

      autoTable(doc, {
        startY: y,
        styles: { fontSize: 10, cellPadding: 3 },
        head: [['Total Container Amount ($)', 'Total Amount Paid ($)', 'Remaining']],
        body: [[
          `$ ${totalContainers.toLocaleString('en-US')}`,
          `$ ${totalPaid.toLocaleString('en-US')}`,
          remText
        ]],
        headStyles: { fillColor: [100, 100, 255], textColor: 255 },
        bodyStyles: {
          fillColor: [255, 255, 204],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        margin: { left: 30, right: 30 },
        tableWidth: 'auto'
      });

      doc.save(`Lot_${form.companyName}_Detailed.pdf`);
    } catch (error) {
      console.error("Error generating detailed PDF:", error);
      showCompactLoginSuccess('Failed to generate PDF');
    }
  };





  return (
    <div className="add-lot-container">
      <h2>Lot Management</h2>

      <form className="lot-form">
        {form.companyName && (
          <>
            {/* Existing Lot Dropdown */}
            {companyLots.length > 0 && (
              <div className="form-group">
                <label>Select Existing Lot</label>
                <select
                  name="lotNumber"
                  value={isExistingLotSelected ? form.lotNumber : ''}
                  onChange={handleChange}
                >
                  <option value="">Select Existing Lot</option>
                  {companyLots.map((lot, i) => (
                    <option key={i} value={lot.lotNumber}>{lot.lotNumber}</option>
                  ))}
                </select>

                {isExistingLotSelected && (
                  <button className="btn fetch-btn" onClick={handleFetchResult}>
                    Fetch Result
                  </button>
                )}
              </div>
            )}

            <div className="filter-download-container">
              <div className="filter-group">
                <label htmlFor="startDate">Filter Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={form.startDate || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="endDate">Filter End Date</label>
                <input
                  type="date"
                  id="endDate"
                  value={form.endDate || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>

              <div className="download-btn-group">
                <button
                  className="btn download-btn"
                  onClick={handleDownloadDetailedPDF}
                >
                  📄 Download Detailed PDF (All Lots)
                </button>
              </div>
            </div>


            {/* New Lot Inputs */}
            {!isExistingLotSelected && (
              <>


                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lotNumber">New Lot Number</label>
                    <input
                      type="text"
                      name="lotNumber"
                      id="lotNumber"
                      value={form.lotNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn add-btn" onClick={handleAddLot}>
                  Add Lot
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );

};

export default AddLot;

