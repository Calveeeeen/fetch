import "../Pages/FavoritesPage.css";
import DogCard from '../Components/DogCard'
import { useState, useEffect} from 'react';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect( () => {
        try {
            const stored = localStorage.getItem("favorites");
            const parsed = stored ? JSON.parse(stored) : [];

            setFavorites(parsed);
        }catch(error){
            console.error("Failed to parse favorites", error);
            setFavorites([]);
        }
    }, []);

    return (
        <div>
        <h1 className="favoritesPageHeader">Favorites Page</h1>
        <div className="favoriteDogsContainer">
            {favorites.length === 0 ? (
                <p>No dogs have been added to favorites yet.</p>
            ):(
                favorites.map((dog) => {
                    return <DogCard dog={dog} key={dog.id} />
                })
            )}
        </div>
        </div>
        
    )
}

export default FavoritesPage;