import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
// import { FaUpload } from "react-icons/fa"; // Import icon upload
import { FaFileUpload } from "react-icons/fa";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&i=&limit=10&page=1&sort=ASC`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setProducts(data.data.query);
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Error fetching data",
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

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/branded-things/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success delete",
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

      fetchData(); // Refresh data setelah berhasil dihapus
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Failed to delete data";

      Toastify({
        text: errorMessage,
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

  async function handleImageUpload(e, id) {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      console.log(formData);

      formData.append("file", file);

      try {
        await axios.patch(
          `${url}/apis/branded-things/products/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Toastify({
          text: "Image updated successfully",
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
        fetchData();
      } catch (error) {
        console.log(error);
        Toastify({
          text: "Error updating image",
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
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div
      className="m-0"
      //   style={{ backgroundColor: "#F1EEDC", minHeight: "100vh", padding: "0" }}
      style={{
        background: "url('../src/assets/background.png')",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="flex justify-center items-center my-8 px-10 pt-7"
        style={{ marginTop: "0" }}
      >
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md border border-black    focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <main className="px-10">
        <table className="min-w-full bg-transparent rounded-lg shadow-lg overflow-hidden table-fixed">
          <thead className="bg-transparent">
            <tr>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Name
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Image
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Price
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Stock
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Description
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-300">
                <td className="py-3 px-4 border border-gray-300 text-gray-800">
                  {product.name}
                </td>
                <td className="py-3 px-4 border border-gray-300 relative">
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-32 h-24 object-cover"
                  />
                  <div className="absolute top-1 right-1">
                    <label htmlFor={`file-upload-${product.id}`}>
                      <FaFileUpload className="cursor-pointer text-black hover:text-gray-900" />
                    </label>
                    <input
                      id={`file-upload-${product.id}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, product.id)}
                      // onClick={(e) => handleImageUpload}
                    />
                  </div>
                </td>
                <td className="py-3 px-4 border border-gray-300 text-gray-800">
                  {product.price}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-gray-800">
                  {product.stock}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-gray-800 relative">
                  <div className="truncate w-full overflow-hidden whitespace-normal">
                    {product.description.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </div>
                  {product.description.length > 100 && (
                    <div className="absolute inset-0 bg-white border border-gray-300 p-4 mt-1 ml-2 max-w-xs max-h-[200px] rounded-md shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 text-sm overflow-auto">
                      {product.description}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-gray-800">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to={`/edit/${product.id}`}
                      className="w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
