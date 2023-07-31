import React, { useEffect } from "react";
import { getUpCommingMovies,getTrendingTvPrograms } from "../api/tmdb-api";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";

import Spinner from "../components/spinner";
// Icons on Cards for Favorites
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";

// Icons on Cards for WatchList
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    "discoverUpCommingMovies",
    getUpCommingMovies
  );
  const tvResponse = useQuery("discoverTrendingTV", getTrendingTvPrograms);
  const [ tvOrMovie, setTvOrMovie ] = React.useState("movie");
  

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  //retrieve the tv data

  if (tvResponse.isLoading) {
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
      title="Upcoming"
      movies={movies}
      tvPrograms={tvPrograms}
      TVMovieChange={TVMovieChange}
      faveIconAction={(movie) => {
        return <AddToFavouritesIcon movie={movie} tvOrMovie={tvOrMovie} />;
      }}
      removeFaveIconAction={(movie) => {
        return <RemoveFromFavouritesIcon movie={movie} tvOrMovie={tvOrMovie} />;
      }}
      addToPlaylistIconAction={(movie) => {
        return <AddToPlaylistIcon movie={movie} tvOrMovie={tvOrMovie} />;
      }}
      removeFromPlaylistIconAction={(movie) => {
        return <RemoveFromPlaylistIcon movie={movie} tvOrMovie={tvOrMovie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;
