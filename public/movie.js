const onResponse = (response) => {};

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
