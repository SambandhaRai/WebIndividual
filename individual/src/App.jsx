import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';

const Home = React.lazy(() => import("./components/Home"));

const Login = React.lazy(() => import("./components/Login"));

const Signup = React.lazy(() => import("./components/SignUp"));

const Rooms = React.lazy(() => import("./components/Rooms"));

const Experience = React.lazy(() => import("./components/Experience"));

const Book = React.lazy(() => import("./components/Book"));

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"))

const AdminAddRoom = React.lazy(() => import("./components/AdminAddRoom"));

const AdminUpdateRoom = React.lazy(() => import("./components/AdminUpdateRoom"));

const AdminAddExp = React.lazy(() => import("./components/AdminAddExp"));

const AdminUpdateExp = React.lazy(() => import("./components/AdminUpdateExp"));

const AdminViewBooking = React.lazy(() => import("./components/AdminViewBooking"));


function App() {

  return (
    <Router>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Other routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/book" element={<Book />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/adminadd" element={<AdminAddRoom />} />
          <Route path="/adminupd" element={<AdminUpdateRoom />} /> 
          <Route path="/adminupd/:id" element={<AdminUpdateRoom />} /> 
          <Route path="/addexp" element={<AdminAddExp />} /> 
          <Route path="/updexp" element={<AdminUpdateExp />} /> 
          <Route path="/updexp/:id" element={<AdminUpdateExp />} /> 
          <Route path="/viewbooking" element={<AdminViewBooking />} /> 
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
