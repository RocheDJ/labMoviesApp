import React, { useEffect } from "react";
import { getUpCommingMovies,getTrendingTvPrograms } from "../api/tmdb-api";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Spinner from "../components/spinner";
const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    "discoverUpCommingMovies",
    getUpCommingMovies
  );

  const tvResponse = useQuery("discoverTrendingTV", getTrendingTvPrograms);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  //retrieve the tv data

  if (tvResponse.isLoading) {
    console.log("Loading TV Data");
    return <Spinner />;
  }

  if (tvResponse.isError) {
    return (
      <h1>
        `There was an error reading TV Data`${tvDataResponse.error.message}
      </h1>
    );
  }

  const tvPrograms = tvResponse.data ? tvResponse.data.results : []; // tvDataResponse.data ? tvDataResponse.data.results : [];

  const TVMovieChange = (value) => {
    props.handleTVMovieChange(value);
  };

  return (
    <PageTemplate
      title="Up comming Movies and Trending TV"
      movies={movies}
      tvPrograms={tvPrograms}
      TVMovieChange={TVMovieChange}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;
