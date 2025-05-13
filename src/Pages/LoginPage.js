import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function LoginPage(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // create a function to handle the submission of login. if submission is successful navigate to dogs page
    const handleSubmit = async (e) => {
        e.preventDefault();
        // check if username and password are not empty
        if (userName === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        const res = await fetch("https://frontend-take-home-service.fetch.com/auth.login", {
            method: "POST",
            headers:{"Content-Type", "application/json"},
            credentials: "include",
            body: JSON.stringify({name, email}),
        });
        if (res.status === 200){
            navigate("/dogs");
        }
        })
    }
}
