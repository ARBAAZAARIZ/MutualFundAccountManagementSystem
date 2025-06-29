import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function BuySell() {
  const { fundId, type } = useParams(); // Get type and fundId from URL
  const navigate = useNavigate();

  const [fund, setFund] = useState(null);
  const [navTotal, setNavTotal] = useState(0);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      units: 1
    }
  });

  const units = watch("units");

  // Fetch fund info by ID
  useEffect(() => {
    axios.get(`http://localhost:6060/api/funds/${fundId}`).then(res => {
      setFund(res.data);
      setValue("units", 1); // default units
      setNavTotal(res.data.nav);
    });
  }, [fundId]);

  useEffect(() => {
    if (fund) {
      const total = parseFloat(units || 0) * fund.nav;
      setNavTotal(total.toFixed(2));
    }
  }, [units, fund]);

  const onSubmit = async (data) => {
    const csrfToken = sessionStorage.getItem("csrfToken");
    if (!csrfToken) {
      alert("❌ CSRF token not found. Please refresh or login again.");
      return;
    }

    try {
      await axios.post(`http://localhost:6060/api/transactions/${type.toLowerCase()}`, {
        mutualFundId: fund.id,
        units: parseFloat(data.units)
      }, {
        headers: {
          "X-XSRF-TOKEN": csrfToken
        },
        withCredentials: true
      });

      setMessage(`✅ ${type} successful!`);
      setTimeout(() => navigate("/funds"), 1500);
    } catch (err) {
      setMessage("❌ Transaction failed.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e96443, #904e95)",
        fontFamily: "Poppins, sans-serif",
        padding: "2rem"
      }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4" style={{ color: "#904e95", fontWeight: 600 }}>
          {type === "SELL" ? "💼 Sell Mutual Fund" : "🛒 Buy Mutual Fund"}
        </h3>

        {message && (
          <div className="alert alert-info text-center fw-semibold">{message}</div>
        )}

        {fund ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Fund Name</label>
              <input className="form-control" value={fund.fundName} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input className="form-control" value={fund.category} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">NAV</label>
              <input className="form-control" value={fund.nav} disabled />
            </div>

            {/* Units input */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Units</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${errors.units ? "is-invalid" : ""}`}
                {...register("units", {
                  required: "Units are required",
                  min: { value: 0.01, message: "Minimum 0.01 units" }
                })}
              />
              {errors.units && <div className="invalid-feedback">{errors.units.message}</div>}
            </div>

            {/* Total Amount */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Total Amount</label>
              <input className="form-control" value={`₹${navTotal}`} disabled />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn fw-semibold"
                style={{
                  background: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                  color: "white",
                  border: "none"
                }}
              >
                {type === "SELL" ? "Sell Now 🔄" : "Buy Now 🚀"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center">⏳ Loading fund data...</p>
        )}
      </div>
    </div>
  );
}
