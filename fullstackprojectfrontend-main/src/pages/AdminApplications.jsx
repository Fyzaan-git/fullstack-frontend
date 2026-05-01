import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Admin.css";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchApplications();
  }, []);

  // 📥 Fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  // 🔥 Filter logic
  const filteredApplications =
    filter === "ALL"
      ? applications
      : applications.filter(app => app.status === filter);

  // 🔄 Handle dropdown change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p className="subtitle">
            Review and manage student applications
          </p>
        </div>

        {/* FILTER */}
        <select className="filter" value={filter} onChange={handleFilterChange}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
        </select>
      </div>

      {/* CONTENT */}
      <div className="card">

        {filteredApplications.length === 0 ? (
          <p className="muted">No applications found.</p>
        ) : (
          filteredApplications.map((app) => (
            <div key={app.id} className="app-card">

              <div className="app-info">
                <h3>Student ID: {app.userId}</h3>
                <p>Scholarship ID: {app.scholarshipId}</p>
              </div>

              <div className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default AdminApplications;