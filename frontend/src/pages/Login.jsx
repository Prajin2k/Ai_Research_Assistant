import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';
import { loginUser } from "../services/authService";
export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = await loginUser(formData);

    console.log(data);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "userInfo",
      JSON.stringify(data.user)
    );

    toast.success("Login Successful");

    navigate("/dashboard");
    window.location.reload();
  } catch (error) {

    alert(error.response.data.message);
  }
};
  return (

    <div className="auth-wrapper d-flex align-items-center justify-content-center p-4">

      <div className="container">

        <div className="auth-card row overflow-hidden shadow-lg">

          {/* LEFT SIDE */}

          <div className="col-lg-6 left-side text-white p-5 d-flex flex-column justify-content-center">

            <div className="logo-box mb-4">
              <FaBrain />
            </div>

            <h1 className="brand-heading text-white mb-4">
              AI Research <br />
              <span>Assistant</span>
            </h1>

            <p className="brand-text fs-5">
              Upload study materials, generate summaries,
              quizzes, flashcards and learn smarter with AI.
            </p>

            <div className="glass-card p-4 mt-5 w-75">

              <h2 className="text-info fw-bold">
                AI Powered
              </h2>

              <p className="text-light mb-0">
                Your intelligent learning companion.
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-6 bg-dark text-white p-5 d-flex flex-column justify-content-center">

            <h2 className="fw-bold display-6 mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-secondary mb-5">
              Login to continue your AI learning journey.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-4">

                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

              <button
                type="submit"
                className="auth-btn w-100"
              >
                Login
              </button>

            </form>

            <p className="text-center text-secondary mt-4">

              Don’t have an account?

              <Link
                to="/register"
                className="text-decoration-none ms-2 text-info"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}