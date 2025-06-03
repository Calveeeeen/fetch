import Login from "./Login";
import { useNavigate } from "react-router";
import "../Components/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleFavoritesPage = async (event) => {
        event.preventDefault();

        if(localStorage.getItem("signedIn")){
            navigate("/Favorites");
        }

    };

    const handleHome = async (event) => {
        event.preventDefault();

        // console.log("logo is being clicked");
        if(localStorage.getItem("signedIn") !== null){
            navigate("/Dogs");
        }
        
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await fetch(
                "https://frontend-take-home-service.fetch.com/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            ).then((res) => {
                if (!res.ok) {
                    throw new Error("Response Status: ", `${res.status}`);
                } else {
                    localStorage.removeItem("signedIn");
                    navigate("/");
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="NavBar">
            {localStorage.getItem("signedIn") ? (
                <div className="navbar-Container">
                    <div></div>
                    <img className="fetch-Logo" src="../public/assets/fetchLogo.svg" alt="fetchLogo" onClick={handleHome}></img>
                    <button className="favorites-Button" onClick={handleFavoritesPage}> Favorites</button>
                    <button className="logout-Button" onClick={handleLogout}>Logout</button>
                </div>
                ):(
                    <div className="navbar-Container">
                        <div></div>
                        <img className="fetch-Logo" src="src\assets\fetchLogo.svg" alt="fetchLogo" onClick={handleHome}></img>
                        <div></div>
                        <div></div>
                    </div>
                )}
                
            
        </div>
    );
};

export default Navbar;
