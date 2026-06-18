import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert('Login successful!');
        setEmail('');
        setPassword('');
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">

        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          

          <div className="relative h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></div>
          
          <div className="p-8 sm:p-10">
            
  
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
               
              </div>
              <p className="text-slate-400 text-sm font-medium">Welcome back to your workspace</p>
            </div>


          

          
            <button
              type="button"
              className="w-full border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-200 font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Create account
            </button>

        
          
          </div>
        </div>

      </div>
    </div>
  );
}