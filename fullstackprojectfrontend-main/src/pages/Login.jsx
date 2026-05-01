import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data);

      // store token safely (only if exists)
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("user", JSON.stringify(res.data));

      // role-based navigation (from backend response)
      const userRole = res.data?.role;

      if (userRole === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      alert("Login Failed ❌ Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">

      <div className="logo-section">
        <div className="logo-icon">🎓</div>
        <h1>ScholarTrack</h1>
        <p>Scholarship & Financial Aid Manager</p>
      </div>

      <div className="login-card">
        <h2>Sign In</h2>

        {/* ROLE TOGGLE (UI ONLY - not sent to backend) */}
        <div className="role-select">
          <button
            type="button"
            className={role === "STUDENT" ? "active" : ""}
            onClick={() => setRole("STUDENT")}
          >
            Student
          </button>

          <button
            type="button"
            className={role === "ADMIN" ? "active" : ""}
            onClick={() => setRole("ADMIN")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;