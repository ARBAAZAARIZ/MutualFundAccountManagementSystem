import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const isAuthenticated = !!username;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:6060/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: 'linear-gradient(135deg, #e96443, #904e95)',
        paddingTop: '1.4rem',
        paddingBottom: '1.4rem',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
    >
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link
          className="navbar-brand text-white"
          to="/"
          style={{
            fontSize: '2.3rem',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Fundify Vault 💰
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-2" style={{ fontSize: '1.1rem' }}>
            {/* See All Funds Button */}
            <li className="nav-item">
              <Link
                to="/funds"
                className="btn text-white fw-semibold"
                style={{
                  background: 'linear-gradient(90deg, #ff5f6d, #ffc371)',
                  border: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                💼 See All Funds
              </Link>
            </li>

            {/* Auth Section */}
            {isAuthenticated ? (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <div
                  className="nav-link text-white d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <i className="bi bi-person-circle fs-3 me-2"></i>
                  <span className="d-none d-sm-inline">Hi, {username}</span>
                </div>

                {dropdownOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-end show mt-2"
                    style={{
                      minWidth: '220px',
                      right: '0',
                      left: 'auto',
                      position: 'absolute',
                      zIndex: '1000'
                    }}
                  >
                    <div className="px-3 py-2">
                      <strong>{username}</strong><br />
                      <small className="text-muted">Role: {role}</small>
                    </div>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/profile">👤 View Profile</Link>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
