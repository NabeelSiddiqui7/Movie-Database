import axios from "axios";
import { elements } from "../views/DOMstrings";
const APIkey = "b058772d74370104d243926428f31dcc";

export default class Film {
  constructor() {
    this.genres = [];
    this.cast = [];
  }
  async getImage(id) {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${id}}/images?api_key=${APIkey}&language=en-US&include_image_language=en,null`
    );
    console.log(response.data);
    if (response.data.backdrops.length >= 5) {
      this.backdrop = response.data.backdrops[4].file_path;
    } else if (response.data.backdrops.length < 1) {
      this.backdrops = null;
    } else {
      this.backdrop = response.data.backdrops[0].file_path;
    }
  }

  async getGenres(IDlist) {
    const response = await axios(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`
    );
    const genreList = response.data.genres;
    IDlist = IDlist.slice(0, 3);
    IDlist.forEach((id) => {
      genreList.forEach((genre) => {
        if (id === genre.id) {
          this.genres.push(genre.name);
        }
      });
    });
  }

  async getCredits(id) {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIkey}`
    );
    const castList = response.data.cast;
    for (let i = 0; i < 5; i++) {
      if (castList[i]) {
        this.cast.push(castList[i].name);
      }
    }
  }

  async getRecommended(id) {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APIkey}&language=en-US&page=1`
    );
    this.recommended = response.data.results;
    console.log(this.recommended);
  }
}
