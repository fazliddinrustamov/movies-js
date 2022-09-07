let movieList = $(".movie-list-js");
let movieRes = $("#template-movies-js").content;

let searchForm = $(".wrapper-form-js");
let searchPlace = $(".search-movie-js", searchForm);

let movieInfo = [];

let filterArray = movies.forEach((info) => {
  movieInfo.push({
    title: info.Title.toString(),
    fulltitle: info.fulltitle,
    year: info.movie_year,
    category: info.Categories.split("|"),
    summary: info.summary,
    img: `https://i3.ytimg.com/vi/${info.ytid}/maxresdefault.jpg`,
    rating: info.imdb_rating,
    runtime: info.runtime,
    lang: info.language,
    ytLink: `https://www.youtube.com/watch?v=${info.ytid}`,
  })
});

let renderMovies = function (movieInfo) {
  movieList.innerHTML = '';
  let elMovieWrapper = document.createDocumentFragment();
  
  movieInfo.forEach((movie) => {
    let elCloneMovie = movieRes.cloneNode(true);
    
    elCloneMovie.querySelector(".movie-img-js").src = movie.img;
    elCloneMovie.querySelector(".movie-img-js").alt = movie.title;
    elCloneMovie.querySelector(".movie-img-js").width = 250;
    elCloneMovie.querySelector(".movie-img-js").height = 200;
    elCloneMovie.querySelector(".movie-title-js").textContent = movie.title;
    elCloneMovie.querySelector(".movie-subtitle-js").textContent = movie.fulltitle;
    elCloneMovie.querySelector(".movie-year-js").textContent = `Year: ${movie.year}`;
    elCloneMovie.querySelector(".movie-category-js").textContent = `Category: ${movie.category}`;
    elCloneMovie.querySelector(".movie-rating-js").textContent = `Rating: ${movie.rating}`;
    elCloneMovie.querySelector(".movie-runtime-js").textContent = `Runtime: ${movie.runtime}`;
    elCloneMovie.querySelector(".movie-language-js").textContent = `Language: ${movie.lang}`;
    elCloneMovie.querySelector(".movie-ytlink-js").href = movie.ytLink;
    elCloneMovie.querySelector(".movie-ytlink-js").textContent = "Trailer";

    elMovieWrapper.appendChild(elCloneMovie);
  })

  movieList.appendChild(elMovieWrapper);
}

let findMovies = (title) => {
  return movieInfo.filter(movie => {
    return movie.title.match(title);
  })
}

let movieSearchArr = [];

searchForm.addEventListener('submit', function(evt){
  evt.preventDefault();

  let searchPlaceConfigured = searchPlace.value.trim();
  let searchingRegex = new RegExp(searchPlaceConfigured, 'gi');

  let searchResults = findMovies(searchingRegex);

  movieSearchArr.push(searchResults);
  
  searchPlace.value = '';

  renderMovies(searchResults);
});

renderMovies(movieInfo.slice(0, 50));