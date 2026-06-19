import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Save, X, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    dateOfBirth: "",
    bio: "",
  });

  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    // Load user data when component mounts
    if (user) {
      const userData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        dateOfBirth: user.dateOfBirth || "",
        bio: user.bio || "",
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
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError("Please fill in all required fields (First Name, Last Name, Email)");
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
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <Mail size={16} /> Email *
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

                {/* Phone */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <Phone size={16} /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="text-slate-300 text-sm font-semibold block mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h2 className="text-white text-lg font-bold mb-6">Address Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="text-slate-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                    <MapPin size={16} /> Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="text-slate-300 text-sm font-semibold block mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
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