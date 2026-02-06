import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      key={data._id}
      className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
            {data.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col grow p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {data.title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-6 grow">
          {data.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <span className="text-2xl font-black text-gray-900">
              ${data.price}
            </span>
          </div>
          <button
            onClick={() => navigate(`/product/${data._id}`)}
            className="flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-xl transition-all hover:bg-indigo-600 active:scale-95 focus:ring-4 focus:ring-indigo-100"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
