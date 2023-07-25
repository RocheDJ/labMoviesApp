import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getTVPrograms } from "../api/tmdb-api";
import { useQuery,useQueries } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";


const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery( "discoverMovies",getMovies);
  const tvResponse = useQuery( "discoverTV",getTVPrograms);
 

  // retrieve the movie data
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>`There was an error reading Movie Data`${error.message}</h1>;
  }

  const movies = data ? data.results : [];

  //retrieve the tv data

   if (tvResponse.isLoading) {
    console.log("Loading TV Data");
     return <Spinner />;
   }

   if (tvResponse.isError) {
     return <h1>`There was an error reading TV Data`${tvDataResponse.error.message}</h1>;
   }

  const tvPrograms = tvResponse.data ? tvResponse.data.results : [];// tvDataResponse.data ? tvDataResponse.data.results : [];

  // dynamic title
  let sTitle = "Discover Movies and TV";

 const TVMovieChange = (value) => {
  props.handleTVMovieChange(value);
 }

  return (
    <PageTemplate
      title={sTitle}
      movies={movies}
      tvPrograms={tvPrograms}
      TVMovieChange={TVMovieChange}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );
};
export default HomePage;
