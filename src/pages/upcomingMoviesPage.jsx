import React, { useState, useEffect } from "react";
import { getUpCommingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";

import PageTemplate from '../components/templateMovieListPage'

import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

import Spinner from "../components/spinner";
const UpcomingMoviesPage = (props) => {
 
  const { data, error, isLoading, isError } = useQuery("discoverUpCommingMovies", getUpCommingMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];


  useEffect(() => {
    getUpCommingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Up comming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;
