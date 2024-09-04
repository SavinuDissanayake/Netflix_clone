import { useEffect, useState } from "react";
import axios from './axios';
import requests from './requests';
import './Banner.css';

const Banner = () => {

    const [movie, setMovie] = useState([]);

    useEffect(()=> {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            //so we need to create a random nummber generator because each movie in NetflixOriginal is fall under a number
            //Algorithm for the random number generator is: Math.floor(Math.random()*request.data.length-1) .... this request.data.length is the number of movies in the NetflixOriginal 
            const movie_number = Math.floor(Math.random()*request.data.results.length-1);
            setMovie(request.data.results[movie_number]);
            return request;
        };

        fetchData();

    },[]);

    //this function was copied from google.. the purpose is if the description is too long it would print a couple of lines and then print the ... dots
    function truncate(str,n){
        return str?.length>n ? str.substr(0, n-1)+"...":str;
    }
    
    console.log(movie);

    return ( 
        <header className="banner"
            style={{
                backgroundSize:"cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
                    )`, //this ? sign is there because if for some reason this image becomes undefine the 
                //program won't freakout, it would just say handle alegantly. So basically the question mark is just the a check up to see if the image call is valid or not and if it not 
                //valid, it would handle it rather than giving a error message.
                backgroundPosition: "center center",
                //REVIEW MORE OF THESE STRING CONCAT
            }}
        > {/* give a backgroud image (movie poster) for this header*/}
            <div className="banner_contents">
                {/* Title*/}
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1> {/* ? mark check if the current state is valid or not ... this question mark operator is called OPTIONAL CHAINING */}
                {/*going to have a <div> that contains two buttons [play, mylist]  */}
                <div className="bannner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                 {/* description*/}
                <h1 className="banner_description">
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
            
            <div className="banner-fadeBottom"></div>
        </header>
     );
}
 
export default Banner;