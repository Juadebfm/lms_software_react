import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { AuthContext } from "../context/AuthContext";
import { TfiHelpAlt } from "react-icons/tfi";
import { StudyMaterialsContext } from "../context/StudyMaterialsContext";
import { DashboardDataContext } from "../context/DashboardDataContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiSlackLine } from "react-icons/ri";
import CourseModuleContainer from "./CourseModuleContainer";
import { CgMenuRight } from "react-icons/cg";

const CourseModule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState("courseModules");

  const location = useLocation();
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);
  const { dashboardData } = useContext(DashboardDataContext);

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

  const capitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const handleScroll = () => setIsNavScrolled(mainContent.scrollTop > 0);

    mainContent.addEventListener("scroll", handleScroll);
    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const toggleDetailsVisibility = () => setIsDetailsVisible((prev) => !prev);

  useEffect(() => {
    const courseId = location.state?.courseId;
    if (courseId && dashboardData) {
      const course = dashboardData.find((course) => course.id === courseId);
      setSelectedCourse(course);
    }
  }, [location.state, dashboardData]);

  useEffect(() => {
    const courseFromLocalStorage = JSON.parse(
      localStorage.getItem("clickedCourse")
    );

    if (courseFromLocalStorage) {
      setSelectedCourse(courseFromLocalStorage);
    }
  }, []);

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "bg-pc_bg text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  const getLinkClasses2 = (path) => {
    return location.pathname === path
      ? "bg-white text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } hidden lg:flex flex-col items-center transition-all duration-300 bg-white text-pc_black`}
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
          className={`bg-white py-5 px-[30px] lg:px-12 shadow flex justify-between items-center mb-5 ${
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
          <div className="lg:hidden flex items-center justify-between w-full py-4">
            <div
              className="flex items-center justify-center text-white rounded-full cursor-pointer"
              onClick={toggleMobileSidebar}
            >
              <img src={Pluralcode} alt="Company Logo" className="w-[170px]" />
            </div>
            <button
              onClick={toggleMobileSidebar}
              className="text-[28px] cursor-pointer bg-pc_blue text-pc_white_white p-1 rounded-full"
            >
              {isMobileSidebarOpen ? <FaTimes /> : <CgMenuRight />}
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

        <div
          className="flex-1 p-4 md:p-8 bg-pc_bg font-gilroy overflow-y-auto w-[100vw] lg:w-auto"
          id="main-content"
        >
          <div className="flex flex-col lg:flex-row items-start md:items-center justify-between w-full md:w-auto">
            <div className="flex items-center justify-center gap-2 cursor-pointer font-inter">
              <IoIosArrowRoundBack size={20} />

              <button onClick={handleGoBack} className="text-[18px]">
                Go Back
              </button>
            </div>
            {selectedCourse ? (
              <div className="w-full md:w-auto">
                <button
                  className="mb-4 rounded-lg mt-3 w-full md:w-[312px] h-[50px] bg-pc_orange text-white hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear flex items-center justify-center gap-2 text-[17px] font-inter"
                  onClick={() =>
                    window.open(selectedCourse.course_community_link, "_blank")
                  }
                >
                  <RiSlackLine size={20} />
                  Cohort Community
                </button>
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <div className="bg-pc_white_white mt-8 p-4 md:p-10 rounded-t-xl h-max md:min-h-screen w-full">
            <div className="text-[32px] font-gilroy_semibold text-pc_blue">
              {selectedCourse ? <h1>{selectedCourse.course_name}</h1> : <p></p>}
            </div>
            {/* Main Toggle Buttons */}
            <div className="mt-8 bg-pc_white_white lg:bg-pc_bg rounded-xl w-full overflow-x-auto md:overflow-x-hidden">
              <div className="flex items-center justify-start gap-4 h-[75px] px-8 whitespace-nowrap">
                <button
                  onClick={() => setActiveSection("courseModules")}
                  className={`py-2 px-4 rounded font-gilroy ${
                    activeSection === "courseModules"
                      ? "text-pc_white_white lg:text-pc_orange  font-gilroy_semibold border-none bg-pc_blue lg:bg-transparent w-auto lg:border-b-2 border-pc_orange"
                      : "text-pc_black w-max lg:w-auto bg-pc_bg lg:bg-transparent lg:text-pc_blue"
                  }`}
                >
                  Course Modules
                </button>
                <button
                  onClick={() => setActiveSection("resources")}
                  className={`py-2 px-4 rounded font-gilroy ${
                    activeSection === "resources"
                      ? "text-pc_white_white lg:text-pc_orange  font-gilroy_semibold border-none bg-pc_blue lg:bg-transparent w-auto lg:border-b-2 border-pc_orange"
                      : "text-pc_black w-max lg:w-auto bg-pc_bg lg:bg-transparent lg:text-pc_blue"
                  }`}
                >
                  Resources
                </button>
                <button
                  onClick={() => setActiveSection("paymentStatus")}
                  className={`py-2 px-4 rounded font-gilroy ${
                    activeSection === "paymentStatus"
                      ? "text-pc_white_white lg:text-pc_orange  font-gilroy_semibold border-none bg-pc_blue lg:bg-transparent w-auto lg:border-b-2 border-pc_orange"
                      : "text-pc_black w-max lg:w-auto bg-pc_bg lg:bg-transparent lg:text-pc_blue"
                  }`}
                >
                  Payment Status
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="mt-4">
              {activeSection === "courseModules" && (
                <div>
                  <CourseModuleContainer />
                </div>
              )}
              {activeSection === "resources" && (
                <div>
                  {/* Resources Content */}
                  <h3>Resources</h3>
                  {/* Your Resources Content Here */}
                </div>
              )}
              {activeSection === "paymentStatus" && (
                <div>
                  {/* Payment Status Content */}
                  <h3>Payment Status</h3>
                  {/* Your Payment Status Content Here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          isMobileSidebarOpen ? "block" : "hidden"
        } bg-pc_bg text-pc_black w-[80%] md:w-[50%] fixed top-0 left-0 h-full lg:hidden transition-all duration-300 py-[31px]`}
      >
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center justify-center gap-3 ">
            <div className="bg-blue-100 p-2 rounded-full">
              <div className="bg-pc_blue text-white p-4 rounded-full flex items-center justify-center h-11 w-11">
                <span className="leading-none font-gilroy_semibold">
                  {getInitials(user.name)}
                </span>
              </div>
            </div>
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
        <ul className="mt-4 w-full font-gilroy bg-pc_bg pt-16">
          <Link
            to="/dashboard"
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses2(
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
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses2(
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
            } py-5 ${getLinkClasses2("/help_center")}`}
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
      </div>
    </div>
  );
};

export default CourseModule;
