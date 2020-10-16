import axios from "axios";
import Film from "./models/Film";
import * as searchView from "./views/searchView";
import Search from "./models/Search";
import * as filmView from "./views/filmView";
import { elements } from "./views/DOMstrings";

const APIkey = "b058772d74370104d243926428f31dcc";
const filmData = JSON.parse(localStorage.getItem("filmData"));

const state = {};

const controlSearch = async () => {
  //1) Get query from search view
  state.query = searchView.getInput();
  if (state.query) {
    //2) Create new search
    state.search = new Search(state.query);

    //3) Get search results
    await state.search.getResults();

    //4) Load search page with data
  }
  
};

elements.searchButton.addEventListener("click", async () => {
  await controlSearch();
  if (state.search) {
    localStorage.setItem("searchResults", JSON.stringify(state.search.result));
    localStorage.setItem("query", state.query);
    window.location.href = "./searchResults.html";
  }
});

document.getElementById("back-button").addEventListener("click", async () => {
  await controlSearch();
  window.location.href = "./searchResults.html";
});

let categoryArray = document.querySelectorAll(".movies-container");
categoryArray.forEach((el) => {
  el.addEventListener("click", (event) => {
    if (event.target.className !== "movie-container") {
      const id = parseInt(event.target.closest(".movie").id);
      const category = event.target.closest(".movies-container").id;
      localStorage.setItem(
        "filmData",
        JSON.stringify(state.film.recommended[id])
      );
      window.location.reload();
      window.scrollTo(0, 0);
    }
  });
});

const init = async () => {
  //Create new film object
  state.film = new Film();
  //Get backdrop image
  await state.film.getImage(filmData.id);
  //Display backdrop
  filmView.displayBackdrop(state.film.backdrop);
  //Get all film data
  await state.film.getGenres(filmData.genre_ids);
  await state.film.getCredits(filmData.id);
  await state.film.getRecommended(filmData.id);
  // Set and display film data
  filmView.setFilmData(filmData);
  filmView.formatGenres(state.film.genres);
  filmView.formatCast(state.film.cast);
  filmView.displayRecommended(
    state.film.recommended,
    elements.recommendedContainer
  );
  if (localStorage.getItem("query")){
    document.getElementById("back-button").style.display = "block";
  }
};

init();
