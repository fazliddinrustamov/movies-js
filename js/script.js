let movieList = $(".movie-list-js");
let movieRes = $("#template-movies-js").content;

let movieInfo = movies.map(function(info) {
  return {
    title: info.Title,
    fulltitle: info.fulltitle,
    year: info.movie_year,
    category: info.Categories,
    summary: info.summary,
    img: `https://i3.ytimg.com/vi/${info.ytid}/maxresdefault.jpg`,
    rating: info.imdb_rating,
    runtime: info.runtime,
    lang: info.language,
    ytLink: `https://www.youtube.com/watch?v=${info.ytid}`,
  }
})

let renderMovies = function (movieInfo) {
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

renderMovies(movieInfo);