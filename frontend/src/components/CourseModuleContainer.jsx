import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModuleImage from "../assets/moduleimage.png";

const CourseModuleContainer = () => {
  const [courseName, setCourseName] = useState("");
  const [courseModules, setCourseModules] = useState([]);
  const [visitedModules, setVisitedModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("groupedStudyMaterials")
    );

    if (storedData) {
      setCourseName(storedData.courseName || "Course Name Not Available");
      setCourseModules(storedData.courseModules || []);
    }

    const storedVisitedModules =
      JSON.parse(localStorage.getItem("visitedModules")) || [];
    setVisitedModules(storedVisitedModules);
  }, []);

  const countStudyMaterials = (studyMaterials) => {
    let videos = 0;
    let pdfs = 0;
    let quizzes = 0;

    if (studyMaterials && studyMaterials.finalResult) {
      studyMaterials.finalResult.forEach((item) => {
        if (item.lecture && item.lecture.attachments) {
          item.lecture.attachments.forEach((attachment) => {
            if (attachment.kind === "video") {
              videos += 1;
            } else if (attachment.kind === "pdf_embed") {
              pdfs += 1;
            } else if (attachment.kind === "quiz") {
              quizzes += 1;
            }
          });
        }
      });
    }

    return { videos, pdfs, quizzes };
  };

  const handleModuleClick = (moduleId) => {
    const updatedVisitedModules = new Set(visitedModules);
    updatedVisitedModules.add(moduleId);
    setVisitedModules([...updatedVisitedModules]);
    localStorage.setItem(
      "visitedModules",
      JSON.stringify([...updatedVisitedModules])
    );
    navigate(`/module/${moduleId}`);
  };

  return (
    <div className="p-4">
      <div>
        <div className="text-2xl font-gilroy_semibold mb-4">{courseName}</div>
        {courseModules.map((module) => {
          const { videos, pdfs, quizzes } = countStudyMaterials(
            module.studyMaterials
          );
          const isVisited = visitedModules.includes(module.moduleId);

          return (
            <div
              key={module.moduleId}
              className="h-[194px] shadow-lg px-5 py-7 rounded-bl-xl rounded-tr-xl mt-6 flex items-start justify-start gap-4 cursor-pointer"
              onClick={() => handleModuleClick(module.moduleId)}
            >
              <img src={ModuleImage} alt="" width={133} height={133} />
              <div className="font-gilroy_semibold">
                <div className="font-gilroy_thin">Course | {courseName}</div>
                <div className="font-gilroy_semibold text-[24px]">
                  {module.moduleName}
                </div>
                <div className="font-gilroy_thin text-[10.3px]">
                  {videos} Lessons & {quizzes} Assessments & {pdfs} PDFs
                </div>
                <button className="mt-2 p-2 border rounded">
                  {isVisited ? "Continue Module" : "View Module"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseModuleContainer;
