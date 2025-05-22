import { useState, useEffect } from "react";

const DogsPage = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
    const getDogs = async () => {
        const res = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
            credentials: "include",
        }
        );
        const data = await res.json();
        setDogs(data || []);
    };
    getDogs();
    }, []);

    return (
    <div>
        <ul>
        {dogs.map((dog) => {
            return <li>{dog}</li>;
        })}
        </ul>
    </div>
    );
};

export default DogsPage;
