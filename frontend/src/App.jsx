import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerificationCode from "./components/VerificationCode";

export default function App() {
  return (
    <div className="overflow-x-hidden font-gilroy">
      <Router>
        <Routes>
          <Route path="/" element={<VerificationCode />} />
        </Routes>
      </Router>
    </div>
  );
}
