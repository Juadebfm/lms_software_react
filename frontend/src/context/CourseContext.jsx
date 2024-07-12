import React, { createContext, useState, useEffect } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseData, setCourseData] = useState(null);
  const [secondAPIData, setSecondAPIData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user")); // Get user data from local storage
  const token = userData?.token;

  useEffect(() => {
    console.log("First useEffect hook executed");

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
        })
        .catch((error) => console.log("Error from dashboard-api:", error));
    }
  }, [token]);

  useEffect(() => {
    console.log("Second useEffect hook executed");

    if (token && courseData) {
      const teachable_course_id = courseData.teachable_course_id;
      const enrolledCourses = courseData.enrolledcourses;

      // Ensure teachable_course_id and enrolledCourses are available
      if (
        teachable_course_id &&
        enrolledCourses &&
        enrolledCourses.length > 0
      ) {
        // Constructing the lectures array
        const lectures = enrolledCourses.flatMap((course) =>
          course.course_module.map((module) => ({
            id: module.id,
            position: module.position,
          }))
        );

        console.log("lectures", lectures);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          course_id: teachable_course_id,
          lectures: lectures,
        });

        console.log("raw", raw);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        // Perform second API call to study-materials endpoint
        fetch(
          "https://backend.pluralcode.institute/student/study-materials",
          requestOptions
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((result) => {
            console.log("Result from second API call:", result);
            setSecondAPIData(result); // Store result of second API call in state
          })
          .catch((error) => {
            console.error("Error from second API call:", error);
            console.log("Error object:", error);
            // Optionally handle the error or set state to indicate error
          });
      } else {
        console.log(
          "Cannot make second API call. Missing teachable_course_id or enrolledCourses data."
        );
      }
    }
  }, [token, courseData]);

  return (
    <CourseContext.Provider value={{ courseData, secondAPIData }}>
      {children}
    </CourseContext.Provider>
  );
};
