import axios from "axios";
const APIkey = "b058772d74370104d243926428f31dcc";

export default class Categories {
  async getPopular() {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`
    );
    this.popular = response.data.results;
  }

  async getNowPlaying() {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=1`
    );
    this.nowPlaying = response.data.results;
  }

  async getAction() {
    const response = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`
    );
    this.action = response.data.results;
  }

  async getDrama() {
    const response = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18`
    );
    this.drama = response.data.results;
  }

  async getSciFi() {
    const response = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878`
    );
    this.sciFi = response.data.results;
  }

  async getComedy() {
    const response = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`
    );
    this.comedy = response.data.results;
  }

  async getHorror() {
    const response = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`
    );
    this.horror = response.data.results;
  }
}
