import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const Home = React.lazy(() => import("./components/Home"));

const Login = React.lazy(() => import("./components/Login"));

const Signup = React.lazy(() => import("./components/SignUp"));

const Rooms = React.lazy(() => import("./components/Rooms"));

const Experience = React.lazy(() => import("./components/Experience"));

const Book = React.lazy(() => import("./components/Book"));

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));


function App() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Other routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/book" element={<Book />} />
          <Route path="/admindsh" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
