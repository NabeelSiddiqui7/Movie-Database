import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/DOMstrings";
import Categories from "./models/Categories";
import * as categoriesView from "./views/categoriesView";
import axios from "axios";
const APIkey = "b058772d74370104d243926428f31dcc";

//Global State of the App
const state = {};

const controlSearch = async () => {
  //1) Get query from search view
  state.query = searchView.getInput();
  if (state.query) {
    //2) Create new search
    state.search = new Search(state.query);

    //3) Get search results
    await state.search.getResults();
    console.log(state.search.result);

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

//Send to film details page
let categoryArray = document.querySelectorAll(".movies-container");
categoryArray.forEach((el) => {
  el.addEventListener("click", (event) => {
    if (event.target.className !== "movie-container") {
      const id = parseInt(event.target.closest(".movie").id);
      const category = event.target.closest(".movies-container").id;
      localStorage.setItem(
        "filmData",
        JSON.stringify(state.categories[category][id])
      );
      window.location.href = "./filmDetails.html";
    }
  });
});

const init = async () => {
  localStorage.clear();
  //1) Create new categories
  state.categories = new Categories();

  //2) Get category results
  await state.categories.getNowPlaying();
  await state.categories.getPopular();
  await state.categories.getSciFi();
  await state.categories.getDrama();
  await state.categories.getAction();
  await state.categories.getComedy();
  await state.categories.getHorror();

  //3) Display categories on UI
  categoriesView.displayCategory(
    state.categories.nowPlaying,
    elements.nowPlayingContainer
  );
  categoriesView.displayCategory(
    state.categories.popular,
    elements.popularContainer
  );
  categoriesView.displayCategory(
    state.categories.action,
    elements.actionContainer
  );
  categoriesView.displayCategory(
    state.categories.drama,
    elements.dramaContainer
  );
  categoriesView.displayCategory(
    state.categories.comedy,
    elements.comedyContainer
  );
  categoriesView.displayCategory(
    state.categories.sciFi,
    elements.sciFiContainer
  );
  categoriesView.displayCategory(
    state.categories.horror,
    elements.horrorContainer
  );
};

init();
