import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
  fetch("http://localhost:8080/api/dashboard/1")
    .then(res => res.json())
    .then(data => {
      setStats(data);
    });
}, []);
  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">

      <h1>Admin Dashboard 🧑‍💼</h1>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Scholarships</h3>
          <span>{stats.totalScholarships}</span>
        </div>

        <div className="stat-card">
          <h3>Total Applications</h3>
          <span>{stats.totalApplications}</span>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <span>{stats.pending}</span>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <span>{stats.approved}</span>
        </div>

        <div className="stat-card">
          <h3>Total Funds</h3>
          <span>₹{stats.funds}</span>
        </div>
<h3>{stats.scholarships}</h3>
<h3>{stats.applications}</h3>
<h3>{stats.pending}</h3>
<h3>{stats.approved}</h3>
      </div>

    </div>
  );
};

export default AdminDashboard;