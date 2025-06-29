import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FundList() {
    const role = sessionStorage.getItem("role");
    const [funds, setFunds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFunds = async () => {
            const res = await axios.get("http://localhost:6060/api/funds");
            if (res.status === 200) {
                setFunds(res.data);
            }
        };
        fetchFunds();
    }, []);

    const handleUpdate = (id) => navigate(`/update-fund/${id}`);
    const handleDelete = async (id) => {
        try {

            const csrfToken = sessionStorage.getItem("csrfToken"); // or localStorage.getItem()
            if (!csrfToken) {
                alert("❌ CSRF token not found. Please refresh or login again.");
                return;
            }

            const res = await axios.delete(`http://localhost:6060/api/funds/${id}`, {
                headers: {
                    "X-XSRF-TOKEN": csrfToken // 🔐 Attach the CSRF token
                },
                withCredentials: true // 🔐 Ensure session cookie is sent
            });

            if (res.status === 200) {
                setFunds(funds.filter(fund => fund.id !== id));
                alert("✅ Fund deleted successfully!");
            }

        } catch (err) {
            console.error("Delete failed:", err);
            alert("❌ Failed to delete fund. Please try again.");
        }
    }

   const handleBuySell = (type, fundId)=>{
        navigate(`/buy-sell/${type}/${fundId}`);
    }

    return (
        <div
            style={{
                fontFamily: "Poppins, sans-serif",
                minHeight: "100vh",
                background: "linear-gradient(to right, #e96443, #904e95)",
                padding: "2rem 1rem"
            }}
        >
            <div className="container">
                <div className="text-center text-white mb-4">
                    <h2 className="fw-bold">📊 Mutual Fund List</h2>
                    <p>Explore the latest available funds with NAVs and categories</p>
                </div>

                {/* Add Button for ADMIN */}
                {role === "ADMIN" && (
                    <div className="d-flex justify-content-end mb-4">
                        <button
                            className="btn fw-semibold"
                            onClick={() => navigate("/add-fund")}
                            style={{
                                background: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                                color: "white",
                                border: "none",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            }}
                        >
                            ➕ Add New Fund
                        </button>
                    </div>
                )}

                {/* Fund Cards */}
                <div className="row">
                    {funds.map((fund) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={fund.id}>
                            <div
                                className="card h-100 shadow"
                                style={{ borderRadius: "1rem", overflow: "hidden" }}
                            >
                                <div
                                    className="card-header text-white"
                                    style={{
                                        background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                                        fontWeight: "600",
                                    }}
                                >
                                    {fund.fundName}
                                </div>
                                <div className="card-body">
                                    <p><strong>Fund Code:</strong> {fund.fundCode}</p>
                                    <p><strong>Category:</strong> {fund.category}</p>
                                    <p><strong>NAV:</strong> ₹{fund.nav}</p>
                                    <p><strong>Last Updated:</strong> {fund.lastUpdatedDate}</p>
                                </div>

                                <div className="card-footer d-flex flex-wrap gap-2">
                                    {role === "ADMIN" && (
                                        <>
                                            <button
                                                className="btn btn-warning flex-fill"
                                                onClick={() => handleUpdate(fund.id)}
                                            >
                                                ✏️ Update
                                            </button>
                                            <button
                                                className="btn btn-danger flex-fill"
                                                onClick={() => handleDelete(fund.id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </>
                                    )}

                                    {/* Buy and Sell Buttons (For All Authenticated Users) */}
                                    <button
                                        className="btn btn-success flex-fill"
                                        onClick={() => handleBuySell(`BUY`,fund.id)}
                                    >
                                        🛒 Buy
                                    </button>

                                    <button
                                        className="btn btn-secondary flex-fill"
                                        onClick={() =>handleBuySell(`SELL`,fund.id)}
                                    >
                                        💼 Sell
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
