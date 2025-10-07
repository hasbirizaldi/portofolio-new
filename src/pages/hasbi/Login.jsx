import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assetsImg } from "../../assets/img/assets";
import { useTheme } from "../../contexts/ThemeContext";
import { FaUserAlt, FaLock } from "react-icons/fa";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", form);

      const { token, user } = response.data;

      // Simpan token & user ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/hasbi");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login gagal");
      } else {
        setError("Tidak dapat terhubung ke server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf1e6] dark:bg-slate-900 transition-colors duration-300 px-4">
      <div className="bg-[#fff9f3] dark:bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#cba47a]/40 dark:border-slate-700 transition-all duration-300">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={theme === "dark" ? assetsImg.img_logo1 : assetsImg.img_logo2} alt="Logo" className="w-24 mb-2 drop-shadow-md" />
          <h1 className="text-2xl font-bold text-[#4b2e07] dark:text-cyan-400">Admin Login</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-600 dark:text-slate-200 mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#cba47a]/40 dark:border-slate-700 bg-[#fffaf5] dark:bg-slate-900 focus:ring-2 text-slate-950 dark:text-slate-50 focus:ring-[#cba47a] dark:focus:ring-cyan-500 outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-200 mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border text-slate-950 dark:text-slate-50 border-[#cba47a]/40 dark:border-slate-700 bg-[#fffaf5] dark:bg-slate-900 focus:ring-2 focus:ring-[#cba47a] dark:focus:ring-cyan-500 outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-[#9b6a42] dark:bg-cyan-700 cursor-not-allowed" : "bg-[#724017] dark:bg-cyan-600 hover:scale-[1.02]"} text-white font-semibold py-2 rounded-lg transition-all duration-200`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-5">&copy; {new Date().getFullYear()} Hasbi Admin Panel</p>
      </div>
    </div>
  );
};

export default Login;
