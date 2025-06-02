import "../Components/DogCard.css";
import { useState, useEffect } from 'react';

const DogCard = ({dog}) => {
    // create the dog card here.
    const [buttonText, setButtonText] = useState("Favorite")

    useEffect(() => {
        const key = "favorites";
        const favorites = JSON.parse(localStorage.getItem(key)) || [];
        const favArr = favorites.map(favorites => String(favorites.id));
        console.log("favArr", favArr)

        // should send an array of favorite dog id's to dogs/match. not returning anything as of now because 
        // not sure if the id's i'm pushing are matched for adoption or not...
        const pushToMatch = async () => {
            const res = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
            method: "POST",
            credentials: "include",
            body:  favArr,
            })
            const matchArr = await res.json();
            // console.log("mathcArr", matchArr);
        }
        
        
        const isFavorited = favorites.some((favDog) => favDog.id === dog.id);
        setButtonText(isFavorited ? "Unfavorite" : "Favorite");
        pushToMatch();
}, [dog.id]);

    const handleFav = async () => {
        // handle to add to favorites list logic
        const key = "favorites";

        let favorites = JSON.parse(localStorage.getItem(key)) || [];

        const isFavorited = favorites.some((favDog) =>  favDog.id === dog.id);

        if(isFavorited){
            favorites = favorites.filter((favDog) => favDog.id !== dog.id);
            setButtonText("Favorite");
        }
        else{
            favorites.push(dog);
            setButtonText("Unfavorite");
        }

        localStorage.setItem(key, JSON.stringify(favorites));

        
    };
    
    return (
        <div className="dogCard" key={dog.id}>
            <img className="dogImage" src={dog.img}></img>
            <h2 className="dogName">Name: {dog.name}</h2>
            <p className="dogBreed">Breed: {dog.breed}</p>
            <p className="dogAge">Age: {dog.age}</p>
            <p className="dogZip">Zip-Code: {dog.zip_code}</p>
            {/* <p className="dogLocation">City: {location.city}</p> */}
            <button className="favButton" onClick={handleFav}>{buttonText}</button>
        </div>
    );
}
export default DogCard;
