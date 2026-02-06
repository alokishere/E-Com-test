import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import { toast } from "react-toastify";
import instance from "../api/AxiosConfig";
const Products = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    instance
      .get("/api/product/getallproducts")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products");
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-gray-900">Our Products</h1>
        {user?.isAdmin && (
          <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm">
            Admin View
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
