import { useState, useEffect } from "react";
import dogList from "../components/DogList";
import favoriteDogs from "../Components/Favorites";

export default function DogSearchPage() {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getDogs = async () => {
        const res = await fetch('https://frontend-take-home.fetch.com/dogs', {
            credentials: 'include', 
        });
        const data = await res.json();
        setDogs(data.results || []); 
    };
    fetchDogs();
  }, []);

  return (
    <div className = "grid grid-cols-3 gap-4"> 
        <dogList dogs={dogs} favorites={favorites} setFavorites = {setFavorites}/>
        <favoritesDogs favorites={favorites} setFavorites = {setFavorites} />
    </div>
  );
}