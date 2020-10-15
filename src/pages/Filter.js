import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {getLanguageCode, getGenreIds} from "../components/Helper"
import LanguageOptions from "../components/LanguageOptions";

const Filter = ({ updateFilter }) => {
  let history = useHistory();

  const [formData, setformData] = useState({
    "primary_release_date.gte" : "1900",
    "primary_release_date.lte" : "2020",
    language_filter: "main",
    with_original_language: "English",
    "vote_average.gte": "7",
    with_genres: {
      Action: false,
      Adventure: false,
      Animation: false,
      Biography: false,
      Comedy: false,
      Crime: false,
      Documentary: false,
      Drama: false,
      Family: false,
      Fantasy: false,
      History: false,
      Horror: false,
      Music: false,
      Mystery: false,
      Romance: false,
      Sci_Fi: false,
      Thriller: false,
      War: false,
      Western: false,
    },
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (target.type === "checkbox") {
      setformData({ ...formData, with_genres: { ...formData.with_genres, [name]: value } });
    } else {
      setformData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const genre = formData.with_genres;
    const genreArr = Object.keys(genre).filter((key) => genre[key]);
    formData.with_genres = getGenreIds(genreArr).toString();

    formData.with_original_language = getLanguageCode(formData.with_original_language);

    formData.["primary_release_date.gte"] =  formData.["primary_release_date.gte"] + "-01-01";
    formData.["primary_release_date.lte"] =  formData.["primary_release_date.lte"] + "-01-01";

    delete formData.language_filter;

    console.log("formData: ", formData);
    updateFilter(formData);
    history.push("/");
  };

  return (
    <main className='main' style={{ padding: "2rem 4rem" }}>
      <h1 className='text-large'>Set Your Filters</h1>
      <div className='box my-2'>
        <div className='box-body'>
          <form onSubmit={handleSubmit}>
            {/* Filter Box */}
            <div className='filter year'>
              <h2 className='filter-head'>
                Year <span className='text-muted'>(eg. 2010-2020)</span>
              </h2>
              <div className='filter-inputs'>
                <input
                  className='f-input'
                  type='number'
                  min='1900'
                  max={new Date().getFullYear()}
                  name='primary_release_date.gte'
                  id='primary_release_date.gte'
                  value={formData.["primary_release_date.gte"]}
                  onChange={handleChange}
                />
                <input
                  className='f-input'
                  type='number'
                  min='1900'
                  max={new Date().getFullYear()}
                  name='primary_release_date.lte'
                  id='primary_release_date.lte'
                  value={formData.["primary_release_date.lte"]}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Filter Box */}
            <div className='filter language'>
              <h2 className='filter-head'>Language</h2>
              <div className='filter-inputs'>
                <select
                  className='f-input'
                  name='language_filter'
                  id='language_filter'
                  value={formData.language_filter}
                  onChange={handleChange}
                >
                  <option value='ignore'>Ignore this filter</option>
                  <option value='main'>Main language is</option>
                  <option value='one_of'>One of language is</option>
                  <option value='without'>Movie without</option>
                </select>

                <select
                  className='f-input'
                  name='with_original_language'
                  id='with_original_language'
                  value={formData.with_original_language}
                  onChange={handleChange}
                >
                  <LanguageOptions />
                </select>
              </div>
            </div>

            {/* Filter Box */}
            <div className='filter imdb'>
              <h2 className='filter-head'>IMDb Score</h2>
              <div className='filter-inputs'>
                <select
                  id='vote_average.gte'
                  name='vote_average.gte'
                  className='f-input'
                  value={formData.['vote_average.gte']}
                  onChange={handleChange}
                >
                  <option value='9'>rated over 9</option>
                  <option value='8.5'>rated over 8.5</option>
                  <option value='8'>rated over 8</option>
                  <option value='7.5'>rated over 7.5</option>
                  <option value='7'>rated over 7</option>
                  <option value='6.5'>rated over 6.5</option>
                  <option value='6'>rated over 6</option>
                  <option value='ignore'>ignore this filter</option>
                </select>
              </div>
            </div>

            {/* Filter Box */}
            <div className='filter genre'>
              <h2 className='filter-head'>Genre</h2>
              <div className='genre-container'>
                {Object.keys(formData.with_genres).map((key) => (
                  <div className='genre-item' key={key}>
                    <input
                      name={key}
                      id={key}
                      type='checkbox'
                      className='f-checkbox'
                      checked={formData.with_genres[key]}
                      onChange={handleChange}
                    />
                    <label htmlFor={key} className='f-label'>
                      {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button className='btn btn-blue' type='submit'>
              Apply Filters
            </button>

          </form>
        </div>
      </div>
    </main>
  );
};

export default Filter;
