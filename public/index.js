const SPLIT_CHAR = ",";
const movieList = document.getElementById("list");
const searchButton = document.getElementById("formButton");
const searchInput = document.getElementById("input");
const moviesTodayFilterButton = document.getElementById("moviesTodayButton");
const moviesAlpabeticFilterButton = document.getElementById("sortMoviesButton");

let movies = [];
let inputText = "";
let likedMovies = localStorage.getItem("likedMovies");
let arrayOfLikedMovies = likedMovies === null ? [] : likedMovies.split(SPLIT_CHAR);

const onResponse = (response) => {
  movies = response;
  response?.forEach( (movie) => {
    addMovieToDOM(movie);
   });
};


const addMovieToDOM = (movie) => {
  const movieTile = document.createElement("a");
  const movieBox = document.createElement("div");
  const movieImage = document.createElement("img");
  const movieBoxTitle = document.createElement("div");
  const movieTitle = document.createElement("p");
  const movieHeartButton = document.createElement("button");
  const movieHeart = document.createElement("i");

  handleHeart(movieHeartButton, movie.Id);
  
  movieBox.className = "movieBox";
  movieTitle.innerText = movie?.Title;
  movieImage.src = movie?.Poster;
  movieTile.href = `/movie?movieId=${movie.Id}`;
  movieHeart.className = getHeartIcon(movie.Id);

  movieTile.appendChild(movieBox);
  movieBox.appendChild(movieImage);
  movieBox.appendChild(movieBoxTitle);
  movieBoxTitle.appendChild(movieTitle);
  movieBoxTitle.appendChild(movieHeartButton);
  movieHeartButton.appendChild(movieHeart);

  movieList.appendChild(movieTile);
};

const getHeartIcon = (movieId) => {
   return getMovieIsLikedForId(movieId) ? "fa-solid fa-heart" : "fa-regular fa-heart";
}

const getMovieIsLikedForId = (movieId) => {
  return arrayOfLikedMovies?.filter((m) => m === movieId).length > 0
}

const onSearchItems = () => {
  console.log(movies);
  const searchedMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(inputText.toLowerCase())
  );
  console.log(movieList.innerHTML);
  movieList.innerHTML = "";
  console.log(searchedMovies);
  searchedMovies.forEach((movie) => {
    addMovieToDOM(movie);
  });

};

const onFilterMoviesToday = () => { 
  const searchedMovies = movies.filter((movie) => movie.PlaysToday);
  movieList.innerHTML = "";
  searchedMovies.forEach((movie) => {
    addMovieToDOM(movie);
  });
}

const onFilterMoviesAlpabetic = () => {
  console.log(movies);
  const searchedMovies = movies.sort((a, b) => a.Title < b.Title ? -1 : 1);
  console.log(searchedMovies);
  movieList.innerHTML = "";
  searchedMovies.forEach((movie) => {
    addMovieToDOM(movie);
  });
}

const setIsMovieLikedForId = (movieId, liked) => {
  if(liked){
    const newArrayOfLikedMovies = arrayOfLikedMovies;
    newArrayOfLikedMovies.push(movieId);
    localStorage.setItem("likedMovies", newArrayOfLikedMovies?.join(SPLIT_CHAR));
    isLiked = true;
  }
  else{
    const newArrayOfLikedMovies = arrayOfLikedMovies.filter( (m) => m !== movieId);
    localStorage.setItem("likedMovies", newArrayOfLikedMovies?.join(SPLIT_CHAR));
    isLiked = false;
  }
}

const handleHeart = (button, movieId) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if(getMovieIsLikedForId(movieId))
      setIsMovieLikedForId(movieId, false);
    else
      setIsMovieLikedForId(movieId, true);
  });
}

const createHeartButton = () =>{

}

searchButton.addEventListener("click", onSearchItems);
searchInput.addEventListener("input", (event) => {
  inputText = event.target.value;
});
moviesTodayFilterButton.addEventListener("click", onFilterMoviesToday);
moviesAlpabeticFilterButton.addEventListener("click", onFilterMoviesAlpabetic);


fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
