import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { FaSlack } from "react-icons/fa";
import { CourseContext } from "../context/CourseContext";
import { TfiHelpAlt } from "react-icons/tfi";
import { HiUser } from "react-icons/hi2";

const CourseModule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false); // State to track if the main content is scrolled
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State to track visibility of the div

  const location = useLocation();
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext); // Access user data

  const { courseData, secondAPIData } = useContext(CourseContext); // Use courseData from CourseContext

  useEffect(() => {
    console.log(courseData); // Console log the courseData to see the fetched data
    console.log(secondAPIData); // Console log the courseData to see the fetched data
  }, [courseData]);

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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  const { enrolledcourses, message, token, totalbalance, user } = userData;

  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Retrieve course information from local storage
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setCourse(JSON.parse(storedCourse));
    }
  }, []);

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

  // Function to get initials from the user's name
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials;
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prev) => !prev);
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
                <img src={Plc} alt="Company Logo" className="w-10 h-10" />
              </div>
            )}
          </div>
        </div>
        <ul className="mt-10 w-full font-gilroy">
          <Link
            to="/dashboard"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/dashboard")}`}
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
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/profile")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <HiUser />
                <span>Profile</span>
              </div>
            ) : (
              <div className="text-2xl">
                <HiUser />
              </div>
            )}
          </Link>
          <Link
            to="/help_center"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/help_center")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <TfiHelpAlt />

                <span>Help Center</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TfiHelpAlt />
              </div>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 text-[18px] w-full text-left text-pc_black`}
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
              className="absolute top-[50%] left-3 -translate-y-[50%] text-[#898989] "
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-pc_bg w-[400px] shadow-sm rounded-md py-3 placeholder:text-sm placeholder:text-[#898989] placeholder:font-gilroy pl-10"
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
        <div className="flex-1 p-8 bg-pc_bg font-gilroy overflow-y-auto" id="main-content">
          <div className="w-full flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="hidden md:flex items-center justify-center p-2 rounded font-gilroy_semibold"
            >
              <span>
                <IoIosArrowRoundBack />
              </span>
              <span>Go Back</span>
            </button>
            {course && course.course_community_link && (
              <a
                href={course.course_community_link}
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-lg  px-10 py-3  bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear flex items-center justify-center gap-2 w-full md:w-auto"
              >
                <span>
                  <FaSlack />
                </span>
                <span>Cohort Community</span>
              </a>
            )}
          </div>
          <div className="border bg-pc_white_white rounded-xl mt-8 p-5 md:p-8">
            {course ? (
              <>
                <h2 className="text-[32px] text-pc_blue font-gilroy_semibold mb-4">
                  {course.course_name}
                </h2>
                <p className="text-gray-600 mb-2">
                  Course Type: {course.course_type}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.course_module.map((module, index) => (
                    <div
                      key={index}
                      className="p-2 border border-gray-200 rounded-md"
                    >
                      <h3 className="text-lg font-semibold">{module.name}</h3>
                      <p className="text-gray-600">Module ID: {module.id}</p>
                      {/* Add more module details as needed */}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          isMobileSidebarOpen ? "block" : "hidden"
        } bg-white text-pc_black w-64 fixed top-0 left-0 h-full md:hidden transition-all duration-300`}
      >
        <div className="flex justify-between items-center w-full px-2">
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
              <HiUser />
              <span>Profile</span>
            </div>
          </Link>
          <Link
            onClick={toggleMobileSidebar}
            to="/help_center"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/help_center")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <TfiHelpAlt />

                <span>Help Center</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TfiHelpAlt />
              </div>
            )}
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

export default CourseModule;
