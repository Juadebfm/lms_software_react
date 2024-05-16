import React, { useState } from "react";
import LoginImg from "../assets/signinPage.png";
import Validation from "../utils/LoginValidation";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  };

  const handleChange = () => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-14 font-gilroy h-screen bg-pc_bg text-base">
      <div className="bg-pc_white_white w-full h-full flex items-start justify-center flex-col p-20">
        <div className="space-y-3 mb-14">
          <h1 className="text-heading_1 text-pc_blue font-gilroy_bold font-bold">
            Welcome Back!
          </h1>
          <p className="font-gilroy_thin font-light text-pc_dark_gray">
            Login to your PluralCode account
          </p>
        </div>
        <form action="" onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-start justify-center space-y-2 mb-10">
            <label
              className="font-gilroy_thin text-pc_dark_gray font-light"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="py-4 px-6 border border-pc_dark_gray/30 rounded-md bg-transparent w-full placeholder:font-light placeholder:font-gilroy focus:!outline-none text-base"
              type="email"
              onChange={handleChange}
              placeholder="Enter Email"
              name="email"
            />
            <span>
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </span>
          </div>
          <div>
            <div className="flex flex-col items-start justify-center space-y-2">
              <label
                className="font-gilroy_thin text-pc_dark_gray font-light"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                className="py-4 px-6 border border-pc_dark_gray/30 rounded-md bg-transparent w-full placeholder:font-light placeholder:font-gilroy focus:!outline-none text-base"
                type="password"
                placeholder="Enter Password"
                name="password"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <input type="checkbox" className="cursor-pointer" />
                <label
                  htmlFor="Remember me"
                  className="ml-2 font-gilroy_thin font-light text-pc_dark_gray"
                >
                  Remember Me
                </label>
              </div>
              <span className="font-gilroy_bold text-pc_blue font-bold">
                Forgot Password
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="py-4 px-6 bg-pc_orange hover:shadow-md shadow-pc_dark_gray hover:bg-pc_orange/90 mt-10 w-full rounded-md text-white duration-200 ease-linear transition-all"
          >
            Login
          </button>
        </form>
      </div>
      <div className="bg-pc_white_white w-full h-full flex items-center justify-center">
        <img src={LoginImg} alt="Student" />
      </div>
    </div>
  );
};

export default Login;
