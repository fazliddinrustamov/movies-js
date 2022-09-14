let movieList = $(".movie-list-js");
let movieRes = $("#template-movies-js").content;

let searchForm = $(".wrapper-form-js");
let searchPlace = $(".search-movie-js", searchForm);

let elModalMovie = $(".js-modal-movie");
let elRatingInput = $(".rating-js");

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
    imdbId: info.imdb_id,
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
    
    elCloneMovie.querySelector(".js-result-item").dataset.movieId = movie.imdbId;
    elCloneMovie.querySelector(".movie-img-js").src = movie.img;
    elCloneMovie.querySelector(".movie-img-js").alt = movie.title;
    elCloneMovie.querySelector(".movie-img-js").width = 250;
    elCloneMovie.querySelector(".movie-img-js").height = 200;
    elCloneMovie.querySelector(".movie-title-js").textContent = movie.title;
    elCloneMovie.querySelector(".movie-runtime-js").textContent = `Runtime: ${movie.runtime}`;
    elCloneMovie.querySelector(".movie-language-js").textContent = `Language: ${movie.lang}`;
    elCloneMovie.querySelector(".movie-year-js").textContent = `Year: ${movie.year}`;
    elCloneMovie.querySelector(".movie-rating-js").textContent = `Rating: ${movie.rating}`;
    elCloneMovie.querySelector(".movie-ytlink-js").href = movie.ytLink;
    elCloneMovie.querySelector(".movie-ytlink-js").textContent = "Trailer";

    elMovieWrapper.appendChild(elCloneMovie);
  })

  movieList.appendChild(elMovieWrapper);
}

let findMovies = (title, minimumRating) => {
  return movieInfo.filter(movie => {
    return movie.title.match(title) && movie.rating > minimumRating;
  })
}

let movieSearchArr = [];

searchForm.addEventListener('submit', function(evt){
  evt.preventDefault();

  let searchPlaceConfigured = searchPlace.value.trim();
  let searchingRegex = new RegExp(searchPlaceConfigured, 'gi');
  let minRating = Number(elRatingInput.value)

  let searchResults = findMovies(searchingRegex, minRating);

  movieSearchArr.push(searchResults);
  
  searchPlace.value = '';
  elRatingInput.value = '';

  renderMovies(searchResults);
});

renderMovies(movieInfo.slice(50, 71));

movieList.addEventListener('click', evt => {
  if(evt.target.matches('.js-movie-info-button')){
    let filmId = evt.target.closest(".js-result-item").dataset.movieId;
    
    
    let foundFilms = movieInfo.find(film => {
      return film.imdbId === filmId;
    })

    $('.js-modal-movie-title', elModalMovie).textContent = foundFilms.title;
    $('.js-modal-movie-summary', elModalMovie).textContent = foundFilms.summary;
  }
})