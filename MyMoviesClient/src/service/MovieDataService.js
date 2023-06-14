import axios from 'axios'

const MOVIE_API_URL = 'https://localhost:7219/api/movies'

class MovieDataService {

    retrieveAllMovies() {
        return axios.get(`${MOVIE_API_URL}/`);
    }

    retrieveMovie(id) {
        return axios.get(`${MOVIE_API_URL}/${id}`);
    }

    deleteMovie(id) {
        return axios.delete(`${MOVIE_API_URL}/${id}`);
    }

    fetchMovies() {
        return axios.get(`${MOVIE_API_URL}/fetch`);
    }
    
    updateMovie(movie) {
        return axios.put(`${MOVIE_API_URL}/`, movie);
    }

    createMovie(movie) {
        return axios.post(`${MOVIE_API_URL}/`, movie);
    }
  }
export default new MovieDataService()