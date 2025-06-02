import "../Pages/FavoritesPage.css";
import DogCard from '../Components/DogCard'
import { useState, useEffect} from 'react';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = () => {
        try {
            const stored = localStorage.getItem("favorites");
            const parsed = stored ? JSON.parse(stored) : [];
            // sorts it alphabetically by breed
            parsed.sort((a,b) => a.breed.localeCompare(b.breed));
            setFavorites(parsed);
        }catch(error){
            console.error("Failed to parse favorites", error);
            setFavorites([]);
        }
    };
   

    useEffect( () => {
        loadFavorites(); 
    },[]);

    return (
        <div className="body">
            <h1 className="favoritesPageHeader">Favorites Page</h1>
            <div className="favoriteDogsContainer">
                {favorites.length === 0 ? (
                    <p>No dogs have been added to favorites yet.</p>
                ):(
                    favorites.map((dog) => {
                        return <DogCard dog={dog} key={dog.id} onUnfavorited={loadFavorites}/>
                    })
                )}
            </div>
            <div>
                <h1>These dogs have been matched for adoption!</h1>
            </div>
            <div className="footer"></div>
        </div>
        
    )
}

export default FavoritesPage;