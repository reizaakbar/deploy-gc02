import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  return (
    <div className="bg-transparent p-6 lg:p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-sm bg-opacity-30">
      <figure className="flex-grow">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
        <p className="text-gray-600"> Harga: Rp{product.price}</p>
        <div className="mt-auto">
          <button
            className="w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
            onClick={() => handleClick(product.id)}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
