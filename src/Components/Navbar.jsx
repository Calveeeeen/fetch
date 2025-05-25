/* just a navbar that sits on the top of the page with just a logo on left side and login/signup on right side */
import Login from "./Login";
import { useNavigate} from 'react-router'
import "../Components/Navbar.css";


const Navbar = () =>{
    const navigate = useNavigate();
    const handleLogout = async (event) => {
        event.preventDefault();
        try{
            await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
                method: "POST", 
                headers: {
                    "Content-Type":"application/json"
                },
                credentials: "include",
            }).then(res => {
            if(!res.ok){
                throw new Error("Response Status: ", `${res.status}`)
            }
            else{
                localStorage.removeItem("auth_token");
                navigate("/");
            }
        })
        }catch(error){
            console.log(error.message)
        }
    };

    
    return (
        <div className="navbar-Container"> 
            <div></div>
            <img className="fetch-Logo" src="src\assets\fetchLogo.svg" alt="fetchLogo"></img>
            <button className="logout-Button" onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Navbar;

