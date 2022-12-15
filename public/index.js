const movies = [];
const movieList = document.getElementById("list");
const onResponse = (response) => {
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

  
  movieBox.className = "movieBox";
  movieTitle.innerText = movie?.Title;
  movieImage.src = movie?.Poster;
  movieTile.href = `/movie?movieId=${movie.Id}`;

  movieTile.appendChild(movieBox);
  movieBox.appendChild(movieImage);
  movieBox.appendChild(movieBoxTitle);
  movieBoxTitle.appendChild(movieTitle);

  movieList.appendChild(movieTile);
};

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
