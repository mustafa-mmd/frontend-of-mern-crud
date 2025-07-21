import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AutoContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("hasRegistered", "true"); // ensure hasRegistered is set

      setMessage("Login successful! Redirecting...");
      login();
      setRedirecting(true);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

        {message && (
          <div className="text-center text-sm text-red-600">{message}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={redirecting}
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={redirecting}
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={redirecting}
          className={`w-full text-white py-2 px-4 rounded-xl transition-all ${
            redirecting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {redirecting ? "Redirecting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
