import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api/api.js"

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
      {products.map((product) => (
        <h2 key={product._id}>{product.title}</h2>
      ))}
    </div>
  );
}

export default Home;