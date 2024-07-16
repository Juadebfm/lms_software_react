import React, { createContext, useState, useEffect } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseData, setCourseData] = useState(null);
  const [studyMaterials, setStudyMaterials] = useState({});
  const [dashboardData, setDashboardData] = useState(null); // State to store result from dashboard API
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token;

  useEffect(() => {
    if (token) {
      fetch("https://backend.pluralcode.institute/student/dashboard-api", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Result from dashboard-api:", result);
          setCourseData(result);
          setDashboardData(result); // Store the result from dashboard API
        })
        .catch((error) => console.log("Error from dashboard-api:", error));
    }
  }, [token]);

  useEffect(() => {
    if (token && courseData) {
      courseData.enrolledcourses.forEach((course) => {
        const courseId = course.teachable_course_id;
        const courseName = course.course_name;

        course.course_module.forEach((module) => {
          const lectures = module.lectures.map((lecture) => ({
            id: lecture.id,
            position: lecture.position,
          }));

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);

          const raw = JSON.stringify({
            course_id: courseId,
            lectures: lectures,
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(
            "https://backend.pluralcode.institute/student/study-materials",
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(
                `Result for ${courseName} from second API call:`,
                result
              );
              setStudyMaterials((prevMaterials) => ({
                ...prevMaterials,
                [courseName]: result,
              }));
            })
            .catch((error) => {
              console.error(
                `Error for ${courseName} from second API call:`,
                error
              );
            });
        });
      });
    }
  }, [token, courseData]);

  return (
    <CourseContext.Provider
      value={{ courseData, studyMaterials, dashboardData }}
    >
      {children}
    </CourseContext.Provider>
  );
};
