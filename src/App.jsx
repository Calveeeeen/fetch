import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import DogsPage from "./Pages/DogsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dogs" element={<DogsPage />} />
        </Routes>
      </Router>
    </>
    
  )
}

export default App
