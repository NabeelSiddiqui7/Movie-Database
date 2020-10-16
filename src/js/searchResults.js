import axios from "axios";
import Search from "./models/Search";
import { elements } from "./views/DOMstrings";
import * as searchView from "./views/searchView";
import * as display from "./views/categoriesView";
import * as film from "./views/filmView";
const APIkey = "b058772d74370104d243926428f31dcc";

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

document
  .querySelector(".results-container")
  .addEventListener("click", (event) => {
    if (event.target.className !== "results-container") {
      const id = parseInt(event.target.closest(".result").id);
      const category = event.target.closest(".results-container").id;
      localStorage.setItem("filmData", JSON.stringify(state.results[id]));
      window.location.href = "./filmDetails.html";
    }
  });

export const displayResults = (films, container) => {
  document.getElementById("results-heading").innerHTML +=
    " " + localStorage.getItem("query");
  films.map(async (el) => {
    let title;
    if (el.title.length > 30) {
      title = el.title.slice(0, 30) + "...";
    } else {
      title = el.title;
    }
    const img = await display.getImage(1, el.poster_path);
    const date = film.formatDate(el.release_date);
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="result" id=${films.indexOf(el)}><img src="${
        img ? img : "img/no-poster.jpg"
      }" alt="" /><div class="result-sub-info"><p id="result-title">${title}</p><p id="result-year">${date}</p><p id="result-rating">Rating: ${
        el.vote_average
      }</p></div></div>`
    );
  });
};

const init = async () => {
  state.results = JSON.parse(localStorage.getItem("searchResults"));
  console.log(JSON.parse(localStorage.getItem("searchResults")));
  displayResults(state.results, document.querySelector(".results-container"));
};

init();
