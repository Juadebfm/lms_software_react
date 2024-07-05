import React from "react";
import LoginImg from "../assets/loginImg.png";
import { Link } from "react-router-dom";
import "../index.css";

const Login = () => {
  return (
    <div className="h-full lg:h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F5F6FA] gap-3 lg:gap-16 overflow-auto lg:overflow-hidden">
      <div className="flex flex-col items-start justify-center px-[35px] md:px-24 bg-white rounded-tr-3xl rounded-bl-rounded-tr-3xl py-24">
        <h1 className="text-pc_blue font-gilroy_bold font-medium text-[40px] lg:text-[46px] leading-tight">
          Welcome Back!
        </h1>
        <p className="font-gilroy_light font-extralight text-pc_black/70 pl-2">
          Login to your PluralCode account
        </p>

        <div className="mt-10 w-full space-y-10">
          <div className="flex flex-col items-start justify-start">
            <label
              htmlFor="email"
              className="font-gilroy_light font-extralight"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label
              htmlFor="password"
              className="font-gilroy_light font-extralight"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between w-full">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember_me"
              className="custom-checkbox"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 font-gilroy_light font-extralight"
            >
              Remember Me
            </label>
          </div>
          <Link
            to="/"
            className="font-gilroy_semibold font-medium text-pc_blue"
          >
            Forgot Password
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col w-full mx-auto mt-10">
          <button className="mb-4 rounded-lg mt-3 px-6 py-4 w-full bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear">
            Login
          </button>
          <p className="text-base text-center font-gilroy">
            Don't have an account?{" "}
            <span className="text-pc_orange">Create an Account</span>
          </p>
        </div>
      </div>
      <div className="relative bg-white flex items-center justify-center p-[35px] lg:p-20 overflow-hidden">
        <img
          src={LoginImg}
          alt="Login"
          className="relative z-10 p-0 md:p-20 -mt-14"
        />
        {[...Array(7)].map(
          (_, index) =>
            index !== 0 && (
              <div
                key={index}
                className={`absolute border border-[#939393]/25 rounded-full`}
                style={{
                  width: `${400 + index * 80}px`, // Increased width increment
                  height: `${400 + index * 80}px`, // Increased height increment
                  top: `calc(50% - ${200 + index * 40}px)`, // Adjusted top position
                  left: `calc(50% - ${200 + index * 40}px)`, // Adjusted left position
                  zIndex: 1,
                }}
              ></div>
            )
        )}
      </div>
    </div>
  );
};

export default Login;
