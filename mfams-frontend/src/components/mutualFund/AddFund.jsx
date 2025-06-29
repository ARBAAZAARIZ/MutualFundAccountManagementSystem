import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function AddFund() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const csrfToken = sessionStorage.getItem("csrfToken"); // or localStorage.getItem()
    if (!csrfToken) {
      setMessage("❌ CSRF token not found. Please refresh or login again.");
      return;
    }

    const res = await axios.post(
      `http://localhost:6060/api/funds`,
      data,
      {
        headers: {
          "X-XSRF-TOKEN": csrfToken // 🔐 Attach the CSRF token
        },
        withCredentials: true // 🔐 Ensure session cookie is sent
      }
    );

      // Optional: redirect after a short delay
      setTimeout(() => navigate("/funds"), 1500);
    } catch (err) {
      setMessage("❌ Failed to add fund. Please try again.");
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
        <h2 className="text-center mb-4" style={{ color: "#904e95", fontWeight: "600" }}>
          ➕ Add New Fund
        </h2>

        {message && (
          <div className="alert alert-info text-center fw-semibold" role="alert">
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
              {...register("fundName", { required: "Fund Name is required" })}
            />
            {errors.fundName && <div className="invalid-feedback">{errors.fundName.message}</div>}
          </div>

          {/* Fund Code */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Fund Code</label>
            <input
              type="text"
              className={`form-control ${errors.fundCode ? 'is-invalid' : ''}`}
              {...register("fundCode", { required: "Fund Code is required" })}
            />
            {errors.fundCode && <div className="invalid-feedback">{errors.fundCode.message}</div>}
          </div>

          {/* NAV */}
          <div className="mb-3">
            <label className="form-label fw-semibold">NAV</label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.nav ? 'is-invalid' : ''}`}
              {...register("nav", { required: "NAV is required" })}
            />
            {errors.nav && <div className="invalid-feedback">{errors.nav.message}</div>}
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <input
              type="text"
              className={`form-control ${errors.category ? 'is-invalid' : ''}`}
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn fw-semibold"
              style={{
                background: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                color: "white",
                border: "none",
              }}
            >
              🚀 Submit Fund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
