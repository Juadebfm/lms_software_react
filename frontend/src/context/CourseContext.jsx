import React, { createContext, useState, useEffect } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseData, setCourseData] = useState(() => {
    const storedCourseData = localStorage.getItem("courseData");
    return storedCourseData ? JSON.parse(storedCourseData) : null;
  });

  const [studyMaterials, setStudyMaterials] = useState(() => {
    const storedStudyMaterials = localStorage.getItem("studyMaterials");
    return storedStudyMaterials ? JSON.parse(storedStudyMaterials) : {};
  });

  const [dashboardData, setDashboardData] = useState(() => {
    const storedDashboardData = localStorage.getItem("dashboardData");
    return storedDashboardData ? JSON.parse(storedDashboardData) : null;
  });

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
          setCourseData(result);
          setDashboardData(result); // Store the result from dashboard API
          localStorage.setItem("courseData", JSON.stringify(result)); // Store course data in local storage
          localStorage.setItem("dashboardData", JSON.stringify(result)); // Store dashboard data in local storage
        })
        .catch((error) => console.log("Error from dashboard-api:", error));
    }
  }, [token]);

  useEffect(() => {
    if (token && courseData) {
      courseData.enrolledcourses.forEach((course) => {
        const courseId = course.teachable_course_id;
        const courseName = course.course_name;

        // Check if study materials for this course are already in local storage
        const storedMaterials =
          JSON.parse(localStorage.getItem("studyMaterials")) || {};
        if (storedMaterials[courseName]) {
          setStudyMaterials((prevMaterials) => ({
            ...prevMaterials,
            [courseName]: storedMaterials[courseName],
          }));
          return; // Skip API call if data is already in local storage
        }

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
              setStudyMaterials((prevMaterials) => {
                const newMaterials = {
                  ...prevMaterials,
                  [courseName]: result,
                };
                localStorage.setItem(
                  "studyMaterials",
                  JSON.stringify(newMaterials)
                ); // Store the updated study materials in local storage
                return newMaterials;
              });
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
