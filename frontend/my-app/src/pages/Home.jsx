import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api/api.js"
import ProductPost from "./ProductPost.jsx";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../commoncomponents/NavBar.jsx";
import ProductCard from "../commoncomponents/ProductCard.jsx";
import { useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const { status, error, token ,user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProducts = async () => {
      try {
       const res = await api.get("/api/products/get-products");
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Navbar/>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Home;