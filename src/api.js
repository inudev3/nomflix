import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "fe8acd6deeecdba4087d68916f55a417",
    language: "en-US",
  },
});

export const moviesAPI = {
  nowPlaying: () => api.get("movie/now_playing"),
  upComing: () => api.get("movie/upcoming"),
  TopRated: () => api.get("movie/top_rated"),
  Popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
};
export const tvAPI = {
  TopRated: () => api.get("tv/top_rated"),
  Popular: () => api.get("tv/popular"),
  AiringToday: () => api.get("tv/airing_today"),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: term,
      },
    }),
};
