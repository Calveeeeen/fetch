import { useState, useEffect, useRef } from "react";
import DogCard from "../Components/DogCard";
import "../Pages/DogsPage.css";
import Paginating from "../Components/Pagination";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DogsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dogs, setDogs] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [breedInput, setBreedInput] = useState("");
    const [filterBreed, setFilterBreed] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filters, setFilters] = useState({
        breeds: `${filterBreed}`,
        size: 25,
        form: 0,
        sort: `breed:${sortOrder}`,
    });
    const [queryParam, setQueryParam] = useState(
        "/dogs/search?size=25&sort=breed%3Aasc"
    );
    // because of this max results limit, unless you are searching for a dog breed that is sorted alphabetically
    // later than Irish Wolfhound it will not populate to the last page of the pagination. Assuming because there
    // are more than 10,000 dogs in the database. However if you're looking for a breed past Irish Wolfhound and you
    // search for it, it'll populate the dog cards accordingly until it maxes out the 10,000 dog results.
    const [numPost, setNumPosts] = useState(10000);
    const [pageMap, setPageMap] = useState({ 1: `${queryParam}` });
    const fullPageMap = {};
    const maxPages = Math.ceil(numPost / filters.size);
    const base = "/dogs/search?";
    const currentPageRef = useRef(1);

    useEffect(() => {
        // fetch breeds
        const fetchBreeds = async () => {
            try {
                const breedRes = await fetch(
                    "https://frontend-take-home-service.fetch.com/dogs/breeds",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const fetchBreedsData = await breedRes.json();
                setBreeds(fetchBreedsData);
            } catch (error) {
                console.error("failed to fetch breeds: ", error);
            }
        };
        fetchBreeds();
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchDogs = async () => {
            let dogIds = [];
            let nextUrl = queryParam;

            // fetch dog data
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

            // use this for the pagination, max amount of results from the database (10,000)
            setNumPosts(data.total);

            for (let i = 1; i <= maxPages; i++) {
                const from = (i - 1) * filters.size;
                const updatedFilters = { ...filters, from: from };
                setFilters(updatedFilters);
                const pageQuery = base + buildQuery(filters);
                fullPageMap[i] = pageQuery;
            }
            setPageMap((prev) => {
                const nextPage = currentPageRef.current + 1;
                if (!prev[nextPage] || prev[nextPage] !== data.next) {
                    return { ...prev, [nextPage]: data.next };
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

            // fetch location data. match locations to dog.zip_codes
            // const fetchDogLocation = await fetch(`https://frontend-take-home-service.fetch.com/locations/search`, {
            //     method: "POST", 
            //     credentials: "include"
            // })

            // const locationData = await fetchDogLocation.json();
            // const locationDataArr = locationData.results;
            // console.log("location data", locationDataArr);

            // const zipCodeToLocation = {};
            // locationDataArr.forEach(location => { 
            //     zipCodeToLocation[location.zip_code] = location;
            // });

            // console.log("zipCodeToLocation", zipCodeToLocation);
            // const dogLocationData = dogs.map(dog => ({...dog, location: zipCodeToLocation[dog.zip_code] || null}));

            // all the dog information
            const dogData = await dogObj.json();
            if (!cancelled) {
                setDogs(dogData);
            }
        };
        fetchDogs();
        return () => {
            cancelled = true;
        };
    }, [queryParam]);

    useEffect(() => {
        const updatedFilters = { ...filters, breeds: filterBreed, from: 0 };
        setFilters(updatedFilters);

        const str = buildQuery(updatedFilters);
        const nextUrl = base.concat(str);

        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    }, [filterBreed]);

    const handleSortOrder = (event) => {
        const value = event.target.value;
        setSortOrder(value);

        const updatedFilters = { ...filters, sort: `breed:${value}`, from: 0 };
        setFilters(updatedFilters);

        const str = buildQuery(updatedFilters);
        const nextUrl = base.concat(str);
        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    };

    const handleSizeChange = (event) => {
        const value = parseInt(event.target.value);
        const updatedFilters = {
            ...filters,
            size: value,
            sort: `breed:${sortOrder}`,
            from: 0,
        };
        setFilters(updatedFilters);
        const str = buildQuery(updatedFilters);
        let nextUrl = base.concat(str);
        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    };

    const buildQuery = (filters) => {
        const param = new URLSearchParams();

        //
        if (filters.breeds) {
            // param.append("breeds", filters.breeds)
            filters.breeds.forEach((breed) => param.append("breeds", breed));
        }
        if (filters.size) {
            param.append("size", filters.size);
        }
        if (filters.sort) {
            param.append("sort", filters.sort);
        }
        if (filters.from !== undefined) {
            param.append("from", filters.from);
        }
        return param.toString();
    };

    const handleRemoveBreed = (breedToRemove) => {
        const updated = filterBreed.filter((b) => b !== breedToRemove);
        setFilterBreed(updated);

        const updatedFilters = { ...filters, breeds: updated, from: 0 };
        setFilters(updatedFilters);

        const str = buildQuery(updatedFilters);
        const nextUrl = base.concat(str);

        currentPageRef.current = 1;
        setCurrentPage(1);
        setQueryParam(nextUrl);
    };

    const handleSuggestions = (b) => {
        setFilterBreed((prev) => {
            const updated = [...prev, b];

            const updatedFilters = { ...filters, breeds: updated, from: 0 };
            setFilters(updatedFilters);

            const str = buildQuery(updatedFilters);
            const nextUrl = base.concat(str);
            currentPageRef.current = 1;
            setCurrentPage(1);
            setQueryParam(nextUrl);

            return updated;
        });

        setBreedInput("");
    };

    const paginate = (number) => {
        const from = (number - 1) * filters.size;

        const updatedFilters = { ...filters, from: from };
        const str = buildQuery(updatedFilters);
        const nextUrl = base.concat(str);

        if (queryParam === nextUrl) {
            return;
        }

        currentPageRef.current = number;
        setCurrentPage(number);
        setQueryParam(nextUrl);
        console.log(queryParam);
    };

    return (
        <div className="body">
            <h1 className="dogPageHeader">Dogs</h1>
            <p className="disclaimer">Disclaimer: There are too many dogs to display all of them. Please search for the breed(s) that you are looking for.</p>
            <div className="filterPaginationContainer">
                {/* <h1>Filter Container</h1> */}
                <div className="filterContainer">
                    <div className="breedsList">
                        <input
                            id="breedSearch"
                            type="text"
                            placeholder="search the breed you're looking for"
                            onChange={(event) =>
                                setBreedInput(event.target.value)
                            }
                            value={breedInput}></input>
                        {/* dropdown suggestion */}
                        {breedInput && (
                            <ul className="breedSuggestions">
                                {breeds
                                    .filter((b) => b.toLowerCase().includes(breedInput.toLowerCase()) && !filterBreed.includes(b)).map((b) => (
                                        <li key={b} onClick={() => handleSuggestions(b)}> {b}</li>
                                    ))}
                            </ul>
                        )}
                        {/* selected breeds to filter */}
                        <div className="selectedBreeds">
                            {filterBreed.map((breed) => (
                                <div className="selectedBreed" key={breed}>
                                    {breed}
                                    <button onClick={() =>handleRemoveBreed(breed)}>x</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <select  className="sizeContainer" onChange={handleSizeChange}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                </select> */}
                {/* <select className="sortContainer"  onChange={handleSortOrder} value={sortOrder}>
                    <option value="asc">Breed by A-Z</option>
                    <option value="desc">Breed by Z-A</option>
                </select> */}
                {/* MaterialUI Integration */}
                <Box sx={{ minWidth: 120 }} className="sizeContainer">
                    <FormControl fullWidth>
                        <InputLabel>Size</InputLabel>
                        <Select value={filters.size} label="Size" onChange={handleSizeChange}>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={75}>75</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 150}} className="sortContainer">
                    <FormControl fullWidth>
                        <InputLabel>Sort Order</InputLabel>
                        <Select value={sortOrder} label="Sort Order" onChange={handleSortOrder}>
                            <MenuItem value="asc">Breed by A-Z</MenuItem>
                            <MenuItem value="desc">Breed by Z-A</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Paginating
                    size={filters.size}
                    totalPost={numPost}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div className="dogCardsContainer">
                {dogs.length > 0 ? (
                    dogs.map((dog) => {
                        return <DogCard dog={dog} key={dog.id} location={dog.location}/>;
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
