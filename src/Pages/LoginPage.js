import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function LoginPage(){
    const [name, setName] = useState("");
    const [eMail, setEmail] = useState("");
    const navigate = useNavigate();

    // create a function to handle the submission of login. if submission is successful navigate to dogs page
    const handleSubmit = async (e) => {
        e.preventDefault();
        // check if username and password are not empty
        if (name === "" || eMail === "") {
            alert("Please fill in all fields");
            return;
        }

        const res = await fetch("https://frontend-take-home-service.fetch.com/auth.login", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({name, eMail}),
        });
        if (res.status === 200){
            navigate("/dogs");
        }
    };

    return(
    <form onSubmit ={handleSubmit}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required></input>
        <input type="email" value={eMail} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required></input>
        <button type="submit">Login</button>
    </form>
    );
}

