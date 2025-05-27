import { useState, useEffect} from 'react';

const FilterDogs = ({onFilterChange}) => {
    
    const [availableBreeds, setAvailableBreeds] = useState([]);
    const [breedInput, setBreedInput] = useState("");
    const [filterBreeds, setFilterBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [size, setSize] = useState(25);
    const [from ,setFrom] = useState();
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchBreeds = async () => {
            try{
                const res = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
                    method: "GET", 
                    credentials: "include"
                });
                const dogBreeds = await res.json();
                setAvailableBreeds(dogBreeds);
            }catch(error){
                console.error('Failed to fetch dog breeds', error);
            }
        }
        fetchBreeds();
    }, [])

    useEffect(() => {
        onFilterChange({
            breeds: selectedBreeds,
            size, 
            from,
            sort: `breed:${sortOrder}`
        });
    }, [selectedBreeds, size, sortOrder]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setBreedInput(value);

        if(value.length > 0){
            setFilterBreeds(availableBreeds.filter((breed) => 
                breed.toLowerCase().startsWith(value.toLowerCase())
                )
            );
        }else{
            setFilterBreeds([]);
        }
    };

    const handleSelectBreed = (breed) =>{
        if(!selectedBreeds.includes(breed)){
            setSelectedBreeds([...selectedBreeds, breed]);
        }
        setBreedInput("")
        setFilterBreeds([]);
    }

    const handleRemoveBreed = (breed) =>{
        setSelectedBreeds(selectedBreeds.filter((b) => b !== breed));
    }

    const handleSizeChange = (event) => {
        setSize(parseInt(event.target.value));
    } 

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    }

    return (
        <div>
            <h1>Filter Dogs component</h1>
            <div className='filterContainer'>
                <div className='searchBreedContainer'>
                    <label>Search Breeds:</label>
                    <input type='text' value={breedInput} onChange={handleInputChange} />
                    {filterBreeds.length > 0 && (
                        <ul className='breedDropdown'>
                            {filterBreeds.map((breed) =>(
                                <li key={breed} onClick={() => handleSelectBreed(breed)}> {breed} </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedBreeds.length > 0 && (
                    <div className='selectedBreedsContainer'>
                        <p>Selected Breeds:</p>
                        {selectedBreeds.map((breed) => (
                            <div key={breed}>
                                {breed} <button onClick={() => handleRemoveBreed(breed)}>x</button>
                            </div>
                        ))}
                    </div>
                )}

                <div className='pageSizeDropdownContainer'>
                    <label># of Dogs</label>
                    <select onChange={handleSizeChange} value={size}>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={75}>75</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                
                <div className='sortAlphabeticallyContainer'>
                    <label>Sort Breed Alphabetically in:</label>
                    <select onChange={handleSortChange} value={sortOrder}>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>
                </div>
            </div>
        </div>
        
    )
}

export default FilterDogs;