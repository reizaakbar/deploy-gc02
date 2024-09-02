import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";

export default function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 navbar bg-white shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 z-10">
      <div className="flex-1 px-2">
        <Link
          to="/home"
          className="text-xl font-bold text-gray-800 hover:text-white hover:rounded hover:bg-[#B3C8CF]"
        >
          <span className="btn bg-transparent text-black text-xl hover:bg-black border border-black hover:text-white">
            BrandedThings.
          </span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 text-yellow-600 w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
            >
              <TiThMenu className="cursor-pointer text-black hover:text-white" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-transparent border-black rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link to="/add-user" className="flex items-stretch">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/add" className="flex items-stretch">
                  <span>Product</span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="flex items-stretch">
                  <span>Category</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
