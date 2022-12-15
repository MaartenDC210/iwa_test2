const url = window.location.href;
const movieId = url.split('movieId=')[1];
const SPLIT_CHAR = ",";
let selectedMovie = {};
let isLiked;
let likedMovies = localStorage.getItem("likedMovies");
let arrayOfLikedMovies = likedMovies === null ? [] : likedMovies.split(SPLIT_CHAR);

const movieDetailPoster = document.getElementById('image');
const movieDetailTitle = document.getElementById('movieTitle');
const movieDetailMovieRuntime = document.getElementById('movieRuntime');
const movieDetailMovieRoom = document.getElementById('movieRoom');
const movieDetailMoviePlot = document.getElementById('moviePlot');
const movieDetailMovieWriter = document.getElementById('movieWriter');
const movieDetailMovieDirector = document.getElementById('movieDirector');
const movieDetailMovieActors = document.getElementById('movieActors');
const movieDetailMovieGenres = document.getElementById('genreList');
const movieDetailMovieImages = document.getElementById('imagesList');
const movieDetailIslikedButton = document.getElementById('movieLikeIcon');
const movieDetailGoBackButton = document.getElementById('goBackButton');


const onResponse = (response) => {
  selectedMovie = response.find((m) => m.Id === movieId);
  isLiked = getMovieIsLikedForId(selectedMovie.Id);
  setIsLikedIcon(isLiked);
  addMovieDetailsToDOM(selectedMovie);

};

const addMovieDetailsToDOM = (movieDetails) =>{
  console.log(movieDetails);
  const movieDetailGenreBox = document.createElement('p');
  
  movieDetailPoster.src = movieDetails.Poster;
  movieDetailTitle.innerText = movieDetails.Title;
  movieDetailMovieRuntime.innerText = movieDetails.Runtime;
  movieDetailMovieRoom.innerText = `Room: ${movieDetails.Room}`;
  movieDetailMoviePlot.innerText = movieDetails.Plot;
  movieDetailMovieWriter.innerText = movieDetails.Writer;
  movieDetailMovieDirector.innerText = movieDetails.Director;
  movieDetailMovieActors.innerText = movieDetails.Actors.join(' - ');
  
  movieDetails.Genre.forEach( (genre) => addGenresToList(genre));

  movieDetails.Images.forEach( (image) => addImagesToList(image));

}

const addGenresToList = (genre) => {
  const movieDetailGenreBox = document.createElement('p');
  movieDetailGenreBox.className = "movieGenreItem";
  movieDetailGenreBox.innerText = genre;
  movieDetailMovieGenres.appendChild(movieDetailGenreBox);
}

const addImagesToList = (image) => {
  const movieDetailImageBox = document.createElement('img');
  movieDetailImageBox.src = image;
  movieDetailMovieImages.appendChild(movieDetailImageBox);
}

const setIsLikedIcon = (liked) => {
  movieDetailIslikedButton.className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
}

const setIsMovieLikedForId = (movieId, liked) => {
  if(liked){
    const newArrayOfLikedMovies = arrayOfLikedMovies;
    newArrayOfLikedMovies.push(movieId);
    localStorage.setItem('likedMovies', newArrayOfLikedMovies?.join(SPLIT_CHAR));
    setIsLikedIcon(true);
    isLiked = true;
  }
  else{
    const newArrayOfLikedMovies = arrayOfLikedMovies.filter( (m) => m !== movieId);
    localStorage.setItem('likedMovies', newArrayOfLikedMovies?.join(SPLIT_CHAR));
    setIsLikedIcon(false);
    isLiked = false;
  }
}

const getMovieIsLikedForId = (movieId) => {
  return arrayOfLikedMovies?.filter((m) => m === movieId).length > 0
}

movieDetailIslikedButton.addEventListener("click", (event) => {
  if(!isLiked)
    setIsMovieLikedForId(selectedMovie.Id, true);
  else
    setIsMovieLikedForId(selectedMovie.Id, false);
});

movieDetailGoBackButton.addEventListener("click", (event) => {
  history.back();
});



fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
