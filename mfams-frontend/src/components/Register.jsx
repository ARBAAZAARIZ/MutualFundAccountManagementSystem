import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [message, setMessage] = useState("");

  const handleRegister = async (data) => {
    try {
      const response = await axios.post("http://localhost:6060/api/auth/register", {
        username: data.username,
        password: data.password,
        role: data.role
      });

      setMessage("✅ Registration successful! Please login.");
      reset(); // Clear form
    } catch (error) {
      const serverMsg = error.response?.data?.message || "❌ Registration failed. Please try again.";
      setMessage(serverMsg);
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
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px", borderRadius: "1rem" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 600, color: "#904e95" }}>
          📝 Register
        </h2>

        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(handleRegister)}>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            <div className="form-text">We'll never share your password.</div>
          </div>

          {/* Role */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-semibold">Role</label>
            <select
              id="role"
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              defaultValue="USER"
              {...register("role", { required: "Role is required" })}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary fw-semibold">
              Register 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
