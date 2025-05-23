import { useState, useEffect } from "react";

const DogsPage = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            let dogIds = [];
            let nextUrl = "/dogs/search";

            const res = await fetch(
                `https://frontend-take-home-service.fetch.com${nextUrl}`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            dogIds = [...dogIds, ...data.resultIds];
            nextUrl = data.next || "";

            const dogObj = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
                method: "POST", 
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dogIds)
            })
            // all the dog information
            const dogData = await dogObj.json();
            
            setDogs(dogData);
        };
        fetchDogs();
        
    }, []);
    
    console.log(dogs);
    
    return (
        <div>
            <div className="dogCardsContainer">
                {dogs.length>0 ? (
                    dogs.map((dog) => {
                        {console.log(dog.name)}
                        return(
                            <div className="dogCard" key={dog.id}>
                                <img className="dogImage" src={dog.img}></img>
                                <h2 className="dogName">{dog.name}</h2>
                                <p className="dogBreed">{dog.breed}</p>
                                <p className="dogAge">{dog.age}</p>
                                <p className="dogZip">{dog.zip_code}</p>
                            </div>
                        )
                    })
                ) : (
                    <div>is Loading...</div>
                ) } 
                
            </div>  
        </div>
    );
};

export default DogsPage;
