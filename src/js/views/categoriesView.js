import { elements } from "./DOMstrings";
import axios from "axios";

const APIkey = "b058772d74370104d243926428f31dcc";

export const displayCategory = (films, container) => {
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

export const getImage = async (size, posterpath) => {
  const config = await axios(
    `https://api.themoviedb.org/3/configuration?api_key=${APIkey}`
  );
  const baseURL = config.data.images.base_url;
  const imageSize = config.data.images.poster_sizes[size];
  return posterpath ? `${baseURL + imageSize + posterpath}` : null;
};
