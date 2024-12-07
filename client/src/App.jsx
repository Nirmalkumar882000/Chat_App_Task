import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={authUser ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="/register" element={authUser ? <Navigate to='/dashboard' /> : <Register />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
