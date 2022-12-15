const url = window.location.href;
const movieId = url.split('movieId=')[1];

const movieDetailPoster = document.getElementById('image');
const movieDetailTitle = document.getElementById('movieTitle');
const movieDetailMovieRuntime = document.getElementById('movieRuntime');
const movieDetailMovieRoom = document.getElementById('movieRoom');
const movieDetailMoviePlot = document.getElementById('moviePlot');
const movieDetailMovieWriter = document.getElementById('movieWriter');
const movieDetailMovieDirector = document.getElementById('movieDirector');
const movieDetailMovieActors = document.getElementById('movieActors');

//genreList

const onResponse = (response) => {
  const selectedMovie = response.find((m) => m.Id === movieId);
  addMovieDetailsToDOM(selectedMovie);
};

const addMovieDetailsToDOM = (movieDetails) =>{
  movieDetailPoster.src = movieDetails.Poster;
  movieDetailTitle.innerText = movieDetails.Title;
  movieDetailMovieRuntime.innerText = movieDetails.Runtime;
  movieDetailMovieRoom.innerText = `Room: ${movieDetails.Room}`;
  movieDetailMoviePlot.innerText = movieDetails.Plot;
  movieDetailMovieWriter.innerText = movieDetails.Writer;
  movieDetailMovieDirector.innerText = movieDetails.Director;
  movieDetailMovieActors.innerText = movieDetails.Actors.join(' - ');

}

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
