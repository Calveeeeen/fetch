import { useState, useEffect} from 'react';

const FilterDogs = ({onFilterChange}) => {
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSortOrder = (event ) => {
        const value = event.target.value;
        setSortOrder(value);
    }

    return (
        <div>
            <h1>Filter Component</h1>
            <input type='text' placeholder="search the breed you're looking for" ></input>

            <select onChange={handleSortOrder} value={sortOrder}>
                <option value="asc">Breed by A-Z</option>
                <option value="desc">Breed by Z-A</option>
            </select>
        </div>
        
    )
}

export default FilterDogs;