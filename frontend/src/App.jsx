import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoutes element={<Dashboard />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoutes element={<Profile />} />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
