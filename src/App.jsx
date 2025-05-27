import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import DogsPage from "./Pages/DogsPage";
import FavoritesPage from './Pages/FavoritesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dogs" element={<DogsPage />} />
          <Route path="/Favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </>
    
  )
}

export default App
