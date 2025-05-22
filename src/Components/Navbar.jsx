/* just a navbar that sits on the top of the page with just a logo on left side and login/signup on right side */
import Login from "./Login";
import "../Components/Navbar.css";


const Navbar = () =>{
    
    return (
        <div className="navbar-Container"> 
            <div></div>
            <img className="fetch-Logo" src="src\assets\fetchLogo.svg" alt="fetchLogo"></img>
            <button className="logout-Button">Logout</button>
        </div>
    )
};

export default Navbar;

