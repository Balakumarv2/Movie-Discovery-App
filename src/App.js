import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = "de30fa6ce4b0ed18f938f83c1533c02d";
const API_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(`${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);
  }, []);

  const getMovies = async (url) => {
    try {
      const res = await axios.get(url);
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(`${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
    }
  };

  return (
    <div className="movie-app">
      <header className="navbar">
        <h1 className="logo">Movie<span>Flix</span></h1>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
             
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </form>
      </header>

      <main className="movie-grid">
        {movies.length > 0 ? movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="poster-container">
              <img 
                src={movie.poster_path ? IMG_PATH + movie.poster_path : "https://picsum.photos/500/750?grayscale"} 
                alt={movie.title} 
              />
              <div className="overlay">
                <button className="play-btn">
                  
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div className="rating">
                <span className="star-icon">★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )) : <p className="no-results">No movies found. Try a different search!</p>}
      </main>
    </div>
  );
}

export default App;
