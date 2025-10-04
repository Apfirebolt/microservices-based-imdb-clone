import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    searchMovies: ref([]),
    upcomingMovies: ref([]),
    topRatedMovies: ref([]),
    top250Movies: ref([]),
    loading: ref(false),
  }),

  getters: {
    getSearchMovies() {
      return this.searchMovies;
    },
    getUpcomingMovies() {
      return this.upcomingMovies;
    },
    getTopRatedEnglishMovies() {
      return this.top250Movies;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getSearchMoviesAction(query, page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`imdb/autocomplete?query=${query}`);
        this.searchMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getMostPopularAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/most-popular-movies');
        this.mostPopularMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getUpcomingMoviesByCountryAction(countryCode, page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`imdb/upcoming-releases?countryCode=${countryCode}&type=MOVIE`);
        this.upcomingMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTop250Action() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top250-movies');
        console.log(response.data);
        this.top250Movies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetMovieData() {
      this.topRatedMovies = [];
      this.lowestRatedMovies = [];
      this.top250Movies = [];
      this.mostPopularMovies = []
    },
  },
});
