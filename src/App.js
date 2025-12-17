import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Star, PlayCircle } from 'lucide-react';
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
    const res = await axios.get(url);
    setMovies(res.data.results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(`${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
    }
  };

  return (
    <div className="movie-app">
      <header>
        <h1 className="logo">Cine<span className="bold">Flix</span></h1>
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><Search size={20} /></button>
          </div>
        </form>
      </header>

      <main className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="poster-container">
              <img src={movie.poster_path ? IMG_PATH + movie.poster_path : "https://via.placeholder.com/500x750"} alt={movie.title} />
              <div className="overlay">
                <button className="play-btn"><PlayCircle size={40} /></button>
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div className="rating">
                <Star size={16} fill="#FFD700" color="#FFD700" />
                <span>{movie.vote_average}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;