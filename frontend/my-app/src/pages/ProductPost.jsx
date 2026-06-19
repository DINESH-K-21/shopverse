import React, { useState } from "react";
import { Plus, X, AlertCircle } from "lucide-react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ProductPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageInput, setImageInput] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    images: [],
    stock: "",
    rating: "",
    reviews: "",
    featured: false,
    discount: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput("");
      setError("");
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      formData.stock === ""
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : parseFloat(formData.price),
        category: formData.category,
        brand: formData.brand || "",
        images: formData.images,
        stock: parseInt(formData.stock),
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        reviews: formData.reviews ? parseInt(formData.reviews) : 0,
        featured: formData.featured,
        discount: formData.discount ? parseFloat(formData.discount) : 0,
      };

      const res = await api.post("/api/products/post-product", productData);

      if (res.data.success) {
        setSuccess(true);
        setFormData({
          title: "",
          description: "",
          price: "",
          originalPrice: "",
          category: "",
          brand: "",
          images: [],
          stock: "",
          rating: "",
          reviews: "",
          featured: false,
          discount: "",
        });

        setTimeout(() => {
          navigate("/products");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Beauty",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 sm:p-6 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Gradient Header */}
          <div className="relative h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></div>

          {/* Title */}
          <div className="text-white text-[28px] font-bold text-center pt-6 px-6">
            CREATE NEW PRODUCT
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mx-6 mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm font-semibold">
                ✓ Product created successfully! Redirecting...
              </p>
            </div>
          )}

          <form
            className="w-full flex flex-col gap-4 px-6 pb-6 pt-4"
            onSubmit={handleSubmit}
          >
            {/* Title & Brand Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Premium Wireless Headphones"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="e.g., Sony"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-white text-[14px] font-semibold block mb-2">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Detailed product description..."
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Price & Stock Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Price * ($)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  placeholder="0"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Stock * (#)
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="0"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Category & Rating Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  placeholder="0"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-white text-[14px] font-semibold block mb-2">
                  Reviews (#)
                </label>
                <input
                  type="number"
                  name="reviews"
                  placeholder="0"
                  min="0"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Images Section */}
            <div>
              <label className="text-white text-[14px] font-semibold block mb-2">
                Product Images (URLs)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="url"
                  placeholder="Paste image URL and click Add"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addImage()}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold flex items-center gap-2 transition"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {/* Image List */}
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                    >
                      <span className="text-slate-300 text-sm truncate">
                        {img}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="featured" className="text-white text-[14px] font-semibold cursor-pointer">
                Mark as Featured Product
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-lg text-white font-semibold bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition mt-4"
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}