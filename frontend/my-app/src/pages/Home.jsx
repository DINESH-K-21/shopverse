import axios from "axios";
import { useEffect, useState } from "react";
import { api, productApi } from "../api/api.js";

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
       const res = await productApi.get("/api/products/get-products");
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
      
      <div className="flex flex-wrap gap-10 p-7">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div  className="flex items-center justify-center w-full h-screen">No products found...</div>
        )}
      </div>
    </div>
  );
}

export default Home;