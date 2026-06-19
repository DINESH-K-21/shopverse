import React, { useState } from "react";
import { Menu, X, Home, User, Settings, LogOut, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Get user initials
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  // Get full name
  const getFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "User";
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: User },
    { name: "Cart", path: "/cart", icon: Settings },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium text-sm"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* User Profile Button */}
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 hover:border-teal-500 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials()}
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium">{getFullName()}</p>

                  </div>
                </button>

                {/* Add Product Button - Only for Superadmin */}
                {role === "superadmin" && (
                  <button
                    onClick={() => navigate("/products/add")}
                    className="text-white font-medium text-[14px] cursor-pointer hover:bg-slate-800 px-4 py-2 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Plus size={14} />
                    Add Product
                  </button>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-500 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-5 py-2 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-2xl font-semibold transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-700 py-4 bg-slate-900">
            <div className="flex flex-col gap-2 px-4">
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-slate-700 my-2" />

              {isLoggedIn ? (
                <>
                  {/* Mobile Profile Button */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl w-full text-left"
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </button>

                  {/* Mobile Add Product Button */}
                  {role === "superadmin" && (
                    <button
                      onClick={() => {
                        navigate("/products/add");
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl w-full text-left"
                    >
                      <Plus className="w-5 h-5" />
                      Add Product
                    </button>
                  )}

                  {/* Mobile Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-teal-500 text-white px-4 py-3 rounded-2xl font-semibold text-center mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}