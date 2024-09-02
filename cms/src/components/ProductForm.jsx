import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Logo from "../assets/BrandedThings.png";

export default function ProductForm({ url, handleSubmit, products, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products) {
      setName(products.name);
      setDescription(products.description);
      setPrice(products.price);
      setStock(products.stock);
      setImgUrl(products.imgUrl);
      setCategoryId(products.categoryId);
    }
  }, [products]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      setCategories(data.data);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        style: {
          background: "#B3C8CF",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        gravity: "bottom",
        position: "right",
      }).showToast();
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="hero min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="object-cover w-full h-full absolute inset-0 z-0"
        style={{ opacity: 0.4 }}
      >
        <source src="your-video.mp4" type="video/mp4" />
      </video>
      <div className="bg-transparent p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        <div className="w-1/2 pr-4 flex items-center justify-center">
          <form
            onSubmit={(e) =>
              handleSubmit(
                e,
                name,
                description,
                price,
                stock,
                imgUrl,
                categoryId
              )
            }
            className="p-8 rounded-lg w-full max-w-sm bg-white p-6 lg:p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-sm bg-opacity-30"
          >
            <div className="mb-4 text-center">
              <label htmlFor="product-name" className="label-text">
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-description" className="label-text">
                Description
              </label>
              <textarea
                id="product-description"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-price" className="label-text">
                Price
              </label>
              <input
                type="number"
                id="product-price"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-stock" className="label-text">
                Stock
              </label>
              <input
                type="number"
                id="product-stock"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-imgUrl" className="label-text">
                Image URL
              </label>
              <input
                type="text"
                id="product-imgUrl"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
              />
            </div>

            <div className="mb-6 text-center">
              <label htmlFor="product-category" className="label-text">
                Categories
              </label>
              <select
                id="product-category"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
            >
              {nameProp}
            </button>
          </form>
        </div>

        <div className="w-1/2 pl-4 flex items-center justify-center">
          <img src={Logo} alt="Product" />
        </div>
      </div>
    </div>
  );
}
