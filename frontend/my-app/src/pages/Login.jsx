import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LineStyle } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      console.log("Success:", res.data);
      navigate("/");
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 w-full h-auto">
          <div className="relative h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></div>

          <div className="text-white text-[24px] font-bold text-center mt-1">
            SIGN IN
          </div>

          <form
            className="w-full flex flex-col gap-4 px-6 pb-6 pt-3"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="text-white text-[14px] font-semibold"
              >
                Email
              </label>

              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-white text-[14px] font-semibold"
              >
                Password
              </label>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
              />
            </div>
            <div>
              <span className="text-white text-[14px] font-semibold">
                doesn't Signed yet ?
              </span>{" "}
              <Link
                to="/signup"
                className="text-teal-500 text-[14px] font-semibold ml-1"
              >
                Sign Up
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-2 rounded-lg text-white font-semibold focus:ring-teal-500 bg-teal-500 hover:bg-teal-600 cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
