import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Card from "../components/Card";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&limit=${itemsPerPage}&page=${page}&sort=${sortOrder}&column=${sortColumn}`
      );
      setProducts(data.data.query);
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Failed to fetch data",
        duration: 2000,
        close: true,
        style: {
          background: "#B3C8CF",
          color: "#17202A",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
          fontWeight: "bold",
        },
        position: "right",
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [search, sortColumn, sortOrder, page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div
      className="bg-white min-h-screen mt-20"
      style={{ background: "url('../src/assets/background.png" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center my-8 px-4 sm:px-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md border border-black bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent w-full sm:w-1/3 mb-4 sm:mb-0"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sortColumn" className="text-gray-700">
            Sort By:
          </label>
          <select
            id="sortColumn"
            className="px-3 py-2 border border-black bg-transparent rounded-md"
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="date">Date</option>
          </select>

          <select
            id="sortOrder"
            className="px-3 py-2 border border-black bg-tranparent rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-32">
          <ClipLoader color={"#2A1C16"} loading={loading} size={100} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6 mb-3">
        <button
          className="px-4 py-2 bg-transparent text-black border border-black rounded-md mx-2 disabled:opacity-50 
          hover:bg-black border border-black hover:text-white"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          className="px-4 py-2 bg-tranparent text-black border border-black rounded-md mx-2 disabled:opacity-50 hover:bg-black border border-black hover:text-white"
          onClick={handleNextPage}
          disabled={products.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
