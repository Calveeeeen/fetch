/* just a navbar that sits on the top of the page with just a logo on left side and login/signup on right side */
import Login from "./Login";
import "../Components/Navbar.css";


const Navbar = () =>{
    
    return (
        <div className="Navbar-container"> 
            <img className="fetchLogo" src="src\assets\fetch-rewards@logotyp.us.svg" alt="fetchLogo"></img>
            <button className="logoutButton">Logout</button>
        </div>
    )
};

export default Navbar;