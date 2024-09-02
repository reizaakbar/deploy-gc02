import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import Logo from "../assets/BrandedThings.png";

export default function Login({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${url}/apis/login`, { email, password });

      localStorage.setItem("access_token", data.data.access_token);
      navigate("/home");
      Toastify({
        text: "Success Login",
        duration: 2000,
        close: false,
        style: {
          background: "#B3C8CF",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        gravity: "bottom",
        position: "right",
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Gagal login",
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

  return (
    <div className="hero min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="object-cover w-full h-full absolute inset-0 z-0"
        style={{ opacity: 0.5 }}
      >
        <source src="your-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-content flex flex-col lg:flex-row items-center justify-center relative z-10 p-4 lg:p-0">
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:mr-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-black">
            Welcome to BrandedThings!
          </h1>
          <br />
          <h3 className="text-xl lg:text-2xl font-bold text-black">
            Please Login First!
          </h3>
          <p className="py-4 text-black">
            You need to login before accessing the Content Management System
            Page.
          </p>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-sm bg-opacity-30">
          <img src={Logo} alt="logo" className="pb-1 -mt-5 mx-auto" />
          <h2 className="text-gray-700 font-medium mb-5 text-center text-2xl">
            Login to your account
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label htmlFor="login-email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter email address ..."
                autoComplete="off"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="login-password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="login-password"
                placeholder="Enter your password ..."
                autoComplete="off"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
