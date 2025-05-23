
const DogCard = ({dog}) => {
    // create the dog card here.
    return (
        <div className="dogCard" key={dog.id}>
            <img className="dogImage" src={dog.img}></img>
            <h2 className="dogName">{dog.name}</h2>
            <p className="dogBreed">{dog.breed}</p>
            <p className="dogAge">{dog.age}</p>
            <p className="dogZip">{dog.zip_code}</p>
        </div>
    );
}
export default DogCard;
