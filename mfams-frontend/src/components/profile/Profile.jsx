import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [transactions, setTransactions] = useState([]);
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    axios.get("http://localhost:6060/api/transactions", {
      withCredentials: true
    }).then(res => setTransactions(res.data))
      .catch(err => console.error("Transaction fetch failed:", err));
  }, []);

  return (
    <div
      className="container py-5"
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(to right, #e96443, #904e95)",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <div className="text-center mb-5">
        <h2 className="fw-bold">👤 My Profile</h2>
        <p className="fs-5">Username: <strong>{username}</strong></p>
        <p className="fs-6">Role: <span className="badge bg-light text-dark">{role}</span></p>
      </div>

      <div className="card p-4 shadow" style={{ borderRadius: "1rem" }}>
        <h4 className="mb-4 text-dark">💼 Transaction History</h4>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>
                  <th>Fund ID</th>
                  <th>Units</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index}>
                    <td>{txn.type}</td>
                    <td>{txn.mutualFundId}</td>
                    <td>{txn.units}</td>
                    <td>₹{txn.amount}</td>
                    <td>{txn.transactionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
