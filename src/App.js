import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage";
import DogSearchPage from "./Pages/DogSearchPage";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dogs" element={<ProtectedRoute>
          <DogSearchPage />
        </ProtectedRoute>
        }
        />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;