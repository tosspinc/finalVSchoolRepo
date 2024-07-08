import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './components/Movies.jsx'; 
import MovieForm from './components/MovieForm.jsx';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);

  function getMovies() {
    axios.get('/api/movies')
      .then(res => {
        console.log(res.data)
        setMovies(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function addMovie(newMovie) {
    axios.post('/api/movies', newMovie)
      .then(res => {
        setMovies(prevMovies => [...prevMovies, res.data]);
      })
      .catch(err => console.log(err));
  }

  function deleteMovie(movieId) {
    axios.delete(`/api/movies/${movieId}`)
      .then(() => {
        setMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
      })
      .catch(err => console.log(err));
  }

  function editMovie(updates, movieId) {
    axios.put(`/api/movies/${movieId}`, updates)
      .then(res => {
        setMovies(prevMovies => prevMovies.map(movie => movie._id !== movieId ? movie : res.data));
      })
      .catch(err => console.log(err));
  }

  function handleFilter(e){
    if (e.target.vale === "reset"){
      getMovies()  
      }else {
        axios.get(`/movies/search/genre?genre?=${e.target.value}`)
      .then(res => {
        setMovies(res.data)
      })
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div className='movie-container'>
        <div className='add-movie'>
          <MovieForm 
            submit={addMovie} 
            btnText="Add Movie" 
          />

          <h4>Filter By Genre</h4>
          <select onChange={handleFilter} className='filter-form'>
            <option value="reset">All Movies</option>
            <option value="action">Action</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
          </select>
        </div>
        {Array.isArray(movies) && movies.map(movie =>
          <Movies
            {...movie}
            key={movie._id}
            deleteMovie={deleteMovie}
            editMovie={editMovie}
          />
        )}
      </div>
    </div>
  );
}