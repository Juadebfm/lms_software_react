import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoChevronUpSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { BsWalletFill } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { PiBookOpenTextFill } from "react-icons/pi";
import { HiChevronRight } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State to track visibility of the div
  const [isNavScrolled, setIsNavScrolled] = useState(false); // State to track if the main content is scrolled
  const [activeTab, setActiveTab] = useState("courses");

  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext); // Access user data

  const [isFAQVisible, setIsFAQVisible] = useState(false);

  const toggleFAQVisibility = () => {
    setIsFAQVisible((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "bg-pc_bg text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  // Function to get initials from the user's name
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials;
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  console.log(userData); // Log user data

  const { enrolledcourses, message, token, totalbalance, user } = userData;

  const {
    academy_level,
    age,
    country,
    year,
    student_id_number,
    state,
    email,
    phone_number,
    date,
  } = user;

  // Capitalize the first letter of the email
  const capitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);

  const userDetails = enrolledcourses[1];

  console.log("Enrolled courses:", enrolledcourses);
  console.log(message);
  console.log(token);
  console.log(totalbalance);
  console.log(user);

  // Determine the number of courses
  const numberOfCourses = enrolledcourses.reduce((count, element) => {
    if (typeof element === "object" && element.teachable_course_id) {
      // If the element is an object with teachable_course_id, count it
      if (Array.isArray(element.teachable_course_id)) {
        return count + element.teachable_course_id.length;
      } else {
        return count + 1;
      }
    }
    return count;
  }, 0);

  // Handle scroll event to detect if the main content is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.getElementById("main-content");
      if (mainContent.scrollTop > 0) {
        setIsNavScrolled(true);
      } else {
        setIsNavScrolled(false);
      }
    };

    const mainContent = document.getElementById("main-content");
    mainContent.addEventListener("scroll", handleScroll);

    return () => {
      mainContent.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-x-hidden">
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
                <img src={Plc} alt="Company Logo" className="w-10 h-10" />
              </div>
            )}
          </div>
        </div>
        <ul className="mt-10 w-full font-gilroy">
          <Link
            to="/dashboard"
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses(
              "/dashboard"
            )}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
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
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses(
              "/profile"
            )}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <CiUser />
                <span>Profile</span>
              </div>
            ) : (
              <div className="text-2xl">
                <CiUser />
              </div>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-start py-5 pl-8 text-[18px] w-full text-left text-pc_black"
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <TbLogout />
                <span>Logout</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TbLogout />
              </div>
            )}
          </button>
        </ul>
      </div>

      {/* Main section */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div
          className={`bg-white py-5 px-[30px] lg:px-12 shadow flex justify-between items-center ${
            isNavScrolled ? "border-b border-pc_light_gray/30" : ""
          }`}
        >
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
              className="flex items-center justify-center bg-pc_blue text-white rounded-full cursor-pointer"
              onClick={toggleMobileSidebar}
            >
              <img src={Plc} alt="Company Logo" className="w-10 h-10" />
            </div>
            <button
              onClick={toggleMobileSidebar}
              className="text-2xl cursor-pointer"
            >
              {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <div className="bg-pc_blue text-white p-4 rounded-full flex items-center justify-center h-11 w-11">
                <span className="leading-none font-gilroy_semibold">
                  {getInitials(user.name)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-start justify-start leading-tight">
                <span className="font-gilroy_semibold font-medium">
                  {user.name}
                </span>
                <span className="font-gilroy_light mt-1">
                  {user.student_id_number}
                </span>
              </div>
              <div className="relative">
                {isDetailsVisible ? (
                  <IoChevronUpSharp
                    size={25}
                    className="font-extrabold cursor-pointer"
                    onClick={toggleDetailsVisibility}
                  />
                ) : (
                  <IoChevronDownSharp
                    size={25}
                    className="font-extrabold cursor-pointer"
                    onClick={toggleDetailsVisibility}
                  />
                )}
                {isDetailsVisible && (
                  <div className="absolute top-10 font-gilroy_light p-6 right-0 flex flex-col mt-2 bg-white shadow-lg rounded-lg">
                    <span>{capitalizedEmail}</span>
                    <span>{state}</span>
                    <span>{country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-pc_bg overflow-y-auto" id="main-content">
          {/* Information Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8 bg-transparent">
            <div className="w-full bg-white rounded-xl py-10 px-[20px] lg:px-14 flex items-center justify-start gap-5">
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-pc_blue/10 rounded-full">
                <BsWalletFill size={25} className="text-pc_blue" />
              </div>
              <div>
                <h1 className="text-[21px] lg:text-[24px] font-gilroy_semibold leading-none">
                  My Balance
                </h1>
                <div className="flex items-center mt-1 lg:mt-2 justify-center">
                  <span className="font-gilroy">Outstanding Balance:</span>
                  <span className="flex items-center justify-center text-pc_orange">
                    <TbCurrencyNaira size={20} className="leading-none" />
                    <span className="font-gilroy_semibold text-[17px] lg:text-[20px] leading-none pt-1">
                      {userDetails.balance}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full bg-white rounded-xl py-10 px-[20px] lg:px-14 flex items-center justify-start gap-5">
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-pc_orange/10 rounded-full">
                <PiBookOpenTextFill size={28} className="text-pc_orange" />
              </div>
              <div>
                <h1 className="text-[21px] lg:text-[24px] font-gilroy_semibold leading-none">
                  My Courses
                </h1>
                <div className="flex items-center mt-1 lg:mt-2 justify-center font-gilroy">
                  <span className="font-semibold mr-1">{numberOfCourses}</span>
                  Registered course{numberOfCourses !== 1 && "s"}
                </div>
              </div>
            </div>
          </div>
          {/* Course and cetificate toggle buttons */}
          <div className="px-[20px] lg:px-14 pt-10 w-full bg-white rounded-xl mt-8 flex justify-center lg:justify-start items-center gap-8 font-gilroy">
            <button
              onClick={() => setActiveTab("courses")}
              className={`${
                activeTab === "courses"
                  ? "text-pc_orange border-b-2 border-pc_orange"
                  : "text-black"
              } pb-1`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`${
                activeTab === "certificates"
                  ? "text-pc_orange border-b-2 border-pc_orange"
                  : "text-black"
              } pb-1`}
            >
              Certificates
            </button>
          </div>

          {/* Certificate and courses sessions and toggle */}
          <div className="bg-white px-[20px] lg:px-14 py-16 mt-8 rounded-lg">
            <div className="bg-white px-[20px] lg:px-14 py-16 mt-8 rounded-lg">
              {activeTab === "courses" && (
                <div>
                  <div>Div for course cards</div>
                </div>
              )}
              {activeTab === "certificates" && (
                <div>
                  <div>Div for certificates</div>
                </div>
              )}
            </div>

            <div
              id="faq"
              className="FAQ shadow-lg bg-white mt-16 py-7 px-[20px] lg:px-14 rounded-lg w-full lg:w-[70%] mx-auto cursor-pointer relative"
              onClick={toggleFAQVisibility}
            >
              <div className="flex items-center justify-between w-full cursor-pointer">
                <div className="w-[24px] h-[24px] bg-pc_blue rounded-full hidden lg:block"></div>
                <h3 className="font-gilroy_thin text-black">
                  Difference between instructor-led vs self-paced courses
                </h3>
                {isFAQVisible ? (
                  <HiChevronDown className="text-[24px]" />
                ) : (
                  <HiChevronRight className="text-[24px]" />
                )}
              </div>
              {isFAQVisible && (
                <p className="font-gilroy_thin mt-10 border-t pt-8 border-pc_bg para">
                  You can access the recorded materials for both your self-paced
                  and instructor-led courses right here. <br />
                  <br />
                  However, while Self-Paced (LooP) courses allow you to progress
                  through the modules at your own time and pace, instructor-led
                  programs are designed so that the modules are unlocked often
                  weekly in accordance with the progress of the class in
                  general.
                </p>
              )}
            </div>
          </div>
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
            to="/dashboard"
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses(
              "/dashboard"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center gap-2 text-[18px]">
              <MdDashboard />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            to="/profile"
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses(
              "/profile"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center gap-2 text-[18px]">
              <CiUser />
              <span>Profile</span>
            </div>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              toggleMobileSidebar();
            }}
            className="flex items-center justify-start py-5 pl-8 text-[18px] w-full text-left"
          >
            <div className="flex items-center gap-2">
              <TbLogout />
              <span>Logout</span>
            </div>
          </button>
        </ul>
        <div className="flex items-center justify-center gap-3 mt-20">
          <div className="flex flex-col items-start justify-start leading-tight">
            <span className="font-gilroy_semibold font-medium">
              {user.name}
            </span>
            <span className="font-gilroy_light mt-1">
              {user.student_id_number}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// {
//   /*  */
// }
