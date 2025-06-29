import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Hero Section */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1612832021024-d97cd21a106b?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          color: "white",
          overflow: "hidden"
        }}
      >
        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to right, rgba(233, 100, 67, 0.85), rgba(144, 78, 149, 0.85))",
            zIndex: 1
          }}
        ></div>

        {/* Floating Circles */}
        <ul className="circles">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>

        {/* Hero Content */}
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center px-3"
          style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
        >
          <h1 className="fw-bold display-4 mb-3">
            Welcome to <span style={{ color: "#ffda77" }}>Fundify Vault</span> 🏦
          </h1>
          <p className="fs-5 mb-4" style={{ maxWidth: "700px" }}>
            A trusted place to invest in top-performing mutual funds. Track NAVs, buy/sell units, and grow your wealth with confidence.
          </p>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <Link to="/funds" className="btn btn-light fw-semibold shadow">🚀 Explore Funds</Link>
            <Link to="/login" className="btn btn-outline-light fw-semibold shadow">🔐 Login</Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-4">📈 Why Choose Fundify Vault?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 shadow-sm rounded bg-light h-100">
              <h5>🔍 Real-Time NAV Insights</h5>
              <p>Stay up-to-date with the latest NAV values of your favorite mutual funds.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 shadow-sm rounded bg-light h-100">
              <h5>📊 Transaction History</h5>
              <p>Instant access to your buy/sell records through a clear, user-friendly profile.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 shadow-sm rounded bg-light h-100">
              <h5>🔐 Secure Investment</h5>
              <p>Backed by session-based Spring Security & CSRF protection for your safety.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Circles CSS */}
      <style>{`
        .circles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .circles li {
          position: absolute;
          display: block;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
          animation: float 25s linear infinite;
          bottom: -150px;
          border-radius: 50%;
        }
        .circles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-duration: 22s; }
        .circles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-duration: 18s; animation-delay: 2s; }
        .circles li:nth-child(3) { left: 70%; width: 30px; height: 30px; animation-duration: 20s; }
        .circles li:nth-child(4) { left: 40%; width: 50px; height: 50px; animation-duration: 17s; animation-delay: 5s; }
        .circles li:nth-child(5) { left: 65%; width: 60px; height: 60px; animation-duration: 23s; animation-delay: 3s; }
        .circles li:nth-child(6) { left: 75%; width: 15px; height: 15px; animation-duration: 20s; animation-delay: 2s; }
        .circles li:nth-child(7) { left: 35%; width: 45px; height: 45px; animation-duration: 19s; }
        .circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-duration: 22s; }
        .circles li:nth-child(9) { left: 20%; width: 35px; height: 35px; animation-duration: 25s; }
        .circles li:nth-child(10) { left: 90%; width: 60px; height: 60px; animation-duration: 26s; animation-delay: 1s; }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
