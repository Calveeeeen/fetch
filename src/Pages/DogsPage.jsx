import { useState, useEffect, useRef } from "react";
import DogCard from "../Components/DogCard";
import "../Pages/DogsPage.css";
import { useNavigate } from 'react-router';
import Paginating from "../Components/Pagination";

const DogsPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [dogs, setDogs] = useState([]);
    const [filterBreed, setFilterBreed] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filters, setFilters] = useState({breeds: `${filterBreed}`, size: 25, form: 0, sort:`breed:${sortOrder}`});
    const [queryParam, setQueryParam] = useState("/dogs/search?size=25&sort=breed%3Aasc")
    const [numPost, setNumPosts] = useState(10000);
    const [pageMap, setPageMap] = useState({1:`${queryParam}`});
    const fullPageMap = {};
    const maxPages = Math.ceil(numPost/filters.size);
    const base = '/dogs/search?'
    const currentPageRef = useRef(1);

    useEffect(() => {
        let cancelled = false;
        
        const fetchDogs = async () => {
            let dogIds = [];
            let nextUrl = queryParam;

            console.log("current url", nextUrl);
            const res = await fetch(
                `https://frontend-take-home-service.fetch.com${nextUrl}`,
                {
                    credentials: "include",
                }
            );
            
            const data = await res.json();
            if (cancelled) {
                return;
            }

            dogIds = [...data.resultIds];
            nextUrl = data.next || "";
            
            // use this for the pagination, total amount of results from the database (10,000)
            setNumPosts(data.total);

            for (let i=1; i<=maxPages; i++){
                const from = (i-1)*filters.size;
                const updatedFilters = {...filters, from: from};
                setFilters(updatedFilters);
                const pageQuery = base+ buildQuery(filters);
                fullPageMap[i] = pageQuery;
            };
            setPageMap((prev) => {
                const nextPage = currentPageRef.current+1;
                if(!prev[nextPage] || prev[nextPage]!== data.next){
                    return {...prev, [nextPage]: data.next};
                }    
                return prev;
            });

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
            if(!cancelled){
                setDogs(dogData);
            }
            
            // i think pagination needs to be included before the breed filtering can work. right now it's only filter the currently grabbed dogs(first 25).
            console.log("fetching dog for: ", queryParam);
        };
        fetchDogs();

        return () => {
            cancelled = true;
        }
    }, [queryParam]);
    
    const handleFilterBreed = (event) => {
        event.preventDefault();
        console.log("enter has been hit");
        
        const updatedFilters = {...filters, breeds: filterBreed, from: 0};
        setFilters(updatedFilters);
        
        const str = buildQuery(updatedFilters);
        let nextUrl = base.concat(str);

        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    };

    const handleSortOrder = (event ) => {
        const value = event.target.value;
        console.log("value of sort: ", value);
        const updatedFilters = {...filters, sort: `breed:${value}`}
        setSortOrder(value);
        setFilters(updatedFilters)

        const str = buildQuery(updatedFilters);
        let nextUrl = base.concat(str);
        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    };

    const handleSizeChange = (event)=>{
        const value = parseInt(event.target.value);
        const updatedFilters = {...filters, size: value};
        setFilters(updatedFilters)
        const str = buildQuery(updatedFilters);
        let nextUrl = base.concat(str);
        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    };

    const buildQuery = (filters) => {
        const param = new URLSearchParams();
        
        // filters.breeds.forEach((breed) => param.append("breeds", breed));
        if(filters.breeds){
            param.append("breeds", filters.breeds)
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
    };
    
    const paginate = (number) => {
        const from = (number-1)*filters.size;

        const updatedFilters = {...filters, from: from};
        const str = buildQuery(updatedFilters);
        const nextUrl = base.concat(str);

        if(queryParam === nextUrl){
            return;
        }

        currentPageRef.current = number;
        setCurrentPage(number)
        setQueryParam(nextUrl);
    };


    // console.log(typeof math);
    // console.log("endpoint: ", buildQuery(filters))
    return (
        <div className="body">
            <h1 className="dogPageHeader">Dogs</h1>
            <div>
                <h1>Filter Container</h1>
                <form onSubmit={handleFilterBreed}>
                    <input id="breedSearch" type='text' placeholder="search the breed you're looking for" onChange={(event) => (setFilterBreed(event.target.value))} value={filterBreed}></input>
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
            <Paginating size={filters.size} totalPost={numPost} paginate={paginate} currentPage={currentPage}/>
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
