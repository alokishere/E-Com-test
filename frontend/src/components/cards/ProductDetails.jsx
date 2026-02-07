import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/AxiosConfig";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    instance
      .get(`/api/product/getproductbyid/${_id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.product);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products");
      });
  }, [_id]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const navigate = useNavigate();

  const addToCartHanderler = () => {
    if (!user) {
      toast.error("Please login to add products to cart");
      navigate("/login");
      return;
    }

   // Check if product already in cart for this user
    instance
      .post(`/api/cart/get`,{
        userId:user.id,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          // Product already in cart, update quantity
    toast.success("Product already in cart");
          const cartItem = response.data[0];
          instance
            .patch(`/api/cart/${cartItem.id}`, {
              quantity: cartItem.quantity + 1,
            })
            .then(() => {
              toast.success("Product quantity updated in cart!");
            });
        } else {
          // Product not in cart, add new item
          instance
            .post("/api/cart", {
              productId: data._id,
              userId: user.id,
              title: data.title,
              price: data.price,
              image: data.image,
              quantity: 1,
            })
            .then(() => {
              toast.success("Product added to cart successfully!");
            });
        }
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast.error("Error adding product to cart");
      });
  };

  useEffect(() => {
    if (data) {
      setFormData({
        id: data._id,
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.put(
        `/api/product/updateproduct/${_id}`,
        formData,
      );

      const updatedProduct = res.data.product;

      setData(updatedProduct);

      setIsEditing(false);
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Error updating product");
    }
  };

  if (!data) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        <div>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2">
            {data.category}
          </span>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            {data.title}
          </h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {data.description}
          </p>
          <div className="flex items-center justify-between mb-8">
            <span className="text-3xl font-black text-gray-900">
              ${data.price}
            </span>
            <button
              onClick={() => addToCartHanderler()}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {user?.isAdmin && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? "Cancel Edit" : "Edit Product"}
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-10 bg-gray-50 p-8 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Edit Product Details</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
