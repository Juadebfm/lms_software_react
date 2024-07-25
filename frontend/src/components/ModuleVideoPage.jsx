import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModuleImage from "../assets/moduleimage.png";
import Pluralcode from "../assets/PluralCode.png";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { TfiHelpAlt } from "react-icons/tfi";
import { TbLogout } from "react-icons/tb";
import { IoIosArrowRoundBack, IoMdSearch } from "react-icons/io";
import Plc from "../assets/plc.png";
import { FaBars, FaReadme, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { DashboardDataContext } from "../context/DashboardDataContext";
import {
  IoChevronBack,
  IoChevronDownSharp,
  IoChevronForward,
  IoChevronUpSharp,
} from "react-icons/io5";
import { CgMenuRight } from "react-icons/cg";
import { FaRegCirclePlay } from "react-icons/fa6";

const ModuleVideoPage = () => {
  const { moduleId } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { userData } = useContext(AuthContext);
  const { dashboardData } = useContext(DashboardDataContext);

  const { enrolledcourses, message, token, totalbalance, user } = userData;

  useEffect(() => {
    const fetchModuleData = () => {
      const storedData = JSON.parse(
        localStorage.getItem("groupedStudyMaterials")
      );
      if (storedData) {
        const module = storedData.courseModules.find(
          (mod) => mod.moduleId === parseInt(moduleId)
        );
        setModuleData(module || null);

        if (module) {
          // Find the first video URL
          const firstVideo = module.studyMaterials?.finalResult
            .flatMap((item) => item.lecture.attachments)
            .find((attachment) => attachment.kind === "video");

          if (firstVideo) {
            setCurrentVideoUrl(firstVideo.url);
          }
        }
      }
    };

    fetchModuleData();
  }, [moduleId]);

  useEffect(() => {
    if (currentVideoUrl) {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentVideoUrl]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleGoBack = () => navigate(-1);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const toggleDetailsVisibility = () => setIsDetailsVisible((prev) => !prev);

  if (!moduleData) {
    return <div>Loading...</div>;
  }

  const countStudyMaterials = (studyMaterials) => {
    let videos = 0;
    let pdfs = 0;
    let quizzes = 0;

    if (studyMaterials && studyMaterials.finalResult) {
      studyMaterials.finalResult.forEach((item) => {
        item.lecture.attachments.forEach((attachment) => {
          if (attachment.kind === "video") {
            videos += 1;
          } else if (attachment.kind === "pdf_embed") {
            pdfs += 1;
          } else if (attachment.kind === "quiz") {
            quizzes += 1;
          }
        });
      });
    }

    return { videos, pdfs, quizzes };
  };

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

  const { studyMaterials } = moduleData;
  const { videos, pdfs, quizzes } = countStudyMaterials(studyMaterials);

  const handleLectureClick = (attachment) => {
    switch (attachment.kind) {
      case "video":
        setCurrentVideoUrl(attachment.url);
        setCurrentVideoIndex(index);
        break;
      case "pdf_embed":
        console.log("Display PDF:", attachment.url);
        break;
      case "quiz":
        navigate(`/quiz/${attachment.id}`);
        break;
      default:
        console.log("Unknown attachment type");
    }
  };

  const getAllVideos = () => {
    return studyMaterials.finalResult.flatMap((item) =>
      item.lecture.attachments.filter(
        (attachment) => attachment.kind === "video"
      )
    );
  };

  const allVideos = getAllVideos();

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
      setCurrentVideoUrl(allVideos[currentVideoIndex - 1].url);
    }
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < allVideos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
      setCurrentVideoUrl(allVideos[currentVideoIndex + 1].url);
    }
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
          className="flex-1 p-8 bg-pc_bg font-gilroy overflow-y-auto"
          id="main-content"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2 cursor-pointer font-inter">
              <IoIosArrowRoundBack size={20} />

              <button onClick={handleGoBack} className="text-[18px]">
                Go Back
              </button>
            </div>
            {selectedCourse ? (
              <div>
                <button
                  className="mb-4 rounded-lg mt-3 w-[312px] h-[56px] bg-pc_orange text-white font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear flex items-center justify-center gap-2 text-[18px] font-inter"
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

          <div className="p-0 lg:p-4 flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className=" w-full lg:w-[70%]">
              <div className=" mb-4 capitalize flex items-center justify-between">
                <div className="text-2xl font-gilroy_semibold">
                  {moduleData.moduleName}
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={goToPreviousVideo}
                    disabled={currentVideoIndex === 0}
                    className={`px-4 py-2 bg-transparent text-pc_blue font-gilroy_semibold flex items-center justify-center gap-1 ${
                      currentVideoIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <IoChevronBack />
                    Previous
                  </button>
                  <button
                    onClick={goToNextVideo}
                    disabled={currentVideoIndex === allVideos.length - 1}
                    className={`px-4 py-2 bg-transparent text-pc_blue font-gilroy_semibold flex items-center justify-center gap-1 ${
                      currentVideoIndex === allVideos.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                    <IoChevronForward />
                  </button>
                </div>
              </div>

              <div className="">
                {currentVideoUrl && (
                  <div className="w-full">
                    <video
                      src={currentVideoUrl}
                      controls
                      className="max-w-full mx-auto"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full lg:max-w-[30%] overflow-y-auto">
              <div className="">
                <div className="text-base font-gilroy_semibold capitalize">
                  {moduleData.moduleName}
                </div>
                {studyMaterials && studyMaterials.finalResult.length > 0 ? (
                  studyMaterials.finalResult.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white shadow-md rounded-md"
                    >
                      <h2 className="text-2xl font-semibold mb-4 capitalize">
                        {item.lecture.lectureName}
                      </h2>
                      <ul className="space-y-2">
                        {item.lecture.attachments.map((attachment, index) => (
                          <li
                            key={index}
                            className="cursor-pointer text-blue-600 underline"
                            onClick={() => handleLectureClick(attachment)}
                          >
                            {attachment.kind === "video" && (
                              <span>
                                <FaRegCirclePlay />
                                {attachment.name || "Untitled Video"}
                              </span>
                            )}
                            {attachment.kind === "pdf_embed" && (
                              <span>
                                <FaReadme />
                                {attachment.name || "Untitled PDF"}
                              </span>
                            )}
                            {attachment.kind === "quiz" && (
                              <span>
                                <MdOutlineQuiz />
                                {attachment.name || "Untitled Quiz"}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>No study materials available.</p>
                )}
              </div>
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

export default ModuleVideoPage;
