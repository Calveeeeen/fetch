import { useState, useEffect } from "react";
import DogCard from "../Components/DogCard";
import "../Pages/DogsPage.css";
import FilterDogs from "../Components/FilterDogs";
import { useNavigate } from 'react-router';

const DogsPage = () => {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    // doesn't work yet
    const [filters, setFilters] = useState({breeds: [], size: 25, from: 0 ,sort: "breed:asc"});

    const handleFilterChange = (newFilters) =>{
        setFilters(newFilters);
    }

    // auto signout after 1 hour
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
    }

    setTimeout(() => {handleLogout()}, 3600000)

    useEffect(() => {
        const fetchDogs = async () => {
            let dogIds = [];
            let nextUrl = `/dogs/search?sort=breed:${sortOrder}`;

            const res = await fetch(
                `https://frontend-take-home-service.fetch.com${nextUrl}`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            dogIds = [...dogIds, ...data.resultIds];
            nextUrl = data.next || "";

            const dogObj = await fetch(
                "https://frontend-take-home-service.fetch.com/dogs",
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dogIds),
                }
            );
            // all the dog information
            const dogData = await dogObj.json();
            // console.log("sorted: ", dogData);
            setDogs(dogData);
            
        };
        fetchDogs();
    }, [filters]);

    
    return (
        <div className="body">
            <h1 className="dogPageHeader">Dogs</h1>
            <FilterDogs onFilterChange={handleFilterChange}/>
            <div className="dogCardsContainer">
                {dogs.length > 0 ? (
                    dogs.map((dog) => {
                        return <DogCard dog={dog} key={dog.id} />;
                    })
                ) : (
                    <div>is Loading...</div>
                )}
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default DogsPage;
