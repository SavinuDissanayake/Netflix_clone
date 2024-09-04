import React, { useState, useEffect } from 'react';
import axios from  './axios';
import requests from './requests';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original"

const Row = ({title, fetchUrl, isLargeRow}) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, settrailerUrl] = useState("");

    useEffect(()=>{
        // so basically when we have [] in the useEffect hook run this useEffect once and never run it again.
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(movies)
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    
    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    
    function handleClick(movie){
        if(trailerUrl){
            settrailerUrl('');
        }else{
            movieTrailer(movie?.title || movie?.name || movie?.original_title).then((url) =>{
                const urlParams = new URLSearchParams(new URL(url).search); 
                settrailerUrl(urlParams.get("v"));
            }).catch((error) => console.log(movie));
        }
    }
      
    return ( 
        <div className="row">
            <h1 className="title">{title}</h1>
            <div className="row_posters">
                {movies.map(movie => (
                  <img
                      key={movie.id}
                      onClick = {()=>handleClick(movie)}
                      className={`row_poster ${isLargeRow?"row_posterLarge":""}`} // Everything gets a row_poster class but if it is a isLargeRow the it gets an additional class row_posterLarge
                      src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} //remeber this is how combine two string variables together
                      alt={movie.name}/>
                ))}
            </div>
            
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
     );
}

export default Row;