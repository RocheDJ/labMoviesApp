import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { TvContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getMovie,getTv } from "../api/tmdb-api";
import Spinner from "../components/spinner";

// Icons on Cards for Favorites
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";

// Icons on Cards for WatchList
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const WatchListMoviesPage = (props) => {
  const { mustWatch: movieIds } = useContext(MoviesContext);
  const { mustWatch: tvIds } = useContext(TvContext);
 

  // Create an array of queries and run them in parallel.
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  
  const mustWatchTvQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTv,
      };
    })
  );
  
  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = mustWatchMovieQueries.map((q) => q.data);



  const isLoadingTv = mustWatchTvQueries.find((t) => t.isLoading === true);

  if (isLoadingTv) {
     return <Spinner />;
   }

  const tvPrograms = mustWatchTvQueries.map((p) => p.data);

  const TVMovieChange = (value) => {
    props.handleTVMovieChange(value);
  };

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      tvPrograms={tvPrograms}
      tvOrMovie={props.tvOrMovie}
      TVMovieChange={TVMovieChange}
      faveIconAction={(movie) => {
        return <AddToFavouritesIcon movie={movie} tvOrMovie={props.tvOrMovie} />;
      }}
      removeFaveIconAction={(movie) => {
        return <RemoveFromFavouritesIcon movie={movie} tvOrMovie={props.tvOrMovie} />;
      }}
      addToPlaylistIconAction={(movie) => {
        return <AddToPlaylistIcon movie={movie} tvOrMovie={props.tvOrMovie} />;
      }}
      removeFromPlaylistIconAction={(movie) => {
        return <RemoveFromPlaylistIcon movie={movie} tvOrMovie={props.tvOrMovie} />;
      }}
    />
  );
};
export default WatchListMoviesPage;
