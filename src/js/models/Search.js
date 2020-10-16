import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
    
  }

  async getResults() {
    const APIkey = "b058772d74370104d243926428f31dcc";

    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&language=en-US&query=${this.query}&page=1&include_adult=false`
    );
    this.result = response.data.results;
  }
}
