import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../Components/Login.css";


const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [auth, setAuth] = useState(false)
    
    // Auto signout after 1 hour doesn't work
    // useEffect(() => {
    //     if (auth) {
    //         const timeoutId = setTimeout(() => {
    //         setAuth(false);
    //         navigate("/");
    //         localStorage.removeItem("signedIn")
    //     }, 3599999); 

    //     return () => clearTimeout(timeoutId);
    //     }
    // }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Login fetch request
        try {
            await fetch(
                "https://frontend-take-home-service.fetch.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: name,
                        email: email,
                    }),
                }
            ).then((res) => {
                if (!res.ok) {
                    throw new Error("Response Status: ", `${res.status}`);
                } else {
                    setAuth(true);
                    navigate("/Dogs");
                    localStorage.setItem("signedIn", true);
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="login-Form-Container">
            <div></div>
            <form className="login-Form" onSubmit={handleSubmit}>
                <div className="name-Container">
                    <label className="name-Label">Name:</label>
                    <input
                        className="name-Input"
                        type="text"
                        defaultValue={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter Your Name Here"
                        required
                    ></input>
                </div>
                <div className="email-Container">
                    <label className="email-Label">Email:</label>
                    <input
                        className="email-Input"
                        type="email"
                        defaultValue={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter Your Email Here"
                        required
                    ></input>
                </div>
                <button className="login-Button" type="submit">
                    Log In
                </button>
            </form>
            <div></div>
        </div>
    );
};

export default Login;
