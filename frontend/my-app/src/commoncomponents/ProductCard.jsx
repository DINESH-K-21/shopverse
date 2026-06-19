import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100">
          <Heart size={18} />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-1">
          {product.title}
        </h2>

        <p className="text-gray-500 text-sm">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
          <span className="text-sm">{product.rating}</span>
          <span className="text-gray-400 text-sm">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>

          <span className="text-gray-400 line-through">
            ${product.originalPrice}
          </span>
        </div>

        {/* Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;