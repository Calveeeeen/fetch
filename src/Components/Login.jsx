
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";

const Login = () => {
    
    const navigateHome = useNavigate()
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log("Name: ", name);
        console.log("Email: ", email);

        // Login fetch request
        const res = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: name,
                email: email
            })

        })

        
    }
    

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" defaultValue={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Name Here" required></input>
            <label>Email:</label>
            <input type="email" defaultValue={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email Here" required></input>
            <button type="submit">Log In</button>
        </form>
    )
}

export default Login;