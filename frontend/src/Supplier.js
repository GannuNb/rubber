import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./Adminnav";

const API = process.env.REACT_APP_API_URL;

function SupplierApp() {
  const [businessProfiles, setBusinessProfiles] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  
  // For adding new supplier from business profiles
  const [selectedBusinessCompany, setSelectedBusinessCompany] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");

  const [supplier, setSupplier] = useState(null);

  const [container, setContainer] = useState({
    containerNumber: "",
    sealNumber: "",
    material: "",
    quantity: "",
    pricePerTon: "",
  });
  const [newAdvance, setNewAdvance] = useState("");

  useEffect(() => {
    loadBusinessProfiles();
    loadSuppliers();
  }, []);

  // Load business profiles for dropdown when adding supplier
  const loadBusinessProfiles = async () => {
    try {
      const res = await axios.get(`${API}/api/business`);
      setBusinessProfiles(res.data);
    } catch (err) {
      console.error("Error loading business profiles", err);
    }
  };

  // Load suppliers for main dropdown
  const loadSuppliers = async () => {
    try {
      const res = await axios.get(`${API}/api/suppliers`);
      setCompanyList(res.data);
    } catch (err) {
      console.error("Error loading suppliers", err);
    }
  };

  // When user selects existing supplier
  const handleSelectSupplier = async (e) => {
    const name = e.target.value;
    setSelectedSupplier(name);
    setSelectedBusinessCompany(""); // reset add supplier fields
    setLotNumber("");
    setAdvanceAmount("");

    if (name) {
      const res = await axios.get(`${API}/api/suppliers/${name}`);
      setSupplier(res.data);
    } else {
      setSupplier(null);
    }
  };

  // When user selects a business profile company for adding supplier
  const handleSelectBusinessCompany = (e) => {
    setSelectedBusinessCompany(e.target.value);
  };

  // Add new supplier linked to business profile company with lot number and advance
  const handleAddSupplier = async (e) => {
    e.preventDefault();
    if (!selectedBusinessCompany || !lotNumber || !advanceAmount) {
      alert("Please select company, enter lot number and advance amount.");
      return;
    }

    try {
      // Sending lotNumber as part of advancePayment, 
      // but you can modify backend to accept lotNumber if needed
      const res = await axios.post(`${API}/api/suppliers/add`, {
        companyName: selectedBusinessCompany,
        advancePayment: Number(advanceAmount),
        lotNumber, // add this to backend model & API if you want to save it
      });

      setSelectedSupplier(res.data.companyName);
      setSupplier(res.data);

      // Reset add supplier inputs
      setSelectedBusinessCompany("");
      setLotNumber("");
      setAdvanceAmount("");

      // Reload supplier list
      await loadSuppliers();
    } catch (err) {
      console.error("Error adding supplier", err);
      alert("Failed to add supplier");
    }
  };

  const handleContainerChange = (e) =>
    setContainer({ ...container, [e.target.name]: e.target.value });

  const handleAddContainer = async (e) => {
    e.preventDefault();
    try {
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
    } catch (err) {
      console.error("Error adding container", err);
      alert("Failed to add container");
    }
  };

  const handleAddAdvance = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/suppliers/add-advance/${supplier.companyName}`,
        { additionalAdvance: Number(newAdvance) }
      );
      setSupplier(res.data);
      setNewAdvance("");
    } catch (err) {
      console.error("Error adding advance", err);
      alert("Failed to add advance");
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const mergedRecords = [
    ...(supplier?.advanceHistory.map((a) => ({ ...a, type: "advance" })) || []),
    ...(supplier?.containers.map((c) => ({ ...c, type: "container" })) || []),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
  

      <div className="container mt-5">
        <h3 className="mb-4">Supplier Management</h3>

        <div className="row mb-4">
          <div className="col-md-5">
            <select
              className="form-select"
              value={selectedSupplier}
              onChange={handleSelectSupplier}
            >
              <option value="">Add Supplier</option>
              {companyList.map((c, i) => (
                <option key={i} value={c.companyName}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div> 

          {/* Show add supplier form if Add Supplier selected */}
          {selectedSupplier === "" && (
            <div className="col-md-7">
              <form className="row g-2" onSubmit={handleAddSupplier}>
                <div className="col-md-5">
                  <select
                    className="form-select"
                    value={selectedBusinessCompany}
                    onChange={handleSelectBusinessCompany}
                    required
                  >
                    <option value="">Select Business Profile</option>
                    {businessProfiles.map((bp, i) => (
                      <option key={i} value={bp.companyName}>
                        {bp.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lot Number"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Advance Amount"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                    required
                    min={0}
                  />
                </div>
                <div className="col-md-1">
                  <button type="submit" className="btn btn-success w-100">
                    Add
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
                          min={0}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="pricePerTon"
                          className="form-control form-control-sm"
                          placeholder="Price/Ton"
                          value={container.pricePerTon}
                          onChange={handleContainerChange}
                          required
                          min={0}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={handleAddContainer}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Advance Form (Right) */}
              <div className="col-lg-4">
                <form onSubmit={handleAddAdvance}>
                  <div className="mb-2">
                    <label className="form-label fw-semibold">
                      Add Advance Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={newAdvance}
                      onChange={(e) => setNewAdvance(e.target.value)}
                      required
                      min={0}
                    />
                  </div>
                  <button className="btn btn-primary w-100">Add Advance</button>
                </form>
              </div>
            </div>

            {/* Display container and advance history in table */}
            <table className="table table-bordered">
              <thead className="table-secondary text-center">
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Total Paid</th>
                  <th>Remaining Balance</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mergedRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.type === "advance" ? "Advance" : "Container"}</td>
                    <td>{record.amount ?? record.totalAmount}</td>
                    <td>{record.totalPaidAfter ?? record.totalPaidAtThatTime}</td>
                    <td>
                      {record.remainingBalanceAfter ??
                        record.remainingBalanceAtThatTime}
                    </td>
                    <td>{formatDate(record.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default SupplierApp;
