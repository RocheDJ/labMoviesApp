import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getTVPrograms } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const HomePage = (props) => {
  const { tvData, errorTv, isLoadingTv, isErrorTv } = useQuery(
    "discoverTV",
    getMovies
  );

  const { data, error, isLoading, isError } = useQuery(
    "discoverMovies",
    getMovies
  );

  // retrieve the movie data
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  //retrieve the tv data
  if (isLoadingTv) {
    console.log("loading TV");
    return <Spinner />;
  }

  if (isErrorTv) {
    return <h1>{errorTv.message}</h1>;
  }

  const tvPrograms = tvData ? tvData.results : [];

  console.log({ movies });
  console.log({ tvPrograms });
  // dynamic title
  let sTitle = "Discover Movies and TV";

  return (
    <PageTemplate
      title={sTitle}
      movies={movies}
      tvPrograms={tvPrograms}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );
};
export default HomePage;
