import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import { Link, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "bg-pc_bg text-pc_orange border-l-4 border-pc_orange"
      : "";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } hidden md:flex flex-col items-center transition-all duration-300 bg-white text-pc_black`}
      >
        <div className="flex justify-between items-center w-full p-2">
          <div className="text-xl font-semibold">
            {isSidebarOpen ? (
              <img
                src={Pluralcode}
                alt="Expanded"
                onClick={toggleSidebar}
                className="cursor-pointer p-5"
              />
            ) : (
              <div
                className="flex items-center justify-center w-full cursor-pointer pt-5"
                onClick={toggleSidebar}
              >
                <div className="bg-pc_blue text-white p-4 rounded-full flex items-center justify-center h-11 w-11">
                  <span className="leading-none font-gilroy_semibold">PC</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="mt-10 w-full font-gilroy">
          <Link
            to="/dashboard"
            className={`flex items-center justify-center py-6 ${getLinkClasses(
              "/dashboard"
            )}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center justify-center gap-2 text-[18px]">
                <MdDashboard />
                <span>Dashboard</span>
              </div>
            ) : (
              <div className="text-2xl">
                <MdDashboard />
              </div>
            )}
          </Link>
          <Link
            to="/profile"
            className={`flex items-center justify-center py-6 ${getLinkClasses(
              "/profile"
            )}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center justify-center gap-2 text-[18px]">
                <CiUser />
                <span>Profile</span>
              </div>
            ) : (
              <div className="text-2xl">
                <CiUser />
              </div>
            )}
          </Link>

          <Link
            to="/logout"
            className={`flex items-center justify-center py-6 ${getLinkClasses(
              "/logout"
            )}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center justify-center gap-2 text-[18px]">
                <TbLogout />
                <span>Logout</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TbLogout />
              </div>
            )}
          </Link>
        </ul>
      </div>

      {/* Main section */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="bg-white py-5 px-12 shadow flex justify-between items-center">
          <div className="relative hidden lg:block">
            <IoMdSearch
              size={20}
              className="absolute top-[50%] left-3 -translate-y-[50%] text-[#898989]"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-pc_bg w-[400px] shadow-sm rounded-md py-3 placeholder:text-sm placeholder:text-[#898989] pl-10"
            />
          </div>
          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div
              className="flex items-center justify-center w-16 h-16 bg-pc_blue text-white p-4 rounded-full cursor-pointer"
              onClick={toggleMobileSidebar}
            >
              <span className="leading-none font-gilroy_semibold">PC</span>
            </div>
            <button onClick={toggleMobileSidebar}>
              {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <div className="bg-pc_blue text-white p-4 rounded-full flex items-center justify-center h-11 w-11">
                <span className="leading-none font-gilroy_semibold">MP</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-start justify-start leading-tight">
                <span className="font-gilroy_semibold font-medium">
                  Mabel Praise
                </span>
                <span className="font-gilroy_light">Student ID: COH3456</span>
              </div>
              <IoChevronDownSharp size={25} className="font-extrabold" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-pc_bg">
          <h2 className="text-xl font-semibold">Main Content</h2>
          <p className="mt-4">This is the main content area.</p>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          isMobileSidebarOpen ? "block" : "hidden"
        } bg-white text-pc_black w-64 fixed top-0 left-0 h-full md:hidden transition-all duration-300`}
      >
        <div className="flex justify-between items-center w-full p-2">
          <img
            src={Pluralcode}
            alt="Expanded"
            onClick={toggleMobileSidebar}
            className="cursor-pointer p-5"
          />
        </div>
        <ul className="mt-4 w-full font-gilroy">
          <Link
            to="/profile"
            className={`flex items-center justify-center py-6 ${getLinkClasses(
              "/profile"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center justify-center gap-2 text-[18px]">
              <CiUser />
              <span>Profile</span>
            </div>
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center justify-center py-6 ${getLinkClasses(
              "/dashboard"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center justify-center gap-2 text-[18px]">
              <MdDashboard />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            to="/logout"
            className={`flex items-center justify-center py-6 ${getLinkClasses(
              "/logout"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center justify-center gap-2 text-[18px]">
              <TbLogout />
              <span>Logout</span>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
