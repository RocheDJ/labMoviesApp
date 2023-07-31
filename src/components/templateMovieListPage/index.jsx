import React, { useState } from "react";
import HeaderMovieList from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import FilterTVCard from "../filterTVCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import { ThemeContext } from "@emotion/react";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({
  title,
  movies,
  tvPrograms,
  TVMovieChange,
  handleDataPageIndexChange,
  tmdbPage,
  faveIconAction,
  removeFaveIconAction,
  addToPlaylistIconAction,
  removeFromPlaylistIconAction,
}) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [tvOrMovie, setTvOrMovie] = useState("movie");
  const [pageTitle, setPageTitle] = useState(title);
  const [drawerOpen, setDrawerOpen] = useState(false);


  const genreId = Number(genreFilter);

  // movie data
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  // TV data
  let displayedTVPrograms = tvPrograms
    .filter((p) => {
      return p.name.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((p) => {
      return genreId > 0 ? p.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "tv_Movie") {
      setTvOrMovie(value);
      TVMovieChange(value);
      if (value == "movie") setPageTitle("Discover Movies");
      else setPageTitle("Discover TV");
    }
  };

 
  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <HeaderMovieList 
            title={pageTitle} 
            pageChange={handleDataPageIndexChange} 
            pageNumber={tmdbPage}/>
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            faveIconAction={faveIconAction}
            movies={displayedMovies}
            tvPrograms={displayedTVPrograms}
            tvOrMovie={tvOrMovie}
            removeFaveIconAction={removeFaveIconAction}
            addToPlaylistIconAction={addToPlaylistIconAction}
            removeFromPlaylistIconAction={removeFromPlaylistIconAction}
          />
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {tvOrMovie == "movie" ? (
          <FilterCard
            onUserInput={handleChange}
            titleFilter={titleFilter}
            genreFilter={genreFilter}
            tvOrMovie={tvOrMovie}
          />
        ) : (
          <FilterTVCard
            onUserInput={handleChange}
            titleFilter={titleFilter}
            genreFilter={genreFilter}
            tvOrMovie={tvOrMovie}
          />
        )}
      </Drawer>
    </>
  );
}
export default MovieListPageTemplate;
