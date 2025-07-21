import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    job: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/register", formData);
      setMessage("Registration successful. Redirecting to login...");
      localStorage.setItem("hasRegistered", "true");
      setRedirecting(true);
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message;
      if (errorMsg === "Email already registered") {
        setMessage("You are already registered. Redirecting to login...");
        localStorage.setItem("hasRegistered", "true");
        setRedirecting(true);
        navigate("/login");
      } else {
        setMessage(errorMsg || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Register
        </h2>

        {message && (
          <div className="text-center text-sm text-red-600">{message}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            disabled={redirecting}
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
        </div>

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
            Job Title
          </label>
          <input
            type="text"
            name="job"
            value={formData.job}
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
            redirecting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {redirecting ? "Redirecting..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;

