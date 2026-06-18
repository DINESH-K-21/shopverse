import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api/api.js"
import ProductPost from "./ProductPost.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("api/products");
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <nav>
        <Link to="/products/add">+ Product</Link>
      
      </nav>
    </div>
  );
}

export default Home;