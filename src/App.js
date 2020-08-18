import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  useEffect(() => {
    handleSuggBtn();
  }, []);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMovies = async (pageNum = 1) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`;
    let response = await fetch(url);
    let { results } = await response.json();
    return results;
  };

  const getMovieID = (arr) => {
    if (!arr || !arr.length) return;
    const randomNum = Math.floor(Math.random() * arr.length);
    const movieID = arr[randomNum].id;
    return movieID;
  };

  const getMovieData = (movieID) => {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSuggBtn = async () => {
    setLoading(true);

    // Get Movies Array
    const randomPageNum = Math.floor(Math.random() * 300);
    const moviesArr = await getMovies(randomPageNum);

    // Choose one movie's id from movies list
    const movieID = getMovieID(moviesArr);

    // Get Movies Info
    getMovieData(movieID);

    setLoading(false);
  };

  return (
    <Fragment>
      <Header handleSuggBtn={handleSuggBtn} />
      <main className='main'>
        <Main movie={movie} loading={loading} />
      </main>
    </Fragment>
  );
};

export default App;

// Implementation of : https://stackoverflow.com/questions/47833878/themoviedb-find-random-movie#:~:text=Ping%20%2Fmovie%2Flatest%20to%20get,ll%20have%20to%20re-roll.
//  const getRandomMovie = async () => {
//     // Get Random movie's ID
//     let url = `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
//     let response = await fetch(url);
//     let { id } = await response.json();
//     const movieId = Math.floor(Math.random() * id);
//     console.log(id);
//     console.log(movieId);
//     // Get Movie data
//     let urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
//     let resp = await fetch(urlMovie);
//     let results = await resp.json();
//     if (results.hasOwnProperty("success")) {
//       console.log("not found");
//       getRandomMovie();
//     }
//     console.log(results);
//   };
