import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in both fields.");
    } else if (password.length < 8) {
      setError("Password cannot be that short.");
    } else {
      setError("");
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          {
            username,
            password,
          },
          { withCredentials: true }
        );

        const { success, message } = response.data;

        if (success) {
          handleSuccess(message);
          console.log("Here");
          setTimeout(() => {
            navigate("/Apple");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        handleError("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;