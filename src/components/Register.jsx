import { useState } from "react";
import api from "../services/api";

function Register({ onLogin, showToast, switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);
      const userData = response.data.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      onLogin(userData);
      showToast("Account created successfully", "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Registration failed",
        "error",
      );
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password minimum 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <button className="link-btn" onClick={switchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
