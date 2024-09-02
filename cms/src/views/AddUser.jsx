import React, { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/BrandedThings.png";

const AddUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassowrd = (e) => setPassword(e.target.value);
  const handleSetUsername = (e) => setUsername(e.target.value);
  const handleSetPhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleSetAddress = (e) => setAddress(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://h8-phase2-gc.vercel.app/apis/add-user`,
        {
          email,
          password,
          username,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Toastify({
        text: `Success Create User ${username}`,
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
      navigate("/home");
    } catch (error) {
      Toastify({
        text: `${error.response.data.message}`,
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
  };

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
            Ayo, daftar sekarang!
          </h1>
          <br />
          <h3 className="text-xl lg:text-2xl font-bold text-black">
            Buat akun dan mulai jelajahi layanan kami tanpa batas!
          </h3>
          <p className="py-4 text-black">
            "Bergabunglah bersama kami dan nikmati berbagai keuntungan
            eksklusif!"
          </p>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-sm bg-opacity-30">
          <img src={Logo} alt="logo" className="pb-1 -mt-5 mx-auto" />
          <h2 className="text-black font-medium mb-5 text-center text-2xl">
            Please register first
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="register-email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="register-email"
                value={email}
                onChange={handleSetEmail}
                placeholder="Enter email address ..."
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
              />
            </div>
            <div className="mb-4 text-center">
              <label htmlFor="register-password" className="label">
                <span className=" label-text">Password</span>
              </label>
              <input
                type="password"
                id="register-password"
                value={password}
                onChange={handleSetPassowrd}
                placeholder="Enter your password ..."
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
              />
            </div>
            <div className="mb-4 text-center">
              <label htmlFor="register-username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="register-username"
                value={username}
                onChange={handleSetUsername}
                placeholder="Enter your username ..."
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
              />
            </div>
            <div className="mb-4 text-center">
              <label htmlFor="register-phone" className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                id="register-phone"
                value={phoneNumber}
                onChange={handleSetPhoneNumber}
                placeholder="Enter your phone number ..."
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
              />
            </div>
            <div className="mb-6 text-center">
              <label htmlFor="register-address" className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                id="register-address"
                value={address}
                onChange={handleSetAddress}
                placeholder="Enter your address ..."
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm bg-transparent"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="w-full bg-transparent text-black py-2 px-4 rounded-lg hover:bg-black border border-black hover:text-white"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
