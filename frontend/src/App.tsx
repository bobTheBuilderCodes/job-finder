import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobsPosted from "./views/JobsPosted";
import Talents from "./views/Talents";
import Applications from "./views/Applications";
import UploadJobs from "./views/UploadJobs";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import ForgotPassword from "./views/forgot-password";
import ResetPassword from "./views/reset-password";
import PrivateRoute from "./app/routes/PrivateRoute";
import PublicRoute from "./app/routes/PublicRoute";
import React from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/jobs" element={<JobsPosted />} />
          <Route path="/talents" element={<Talents />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/upload-jobs" element={<UploadJobs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
