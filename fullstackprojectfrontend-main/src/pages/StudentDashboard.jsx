import { useEffect, useState } from "react";
import API from "../api/axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8080/api/scholarships")
    .then(res => res.json())
    .then(data => setScholarships(data));
}, []);

  // 📄 Applications API
  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await API.get(`/applications/user/${user.id}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🎓 Scholarships API
  const fetchScholarships = async () => {
    try {
      const res = await API.get("/scholarships");
      setScholarships(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Stats
  const totalApplications = applications.length;
  const pending = applications.filter(a => a.status === "PENDING").length;
  const approved = applications.filter(a => a.status === "APPROVED").length;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <h1>Welcome Student 🎓</h1>
      <p className="subtitle">Your scholarship overview</p>

      {/* STATS */}
      <div className="stats">

        <div className="stat-card">
          <h3>Available Scholarships</h3>
          <span>{scholarships.length}</span>
        </div>

        <div className="stat-card">
          <h3>My Applications</h3>
          <span>{totalApplications}</span>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <span>{pending}</span>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <span>{approved}</span>
        </div>

      </div>
{scholarships.map(s => (
  <div key={s.id}>
    <h3>{s.title}</h3>
    <p>{s.description}</p>

    <button onClick={() => apply(s.id)}>
      Apply
    </button>
  </div>
))}
      {/* UPCOMING APPLICATIONS */}
      <div className="deadlines-card">

        <div className="deadlines-header">
          <h2>My Applications</h2>
        </div>

        {applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          applications.slice(0, 5).map((app) => (
            <div key={app.id} className="deadline-item">
              <div>
                <h4>{app.scholarshipName || `Scholarship ID: ${app.scholarshipId}`}</h4>
                <p>Status: {app.status}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default StudentDashboard;