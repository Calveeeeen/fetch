import "../Pages/FavoritesPage.css";
import DogCard from '../Components/DogCard'
import { useState, useEffect} from 'react';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [matchDog, setMatchDog] = useState([]);

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

    const pushToMatch = async () => {
        const key = "favorites"
        const favorites = JSON.parse(localStorage.getItem(key)) || [];
        const favArr = favorites.map(favorites => String(favorites.id));

        const res = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(favArr),
        })
        const {match: matchIds} = await res.json();
        const matched = favorites.filter(dog => matchIds.includes(dog.id));
        setMatchDog(matched);
        // return matchIds;
    }

    useEffect( () => {
        loadFavorites(); 
        // the matched for adoption changes every time the page is refreshed.
        pushToMatch();
    }, []);

    
    return (
        <div className="body">
                <h1 className="matchedDogHeader">This dog has been matched for adoption!</h1>
               <div className="matchedDogContainer">
                {/* materialUI Integration card component */}
                    {matchDog.length === 0 ? (
                        <p>No matches yet...</p>
                    ):(
                        matchDog.map((dog) => (
                            <DogCard dog={dog} key={dog.id} />
                        ))
                    )}
                
            </div>
            <h1 className="favoritesPageHeader">Favorites</h1>
            <div className="favoriteDogsContainer">
                {favorites.length === 0 ? (
                    <p>No dogs have been added to favorites yet.</p>
                ):(
                    favorites.map((dog) => {
                        return <DogCard dog={dog} key={dog.id} onUnfavorited={loadFavorites}/>
                    })
                )}
            </div>
         
            <div className="footer"></div>
        </div>
        
    )
}

export default FavoritesPage;