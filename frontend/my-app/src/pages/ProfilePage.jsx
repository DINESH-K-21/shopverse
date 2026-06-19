import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Save, X, Mail, Phone, MapPin, Calendar , Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log(user,"jj");
  
  const role = user?.role

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword:"",
    newPassword:""
  });

  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    // Load user data when component mounts
    if (user) {
      const userData = {
        name: user.name || "",
        email: user.email || "",
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!formData.name || !formData.email) {
        setError("Please fill in all required fields (Name, Email)");
        setLoading(false);
        return;
      }

      const response = await api.put("/api/users/profile", formData);

      if (response.data.success) {
        setSuccess("Profile updated successfully!");
        setOriginalData(formData);
        setIsEditing(false);
        
        // Update Redux store with new user data
        // You might need to dispatch an action here depending on your setup
        
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        setLoading(true);
        const response = await api.delete("/api/users/profile");

        if (response.data.success) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete profile");
        setLoading(false);
      }
    }
  };

  const fullName = `${user?.firstName || "User"} ${user?.lastName || ""}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-teal-500 hover:text-teal-400 font-semibold mb-6 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Main Container */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Gradient Header */}
          <div className="relative h-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></div>

          {/* Profile Header Section */}
          <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {(user?.firstName?.[0] || "U").toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">{fullName}</h1>
                <p className="text-slate-400 text-sm">@{user?.username || "user"}</p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition cursor-pointer"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Alerts */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm font-semibold">✓ {success}</p>
            </div>
          )}

          {/* Profile Form */}
          <form className="px-6 sm:px-8 py-8">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-white text-lg font-bold mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2">
                    Name 
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

               

                {/* Email */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <Mail size={16} /> Email 
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* current password */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <Key size={16} /> Current Password 
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* new password */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <Key size={16} /> New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

              </div>

             
            </div>

          
            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 justify-end border-t border-slate-700 pt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition cursor-pointer"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition disabled:cursor-not-allowed cursor-pointer"
                >
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {!isEditing && role === "superadmin" && (
              <div className="border-t border-slate-700 pt-8">
                <button
                  type="button"
                  onClick={handleDeleteProfile}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition cursor-pointer"
                >
                  Delete Profile
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}