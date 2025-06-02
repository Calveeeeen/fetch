import "../Components/DogCard.css";
import { useState, useEffect } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {createTheme,ThemeProvider,getContrastRatio,} from '@mui/material/styles';

const darkYellow = "#FFA900";

const theme = createTheme({
  palette: {
    darkYellow: {
      main: darkYellow,
      contrastText: getContrastRatio(darkYellow, '#60158f') > 4.5 ? '#60158f' : '#111',
    },
  },
});

const DogCard = ({dog}) => {
    // create the dog card here.
    const [buttonText, setButtonText] = useState("Favorite")

    useEffect(() => {
        const key = "favorites";
        const favorites = JSON.parse(localStorage.getItem(key)) || [];
        
        const isFavorited = favorites.some((favDog) => favDog.id === dog.id);
        setButtonText(isFavorited ? "Unfavorite" : "Favorite");
        
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
        // <div className="dogCard" key={dog.id}>
        //     <img className="dogImage" src={dog.img}></img>
        //     <h2 className="dogName">Name: {dog.name}</h2>
        //     <p className="dogBreed">Breed: {dog.breed}</p>
        //     <p className="dogAge">Age: {dog.age}</p>
        //     <p className="dogZip">Zip-Code: {dog.zip_code}</p>
        //     {/* <p className="dogLocation">City: {location.city}</p> */}
        //     <button className="favButton" onClick={handleFav}>{buttonText}</button>

        // </div>

        // materialUi integration
        <Card className="dogCard" key={dog.id}>
            <ThemeProvider theme={theme}>
                <CardMedia
                    className="dogImage"
                    component="img"
                    alt="dog image"
                    image={dog.img}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="dogName"> Name: {dog.name}</Typography>
                    <Typography className="dogBreed">Breed: {dog.breed}</Typography>
                    <Typography className="dogAge">Age: {dog.age}</Typography>
                    <Typography className="dogZip">ZipCode: {dog.zip_code}</Typography>
                    {/* <Typography className="dogLocation???"></Typography> */}
                </CardContent>
                <CardActions className="CardActions">
                    <Button className="favButton" color="darkYellow" variant="contained" size="medium" onClick={handleFav}>{buttonText}</Button>
                </CardActions>
            </ThemeProvider>
        </Card>
    );
}
export default DogCard;
