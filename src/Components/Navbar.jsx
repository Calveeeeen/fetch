/* just a navbar that sits on the top of the page with just a logo on left side and login/signup on right side */
import Login from "./Login";
import { useNavigate } from "react-router";
// import { useState, useEffect} from 'react';
import "../Components/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleFavoritesPage = async (event) => {
        event.preventDefault();

        console.log("favoritesButton is being clicked");
        navigate("/Favorites");
        // try {
        //     await fetch(
        //         "https://frontend-take-home-service.fetch.com/auth/login",
        //         {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             credentials: "include",
        //         }
        //     ).then((res) => {
        //         if (!res.ok) {
        //             throw new Error("Response status: ", `${res.status}`);
        //         } else {
        //             console.log("favoritesButton is being clicked");
        //             navigate("/Favorites");
        //         }
        //     });
        // } catch (error) {
        //     console.log(error.message);
        // }
    };

    const handleHome = async (event) => {
        event.preventDefault();

        console.log("logo is being clicked");
        navigate("/Dogs");
        // try{
        //     await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         credentials: "include",
        //     }).then(res => {
        //         if(!res.ok){
        //             throw new Error("Response status: ", `${res.status}`)
        //         }else{
        //             console.log("logo is being clicked");
        //             navigate("/Dogs");
        //         }
        //     })
        // }catch(error){
        //     console.log(error.message);
        // }
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
                    localStorage.removeItem("auth_token");
                    navigate("/");
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="NavBar">
            <div className="navbar-Container">
                <div></div>
                <img className="fetch-Logo" src="src\assets\fetchLogo.svg" alt="fetchLogo" onClick={handleHome}></img>
                <button className="favorites-Button" onClick={handleFavoritesPage}> Favorites</button>
                <button className="logout-Button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
