import React, { useState, useEffect } from "react";
import { getUpCommingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage'
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  
  // const favourites = movies.filter(m => m.favourite)
  // localStorage.setItem('favourites', JSON.stringify(favourites))

  // const addToFavourites = (movieId) => {
  //   const updatedMovies = movies.map((m) =>
  //     m.id === movieId ? { ...m, favourite: true } : m
  //   );
  //   setMovies(updatedMovies);
  // };

  useEffect(() => {
    getUpCommingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Upcomming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;
