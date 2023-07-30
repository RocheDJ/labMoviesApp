import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { TvContext } from "../contexts/tvContext";
import { useQueries,useQuery } from "react-query";
import { getMovie,getTv,getTVPrograms } from "../api/tmdb-api";
import Spinner from "../components/spinner";
// Icons on Cards for Favorites
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";

// Icons on Cards for WatchList
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const FavouriteMoviesPage = (props) => {
  const { favorites: movieIds } = useContext(MoviesContext);
  const { favorites: tvIds } = useContext(TvContext);
  const [tvOrMovie, setTvOrMovie] = React.useState("movie");
 

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  
  const favouriteTvQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTv,
      };
    })
  );
  
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = favouriteMovieQueries.map((q) => q.data);

  

  // Check if any of the parallel queries is still loading.
  const isLoadingTv = favouriteTvQueries.find((t) => t.isLoading === true);

  if (isLoadingTv) {
     return <Spinner />;
   }
  const tvPrograms = favouriteTvQueries.data ? favoriteTvResponse.data.results : []; // tvDataResponse.data ? tvDataResponse.data.results : [];


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

  return (
    <PageTemplate
      title="Favorite Movies"
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
export default FavouriteMoviesPage;
