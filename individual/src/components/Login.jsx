import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import React from "react";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Logging in with:", data);

    axios
      .post(`${API.BASE_URL}/api/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Log the entire response to inspect the structure
        console.log("Login Response:", response.data.data.access_token);

        // Check if access_token exists inside response.data
        if (response.data && response.data.data.access_token) {
          console.log("Access Token:", response.data.data.access_token);
          localStorage.setItem("token", response.data.data.access_token); // ✅ Store Token
          navigate("/dashboard"); // ✅ Redirect to Dashboard
        } else {
          alert("Login failed! Check credentials.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Error logging in. Please try again.");
      });

    reset();
  };
  return (
    <div
      className="container-fluid vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-transparent border-0 text-center py-4">
              <h2
                className="text-uppercase font-weight-bold"
                style={{ color: "#667eea" }}
              >
                Welcome Back
              </h2>
              <p className="text-muted">Please login to your account</p>
            </div>
            <div className="card-body px-5 py-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-muted">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-muted">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill py-2 text-uppercase fw-bold"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer bg-transparent border-0 text-center py-3">
              <p className="text-muted">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
