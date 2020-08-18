// API KEY : 2f8d3798a129472d8e5305125ade88bc
// Example : https://api.themoviedb.org/3/movie/550?api_key=2f8d3798a129472d8e5305125ade88bc
//           https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
//           https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
// Images:   https://image.tmdb.org/t/p/w185/oqhuGSl6gp22rIRo52IouPhV4hl.jpg
// https://api.themoviedb.org/3/discover/movie?api_key=2f8d3798a129472d8e5305125ade88bc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1

// DOM Var
var randBtn = document.getElementById("randBtn");

var movieTitle = document.querySelector(".movieName");
var progress = document.querySelector(".progress");
var movieRate = document.querySelector(".rate");
var trailer = document.querySelector(".trailer iframe");

var imdbScore = document.querySelector(".imdb-js");
var genres = document.getElementById("genres");
var lang = document.getElementById("lang");

var moreInfoHead = document.querySelector(".more-info .box-head");
var movieDesc = document.querySelector(".more-info .box-body .desc");
var link = document.getElementById("linkInfo");

//
var movieInfo;
var api = {
  url: "https://api.themoviedb.org/3/discover/movie",
  key: "2f8d3798a129472d8e5305125ade88bc",
};

getMovieID();

randBtn.addEventListener("click", getMovieID);

function getMovieID() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `${api.url}?api_key=${api.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3`,
    true
  );
  xhr.send();

  xhr.onload = function () {
    var results = JSON.parse(xhr.responseText).results;
    var randomNum = Math.floor(Math.random() * results.length);
    var movieID = results[randomNum].id;

    console.log(movieID);

    getMovieInfo(movieID);
  };
}

function getMovieInfo(movieID) {
  var fetchUrl = `http://api.themoviedb.org/3/movie/${movieID}?api_key=2f8d3798a129472d8e5305125ade88bc&append_to_response=videos`;

  fetch(fetchUrl, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      movieInfo = data;
      console.log(data);
      changeUi(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function changeUi(data) {
  // change Title
  movieTitle.innerHTML = `${data.title} <span>${
    data.release_date.split("-")[0]
  }</span>`;

  // change rate  & progress & imdbScore
  progress.style.width = parseFloat(data.vote_average) * 10 + "%";
  movieRate.innerHTML = data.vote_average;
  imdbScore.innerHTML = data.vote_average;

  // Add trailer
  var youtubeLink = `https://www.youtube.com/embed/${data.videos.results[0].key}`;
  trailer.src = youtubeLink;

  // Change genres
  genres.innerHTML = getNameHelper(data.genres).join();

  // Change Language
  lang.innerHTML = getNameHelper(data.spoken_languages).join();

  // more-info head
  moreInfoHead.innerHTML = `${data.title} <span>(${
    data.release_date.split("-")[0]
  })</span>`;

  // more-info body
  movieDesc.innerHTML = data.overview;
  link.href = data.homepage;
}

function getNameHelper(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push(array[i].name);
  }
  return newArray;
}

// var xhr = new XMLHttpRequest();
// xhr.open('GET', `https://api.themoviedb.org/3/movie/${api.param}?api_key=${api.key}`, true);
// xhr.send();

// xhr.onload = function(){
//     var data = JSON.parse(xhr.responseText);
//     console.log(data);
// };
