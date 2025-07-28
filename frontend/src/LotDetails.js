import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./LotDetails.css";
import lavalogo from "./images/lavalogo.png";
import "./Login.css";
import Swal from "sweetalert2"; // ✅ ADD THIS
import { showCompactLoginSuccess } from "./showSuccessModal";

const LotDetails = () => {
  const location = useLocation();
  const { companyName, lotNumber } = location.state || {};

  const [pricePerTon, setPricePerTon] = useState("");
  const [form, setForm] = useState({
    containerNo: "",
    sealNo: "",
    material: "",
    quantity: "",
    date: "", // ⬅️ New field
  });

  const [amount, setAmount] = useState("");
  const [amountDate, setAmountDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // YYYY-MM-DD

  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (companyName && lotNumber) {
      fetchLotData();
      fetchTransactions();
    }
  }, [companyName, lotNumber]);

  const fetchLotData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/lots/all`
      );
      const selectedLot = res.data.find(
        (lot) => lot.companyName === companyName && lot.lotNumber === lotNumber
      );
      if (selectedLot) setPricePerTon(selectedLot.price);
    } catch (err) {
      console.error("Error fetching lot price:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const detailsRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/lots/details/all`
      );
      const amountRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/lots/amounts/all`
      );

      const detailRows = detailsRes.data
        .filter(
          (item) =>
            item.companyName === companyName && item.lotNumber === lotNumber
        )
        .map((item) => {
          const quantityInTons = parseFloat(item.quantity) / 1000;
          const price = parseFloat(item.price);
          const containerAmount = price * quantityInTons;

          return {
            type: "Container",
            timestamp: item.date || item.createdAt, // 🆕 use custom date if exists
            date: item.date
              ? new Date(item.date).toLocaleDateString("en-GB") // 🆕 show entered date
              : new Date(item.createdAt).toLocaleDateString("en-GB"),
            containerNo: item.containerNo,
            sealNo: item.sealNo,
            material: item.material,
            quantity: quantityInTons,
            pricePerTon: price,
            containerAmount,
            amountAdded: "",
            totalPaid: 0,
          };
        });

      const filteredAmounts = amountRes.data
        .filter(
          (item) =>
            item.companyName === companyName && item.lotNumber === lotNumber
        )
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const amountRows = filteredAmounts.map((item, index) => {
        const dateObj = item.date
          ? new Date(item.date)
          : new Date(item.createdAt);

        return {
          type: index === 0 ? "Advance" : "Amount",
          timestamp: dateObj,
          date: dateObj.toLocaleDateString("en-GB"),
          containerNo: "",
          sealNo: "",
          material: "",
          quantity: "",
          pricePerTon: "",
          containerAmount: "",
          amountAdded: parseFloat(item.amount),
          totalPaid: 0,
        };
      });

      const allRows = [...detailRows, ...amountRows].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      let runningBalance = 0;
      let cumulativePaid = 0;

      const finalRows = allRows.map((item, index) => {
        const containerAmount = parseFloat(item.containerAmount) || 0;
        const amountAdded = parseFloat(item.amountAdded) || 0;

        if (item.type === "Advance" || item.type === "Amount") {
          runningBalance += amountAdded;
          cumulativePaid += amountAdded;
        } else if (item.type === "Container") {
          runningBalance -= containerAmount;
        }

        const remainingBalance =
          runningBalance >= 0
            ? `Amount Left: $${runningBalance.toLocaleString()}`
            : `Due: $${Math.abs(runningBalance).toLocaleString()}`;

        return {
          ...item,
          id: index + 1,
          containerAmount: containerAmount
            ? `$${containerAmount.toLocaleString()}`
            : "",
          amountAdded: amountAdded ? `$${amountAdded.toLocaleString()}` : "",
          totalPaid: `$${cumulativePaid.toLocaleString()}`,
          remainingBalance,
        };
      });

      setTransactions(finalRows);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddDetails = async () => {
    const { containerNo, sealNo, material, quantity } = form;
    if (!containerNo || !sealNo || !material || !quantity) {
      showCompactLoginSuccess("Please fill all detail fields");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lots/details/add`,
        {
          companyName,
          lotNumber,
          ...form,
          price: pricePerTon,
        }
      );
      setForm({ containerNo: "", sealNo: "", material: "", quantity: "" });
      fetchTransactions();
    } catch (err) {
      console.error("Error adding detail:", err);
    }
  };

  const handleAddAmount = async () => {
    if (!amount) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lots/amounts/add`,
        {
          companyName,
          lotNumber,
          amount: parseFloat(amount),
          date: amountDate, // <-- Include date here
        }
      );

      setAmount("");
      setAmountDate(new Date().toISOString().split("T")[0]); // reset date to today
      fetchTransactions();
    } catch (err) {
      console.error("Error adding amount:", err);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = lavalogo;

    img.onload = () => {
      // Increase logo size proportionally
      const logoWidth = 50; // increased from 30 to 50
      const logoHeight = 20; // increased from 15 to 20

      // Add larger logo on the left
      doc.addImage(img, "PNG", 10, 5, logoWidth, logoHeight);

      // Title (centered)
      doc.setFontSize(16);
      doc.text(`${companyName}`, 105, 12, { align: "center" });

      doc.setFontSize(12);
      doc.text(`Lot Details -   ${lotNumber}`, 105, 20, { align: "center" });

      autoTable(doc, {
        startY: 28,
        head: [
          [
            "#",
            "Date",
            "Type",
            "Container No",
            "Seal No",
            "Material",
            "Qty",
            "Price/Ton",
            "Container Amount",
            "Amount Added",
            "Total Paid",
            "Rem. Balance",
          ],
        ],
        body: transactions.map((tx) => [
          tx.id,
          tx.date,
          tx.type,
          tx.containerNo,
          tx.sealNo,
          tx.material,
          tx.quantity,
          tx.pricePerTon,
          tx.containerAmount.replace("$", ""),
          tx.amountAdded.replace("$", ""),
          tx.totalPaid.replace("$", ""),
          tx.remainingBalance,
        ]),
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

          if (data.section === "body") {
            if (txType === "Advance") {
              data.cell.styles.fillColor = [255, 255, 153]; // yellow
            } else if (txType === "Amount") {
              data.cell.styles.fillColor = [212, 237, 218]; // green
            }
          }
        },
      });

      // Final Balance
      const lastBalance =
        transactions[transactions.length - 1]?.remainingBalance || "";
      const y = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(12);
      doc.text("Final Balance Summary:", 14, y);
      doc.setFontSize(11);
      doc.text(`Amount Left: ${lastBalance}`, 14, y + 8);

      doc.save(`Lot_${companyName}_${lotNumber}.pdf`);
    };
  };

  return (
    <div className="lot-details-container">
  <h2 className="lot-header">Lot: {lotNumber}</h2>

  <div className="input-row">
    {[
      { key: "containerNo", label: "Container No" },
      { key: "sealNo", label: "Seal No" },
    ].map(({ key, label }) => (
      <div key={key} className="input-group">
        <label htmlFor={key}>{label}</label>
        <input
          id={key}
          name={key}
          type="text"
          value={form[key]}
          onChange={handleFormChange}
        />
      </div>
    ))}
  </div>

  <div className="input-row">
    {[
      { key: "material", label: "Material", type: "text" },
      { key: "quantity", label: "Quantity (kg)", type: "number" },
      { key: "date", label: "Date", type: "date" },
    ].map(({ key, label, type }) => (
      <div key={key} className="input-group">
        <label htmlFor={key}>{label}</label>
        <input
          id={key}
          name={key}
          type={type}
          value={form[key]}
          onChange={handleFormChange}
          {...(key === "quantity" && { min: 0, step: "any" })}
        />
      </div>
    ))}
  </div>

  <div style={{ marginTop: "10px" }}>
    <b>Price/Ton:</b> ${pricePerTon || "0"}
  </div>

  <div style={{ marginTop: "10px", marginBottom: "30px" }}>
  <button className="add-button" onClick={handleAddDetails}>
    Add Details
  </button>
</div>

  <div className="amount-row action-buttons">
    <input
      type="number"
      placeholder="Enter Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <input
      type="date"
      value={amountDate}
      onChange={(e) => setAmountDate(e.target.value)}
    />
    <button className="add-amount-btn" onClick={handleAddAmount}>
      Add Advance/Amount
    </button>
    <button className="download-btn" onClick={handleDownloadPDF}>
      📄 Download PDF
    </button>
  </div>

  <div className="filter-row">
    <label style={{ fontWeight: "bold" }}>Filter by Date:</label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
    <span>to</span>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
    <button onClick={() => { setStartDate(""); setEndDate(""); }}>
      Clear
    </button>
  </div>

<div className="table-wrapper">
  <table className="transaction-table">
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Type</th>
            <th>Container No</th>
            <th>Seal No</th>
            <th>Material</th>
            <th>Qty(MT)</th>
            <th>Price/Ton</th>
            <th>Container Amount</th>
            <th>Amount Added</th>
            <th>Total Paid</th>
            <th>Rem. Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="12" style={{ textAlign: "center" }}>
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions
              .filter((tx) => {
                if (!startDate && !endDate) return true;
                const txDate = new Date(tx.timestamp);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
                return (!start || txDate >= start) && (!end || txDate <= end);
              })
              .map((tx) => (
                <tr
                  key={tx.id}
                  style={{
                    backgroundColor:
                      tx.type === "Advance"
                        ? "#fff3cd"
                        : tx.type === "Amount"
                          ? "#d4edda"
                          : "transparent",
                    whiteSpace: "nowrap",
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
</div>
  );
};

export default LotDetails;


