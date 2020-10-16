import { elements } from "./DOMstrings";
import axios from "axios";

const APIkey = "b058772d74370104d243926428f31dcc";

export const displayBackdrop = async (imagePath) => {
  const img = await getImage(6, imagePath);
  if (img) {
    elements.backdropContainer.insertAdjacentHTML(
      "afterbegin",
      `<img src="${img}" alt="" id="backdrop" />`
    );
  }
};

export const setFilmData = async (data) => {
  formatDate(data.release_date);
  elements.filmTitle.innerHTML = data.title;
  elements.filmYear.innerHTML =
    "<span>Release Date: </span>" + formatDate(data.release_date);
  elements.filmRating.innerHTML = "<span>Rating: </span>" + data.vote_average;
  elements.filmDescription.innerHTML = data.overview
    ? data.overview
    : "No Description";
  const poster = await getImage(3, data.poster_path);
  elements.descriptionContainer.insertAdjacentHTML(
    "beforeend",
    `<img src="${poster}" alt="" id=film-poster />`
  );
};

export const displayRecommended = (films, container) => {
  films.map(async (el) => {
    let title;
    if (el.title.length > 30) {
      title = el.title.slice(0, 30) + "...";
    } else {
      title = el.title;
    }
    const img = await getImage(1, el.poster_path);
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="movie-link" title=${el.title.replace(
        /[ ]/g,
        "\u00a0"
      )}><div class="movie" id=${films.indexOf(el)}><img src="${
        img ? img : "img/no-poster.jpg"
      }" alt="" /><p>${title}</p></div><div>`
    );
  });
};

export const formatDate = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const splitDate = date.split("-");
  const formattedDate = months[parseInt(splitDate[1]) - 1];
  return formattedDate + " " + splitDate[2] + ", " + splitDate[0];
};

export const formatGenres = (genres) => {
  const genreString = genres.join(", ");
  elements.filmGenres.innerHTML = "<span>Genres: </span>" + genreString;
};

export const formatCast = (cast) => {
  const castString = cast.join(", ");
  elements.filmCastList.innerHTML = "<span>Cast: </span>" + castString;
};

const getImage = async (size, posterpath) => {
  const config = await axios(
    `https://api.themoviedb.org/3/configuration?api_key=${APIkey}`
  );
  const baseURL = config.data.images.base_url;
  const imageSize = config.data.images.poster_sizes[size];
  return posterpath ? `${baseURL + imageSize + posterpath}` : null;
};


