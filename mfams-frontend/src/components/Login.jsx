import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await axios.get("http://localhost:6060/api/auth/csrf-token", {
          withCredentials: true
        });
        setCsrfToken(res.data.token); // Store the token in state
        sessionStorage.setItem("csrfToken", res.data.token); // (optional)
        // console.log("CSRF Token fetched successfully:", res.data.token); 
        console.log("CSRF Token fetched successfully:",sessionStorage.getItem("csrfToken"));
      } catch (err) {
        console.error("Failed to fetch CSRF token", err);
      }
    };

    fetchCsrfToken();
  }, []);

  const onSubmit = async (data) => {
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:6060/api/auth/login", data, {
        headers: {
          "X-XSRF-TOKEN": csrfToken // 🔐 Attach CSRF token
        },
        withCredentials: true // 🔐 Important: Send cookies (JSESSIONID)
      });

      const { username, role } = response.data;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", role);

      navigate("/");
      window.location.reload();
    } catch (error) {
      const errMsg = error.response?.data?.message || "❌ Login failed. Please try again.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
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
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 600, color: "#904e95" }}>
          🔐 Login
        </h2>

        {message && (
          <div className="alert alert-danger text-center" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary fw-semibold" disabled={loading}>
              {loading ? "Logging in..." : "Login 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
