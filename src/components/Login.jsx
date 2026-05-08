import { useState } from "react";
import api from "../services/api";

function Login({ onLogin, showToast, switchToRegister }) {
  const [formData, setFormData] = useState({
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
      const response = await api.post("/auth/login", formData);
      const userData = response.data.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      onLogin(userData);
      showToast("Login successful", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don&apos;t have an account?{" "}
        <button className="link-btn" onClick={switchToRegister}>
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
