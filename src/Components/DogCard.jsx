import "../Components/DogCard.css";

const DogCard = ({dog}) => {
    // create the dog card here.
    const handleFavorite= async () => {
        // handle to add to favorites list logic
        console.log("Favoite button was clicked")

    }

    return (
        <div className="dogCard" key={dog.id}>
            <img className="dogImage" src={dog.img}></img>
            <h2 className="dogName">Name: {dog.name}</h2>
            <p className="dogBreed">Breed: {dog.breed}</p>
            <p className="dogAge">Age: {dog.age}</p>
            <p className="dogZip">Zip-Code: {dog.zip_code}</p>
            <button className="favButton" onClick={handleFavorite}>Favorite</button>
        </div>
    );
}
export default DogCard;
