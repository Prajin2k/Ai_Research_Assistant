import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';
import { registerUser } from "../services/authService";
export default function Register() {

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('student');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (role) => {

    setSelectedRole(role);

    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = await registerUser(formData);

    console.log(data);

    alert("Registration Successful");

    navigate("/login");

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
              Create notes, summaries, quizzes,
              flashcards and revise smarter.
            </p>

            <div className="glass-card p-4 mt-5 w-75">

              <h2 className="text-info fw-bold">
                Study Faster
              </h2>

              <p className="text-light mb-0">
                AI helps you understand concepts quickly.
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-6 bg-dark text-white p-5 d-flex flex-column justify-content-center">

            <h2 className="fw-bold display-6 mb-2">
              Create Account 🚀
            </h2>

            <p className="text-secondary mb-4">
              Start your AI-powered learning journey.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3">

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

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

              {/* ROLE SELECTION */}

              <div className="row g-3 mb-4">

                <div className="col-6">

                  <div
                    className={`role-box p-3 ${
                      selectedRole === 'student' ? 'active' : ''
                    }`}
                    onClick={() => handleRole('student')}
                  >

                    <h5>Student</h5>

                    <small className="text-secondary">
                      Access AI learning tools
                    </small>

                  </div>

                </div>

                <div className="col-6">

                  <div
                    className={`role-box p-3 ${
                      selectedRole === 'admin' ? 'active' : ''
                    }`}
                    onClick={() => handleRole('admin')}
                  >

                    <h5>Admin</h5>

                    <small className="text-secondary">
                      Manage platform analytics
                    </small>

                  </div>

                </div>

              </div>

              <button
                type="submit"
                className="auth-btn w-100"
              >
                Register
              </button>

            </form>

            <p className="text-center text-secondary mt-4">

              Already have an account?

              <Link
                to="/login"
                className="text-decoration-none ms-2 text-info"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}