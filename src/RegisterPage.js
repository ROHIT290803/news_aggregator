import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!isValidEmail(email)) {
      setError("Invalid email address.");
    } else if (!isValidUsername(username)) {
      setError("Username can only contain letters, numbers, and underscores.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/signup",
          {
            username,
            email,
            password,
          },
          { withCredentials: true }
        );
        console.log("Response Data:", response.data);
          if (response.data.success) {
            handleSuccess("Registration successful.");
            setTimeout(() => {
              navigate("/Apple");
            }, 1000);
          } else {
            handleError("An error occurred while registering.");
          }
        }
        catch (error) {
        if (error.response) {
          console.log("Error response:", error.response);
          const errorMessage = error.response.data.message;
          handleError(errorMessage);
        } else {
          handleError("An error occurred while registering.");
        }
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };
  const isValidUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username);
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Register</h2>
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;