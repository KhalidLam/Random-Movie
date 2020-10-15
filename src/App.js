import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import {objectToURLString} from "./components/Helper"

import Main from "./pages/Main";
import Filter from "./pages/Filter";

const App = () => {
  useEffect(() => {
    handleSuggBtn();
    // eslint-disable-next-line
  }, []);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [urlParams, setUrlParams] = useState({
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
    "vote_average.gte": 7,
  });

  const getMovies = async (pageNum = 1) => {
    const proxy = "https://api.themoviedb.org/3/discover/movie";
    const paramStr = objectToURLString(urlParams);
    const apikey = process.env.REACT_APP_API_KEY;

    let url = `${proxy}?api_key=${apikey}&page=${pageNum}${paramStr}`;

    let response = await fetch(url);
    let { results } = await response.json();
    console.log("Result :", results );
    return results;
  };

  const getMovieID = (arr) => {
    if (!arr || !arr.length) return;
    const randomNum = Math.floor(Math.random() * arr.length);
    const movieID = arr[randomNum].id;

    return movieID;
  };

  const getMovieData = async (movieID) => {
    const proxy = "https://api.themoviedb.org/3/movie/";
    const apikey = process.env.REACT_APP_API_KEY;

    let url = `${proxy}${movieID}?api_key=${apikey}&append_to_response=videos`;

    await fetch(url)
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
    const randomPageNum = Math.floor(Math.random() * 10);

    const moviesArr = await getMovies(randomPageNum);
    // const moviesArr = await getMovies(1);

    // Choose one movie's id from movies list
    const movieID = getMovieID(moviesArr);

    // Get Movies Info
    getMovieData(movieID);

    setLoading(false);
  };

  const updateFilter = (data) => {

    setUrlParams({
      ...urlParams,
      ...data,
    })

    handleSuggBtn();
  };

  return (
    <Router>
      <Fragment>
        <Header handleSuggBtn={handleSuggBtn} />
        <Switch>
          <Route path='/filter'>
            <Filter updateFilter={updateFilter} />
          </Route>
          <Route path='/'>
            <Main movie={movie} loading={loading} />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
