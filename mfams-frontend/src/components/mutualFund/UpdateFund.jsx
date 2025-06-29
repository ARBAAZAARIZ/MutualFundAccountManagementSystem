import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function UpdateFund() {
  const { id } = useParams(); // get fund ID from URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  // Fetch fund details on mount
  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await axios.get(`http://localhost:6060/api/funds/${id}`);
        const fund = res.data;
        // Set default values in form
        setValue("fundName", fund.fundName);
        setValue("fundCode", fund.fundCode);
        setValue("category", fund.category);
        setValue("nav", fund.nav);
        setValue("lastUpdatedDate", fund.lastUpdatedDate);
      } catch (err) {
        console.error("Failed to load fund details:", err);
        setMessage("❌ Failed to load fund details.");
      }
    };
    fetchFund();
  }, [id, setValue]);

  // Handle update submit
const onSubmit = async (data) => {
  try {
    const csrfToken = sessionStorage.getItem("csrfToken"); // or localStorage.getItem()
    if (!csrfToken) {
      setMessage("❌ CSRF token not found. Please refresh or login again.");
      return;
    }

    const res = await axios.put(
      `http://localhost:6060/api/funds/${id}`,
      data,
      {
        headers: {
          "X-XSRF-TOKEN": csrfToken // 🔐 Attach the CSRF token
        },
        withCredentials: true // 🔐 Ensure session cookie is sent
      }
    );

    if (res.status === 200) {
      setMessage("✅ Fund updated successfully!");
      setTimeout(() => navigate("/funds"), 1500);
    }
  } catch (err) {
    console.error("Update failed:", err);
    setMessage("❌ Update failed. Please try again.");
  }
};



  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #e96443, #904e95)",
        fontFamily: "Poppins, sans-serif",
        padding: "2rem"
      }}
    >
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "600px", borderRadius: "1rem" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 600, color: "#904e95" }}>
          ✏️ Update Fund
        </h2>

        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Fund Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Fund Name</label>
            <input
              type="text"
              className={`form-control ${errors.fundName ? 'is-invalid' : ''}`}
              {...register("fundName", { required: "Fund name is required" })}
            />
            {errors.fundName && <div className="invalid-feedback">{errors.fundName.message}</div>}
          </div>

          {/* Fund Code */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Fund Code</label>
            <input
              type="text"
              className={`form-control ${errors.fundCode ? 'is-invalid' : ''}`}
              {...register("fundCode", { required: "Fund code is required" })}
            />
            {errors.fundCode && <div className="invalid-feedback">{errors.fundCode.message}</div>}
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <input
              type="text"
              className="form-control"
              {...register("category")}
            />
          </div>

          {/* NAV */}
          <div className="mb-3">
            <label className="form-label fw-semibold">NAV</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              {...register("nav")}
            />
          </div>

          {/* Last Updated Date
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Updated Date</label>
            <input
              type="date"
              className="form-control"
              {...register("lastUpdatedDate")}
            />
          </div> */}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary fw-semibold">
              Update Fund 🔄
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
