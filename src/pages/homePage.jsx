import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getTVPrograms } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

// Icons on Cards for Favorites
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";

// Icons on Cards for WatchList
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const HomePage = (props) => {
  const [tvOrMovie, setTvOrMovie] = React.useState("movie");
  const [tmdbPage, setTmdbPage] = React.useState(1);
  const { data, error, isLoading, isError } = useQuery(
    ["discoverMovies",{ pageID: tmdbPage }],
    getMovies
  );

  
 
  const tvResponse = useQuery("discoverTV", getTVPrograms);


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
    return (
      <h1>
        `There was an error reading TV Data`${tvDataResponse.error.message}
      </h1>
    );
  }

  const tvPrograms = tvResponse.data ? tvResponse.data.results : []; // tvDataResponse.data ? tvDataResponse.data.results : [];

  // dynamic title
  let sTitle = "Discover Movies and TV";

  const TVMovieChange = (value) => {
    const sChangeTo = value;
    if (sChangeTo == "tv") {
      setTvOrMovie("tv");
    } else {
      setTvOrMovie("movie");
    }
    // console.log(`Home Page ${value}`);
    props.handleTVMovieChange(value);
  };


 const handleDataPageIndexChange = (value)=>{
    let retVal = tmdbPage;
    if (value == +1){
      retVal = retVal +1;
    } 
    if (value ==-1){
      retVal = retVal -1;
    }
    if (retVal >=1){
      setTmdbPage(retVal);
    }
  };




  return (
    <PageTemplate
      title={sTitle}
      movies={movies}
      tvPrograms={tvPrograms}
      TVMovieChange={TVMovieChange}
      handleDataPageIndexChange={handleDataPageIndexChange}
      tmdbPage={tmdbPage}
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
export default HomePage;
