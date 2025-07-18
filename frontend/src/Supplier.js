import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // This is needed to attach autoTable to jsPDF

const API = process.env.REACT_APP_API_URL;

function SupplierApp() {
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [supplier, setSupplier] = useState(null);

  const [container, setContainer] = useState({
    containerNumber: "",
    sealNumber: "",
    material: "",
    quantity: "",
    pricePerTon: "",
  });
  const [newAdvance, setNewAdvance] = useState("");
  const [newSupplier, setNewSupplier] = useState({
    companyName: "",
    advancePayment: "",
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const res = await axios.get(`${API}/api/suppliers`);
    setCompanyList(res.data);
  };

  const handleSelectCompany = async (e) => {
    const name = e.target.value;
    setSelectedCompany(name);
    if (name) {
      const res = await axios.get(`${API}/api/suppliers/${name}`);
      setSupplier(res.data);
    } else {
      setSupplier(null);
    }
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();
    const { companyName, advancePayment } = newSupplier;
    const res = await axios.post(`${API}/api/suppliers/add`, {
      companyName,
      advancePayment: Number(advancePayment),
    });
    setNewSupplier({ companyName: "", advancePayment: "" });
    await loadCompanies();
    setSelectedCompany(res.data.companyName);
    setSupplier(res.data);
  };

  const handleContainerChange = (e) =>
    setContainer({ ...container, [e.target.name]: e.target.value });

  const handleAddContainer = async (e) => {
    e.preventDefault();
    const payload = {
      ...container,
      quantity: Number(container.quantity),
      pricePerTon: Number(container.pricePerTon),
    };
    const res = await axios.post(
      `${API}/api/suppliers/add-container/${supplier.companyName}`,
      payload
    );
    setSupplier(res.data);
    setContainer({
      containerNumber: "",
      sealNumber: "",
      material: "",
      quantity: "",
      pricePerTon: "",
    });
  };

  const handleAddAdvance = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${API}/api/suppliers/add-advance/${supplier.companyName}`,
      { additionalAdvance: Number(newAdvance) }
    );
    setSupplier(res.data);
    setNewAdvance("");
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  // Combine, sort and display
  const mergedRecords = [
    ...(supplier?.advanceHistory.map((a) => ({ ...a, type: "advance" })) || []),
    ...(supplier?.containers.map((c) => ({ ...c, type: "container" })) || []),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Supplier Report - ${supplier.companyName}`, 14, 15);

    const tableData = mergedRecords.map((r, i) => {
      if (r.type === "container") {
        return [
          i + 1,
          formatDate(r.date),
          "Container",
          r.containerNumber,
          r.sealNumber,
          r.material,
          r.quantity,
          `$${r.pricePerTon}`,
          `$${r.totalAmount}`,
          `$${r.remainingBalanceAtThatTime}`,
          `$${r.totalPaidAtThatTime}`,
        ];
      } else {
        return [
          i + 1,
          formatDate(r.date),
          "Advance",
          "",
          "",
          "",
          "",
          "", 
          `$${r.amount}`,
          `$${r.remainingBalanceAfter}`,
          `$${r.totalPaidAfter}`,
        ];
      }
    });

    autoTable(doc, {
      startY: 20,
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
          "Amount",
          "Rem. Balance",
          "Total Paid",
        ],
      ],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [52, 58, 64] },
    });

    doc.save(`Supplier_Report_${supplier.companyName}.pdf`);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Supplier Management</h3>

      <div className="row mb-4">
        <div className="col-md-5">
          <select
            className="form-select"
            value={selectedCompany}
            onChange={handleSelectCompany}
          >
            <option value="">Add Supplier</option>
            {companyList.map((c, i) => (
              <option key={i} value={c.companyName}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Only show this if "Add Supplier" is selected */}
        {selectedCompany === "" && (
          <div className="col-md-7">
            <form className="row g-2" onSubmit={handleAddCompany}>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="New Company Name"
                  value={newSupplier.companyName}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      companyName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Advance Payment"
                  value={newSupplier.advancePayment}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      advancePayment: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <button type="submit" className="btn btn-success w-100">
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {supplier && (
        <>
          <div className="row align-items-start mb-4">
            {/* Container Form (Left) */}
            <div className="col-lg-8">
              <table className="table table-bordered table-sm text-center align-middle">
                <thead className="table-secondary">
                  <tr>
                    <th className="text-start">Company</th>
                    <th>Container No</th>
                    <th>Seal No</th>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Price/Ton</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{supplier.companyName}</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="containerNumber"
                        className="form-control form-control-sm"
                        placeholder="Container No"
                        value={container.containerNumber}
                        onChange={handleContainerChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="sealNumber"
                        className="form-control form-control-sm"
                        placeholder="Seal No"
                        value={container.sealNumber}
                        onChange={handleContainerChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="material"
                        className="form-control form-control-sm"
                        placeholder="Material"
                        value={container.material}
                        onChange={handleContainerChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control form-control-sm"
                        placeholder="Qty"
                        value={container.quantity}
                        onChange={handleContainerChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="pricePerTon"
                        className="form-control form-control-sm"
                        placeholder="Price"
                        value={container.pricePerTon}
                        onChange={handleContainerChange}
                        required
                      />
                    </td>
                    <td>
                      <form onSubmit={handleAddContainer}>
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary w-100"
                        >
                          Add
                        </button>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Advance Form (Right) */}
            <div className="col-lg-4 mt-3 mt-lg-0">
              <form
                className="row g-2 align-items-center"
                onSubmit={handleAddAdvance}
              >
                <div className="col-12 mb-1">
                  <strong>Add Advance</strong>
                </div>

                <div className="col-8">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Advance Amount"
                    value={newAdvance}
                    onChange={(e) => setNewAdvance(e.target.value)}
                    required
                  />
                </div>

                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-warning btn-sm w-100"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <table className="table mt-4 table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Container No</th>
                <th>Seal No</th>
                <th>Material</th>
                <th>Qty</th>
                <th>Price/Ton</th>
                <th>Container Amount</th>
                <th>Rem. Balance</th>
                <th>Total Paid</th>
              </tr>
            </thead>
            <tbody>
              {mergedRecords.map((r, idx) => (
                <tr
                  key={idx}
                  className={r.type === "advance" ? "table-warning" : ""}
                >
                  <td>{idx + 1}</td>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.type === "container" ? "Container" : "Advance"}</td>

                  {r.type === "container" ? (
                    <>
                      <td>{r.containerNumber}</td>
                      <td>{r.sealNumber}</td>
                      <td>{r.material}</td>
                      <td>{r.quantity}</td>
                      <td>${r.pricePerTon}</td>
                      <td>${r.totalAmount}</td>
                      <td>${r.remainingBalanceAtThatTime}</td>
                      <td>${r.totalPaidAtThatTime}</td>
                    </>
                  ) : (
                    <>
                      <td colSpan="5" className="text-end">
                        <strong>Advance Added</strong>
                      </td>
                      <td>${r.amount}</td>
                      <td>${r.remainingBalanceAfter}</td>
                      <td>${r.totalPaidAfter}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <button className="btn btn-success mb-5" onClick={generatePDF}>
              Generate PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SupplierApp;
