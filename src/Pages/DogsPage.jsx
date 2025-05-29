import { useState, useEffect } from "react";
import DogCard from "../Components/DogCard";
import "../Pages/DogsPage.css";
import { useNavigate } from 'react-router';

const DogsPage = () => {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterBreed, setFilterBreed] = useState("");
    const [filters, setFilters] = useState({breeds: `${filterBreed}`, size: 25, form: 0, sort:`breed:${sortOrder}`});
    const [queryParam, setQueryParam] = useState("/dogs/search?size=25&sort=breed%3Aasc")
    const base = '/dogs/search?'

    useEffect(() => {
        const fetchDogs = async () => {
            let totalRes;
            // setQueryParam(filters);
            let dogIds = [];
            let nextUrl = queryParam;
            // console.log(nextUrl);
            const res = await fetch(
                `https://frontend-take-home-service.fetch.com${nextUrl}`,
                {
                    credentials: "include",
                }
            );
            // console.log("nextUrl", nextUrl)
            const data = await res.json();
            console.log("data.next url", data.next);
            dogIds = [...data.resultIds];
            nextUrl = data.next || "";
            // use this for the pagination, total amount of results from the database (10,000)
            totalRes = data.total;

            const dogObj = await fetch(
                `https://frontend-take-home-service.fetch.com/dogs`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dogIds),
                }
            );
            // all the dog information
            const dogData = await dogObj.json();
            console.log("dogData", dogData);
            setDogs(dogData);

            // doesn't work 
            // const filteredDogs = await fetch("https://frontend-take-home-service.fetch.com/dogs", 
            //     {
            //         method: "POST",
            //         credentials: "include",
            //         body: JSON.stringify(dogIds)
            //     }
            // );
            // const filteredDogData = await filteredDogs.json();
            // if(dogData.breed === filterBreed){
            //     filteredDogData.push(dogData)
            // }

            // console.log("filtered:", filteredDogData);
        };
        fetchDogs();
        console.log("new query", queryParam);
    }, [filters, queryParam]);

    const handleFilterBreed = (event) => {
        event.preventDefault();
        console.log("enter has been hit");
        
        const updatedFilters = {...filters, breeds: filterBreed};
        setFilters(updatedFilters);
        

        
        const str = buildQuery(updatedFilters);
        // console.log("str", str);
        let nextUrl = base.concat(str);
        // console.log("nextUrl",nextUrl);
        setQueryParam(nextUrl);
    }
    const handleSortOrder = (event ) => {
        const value = event.target.value;
        console.log("value of sort: ", value);
        const updatedFilters = {...filters, sort: `breed:${value}`}
        setSortOrder(value);
        setFilters(updatedFilters)

        const str = buildQuery(updatedFilters);
        let nextUrl = base.concat(str);
        setQueryParam(nextUrl);
    };

    const handleSizeChange = (event)=>{
        const value = parseInt(event.target.value);
        const updatedFilters = {...filters, size: value};
        setFilters(updatedFilters)
        const str = buildQuery(updatedFilters);
        let nextUrl = base.concat(str);
        setQueryParam(nextUrl)
    }

    const buildQuery = (filters) => {
        const param = new URLSearchParams();
        
        // filters.breeds.forEach((breed) => param.append("breeds", breed));
        if(filters.breeds){
            param.append("breed", filters.breeds)
        }
        if(filters.size){
            param.append("size", filters.size)
        }
        if(filters.sort){
            param.append("sort", filters.sort);
        }
        if(filters.from !== undefined){
            param.append('from', filters.from);
        }

        return param.toString();
    }

    // console.log("endpoint: ", buildQuery(filters))
    return (
        <div className="body">
            <h1 className="dogPageHeader">Dogs</h1>
            <div>
                <h1>Filter Container</h1>
                <form onSubmit={handleFilterBreed}>
                    <input type='text' placeholder="search the breed you're looking for" onChange={(event) => (setFilterBreed(event.target.value))} value={filterBreed}></input>
                    <button type="submit">Submit</button>
                </form>
                <select onChange={handleSizeChange}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                </select>
                <select onChange={handleSortOrder} value={sortOrder}>
                    <option value="asc">Breed by A-Z</option>
                    <option value="desc">Breed by Z-A</option>
                </select>
            </div>
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
