import React, { useState } from "react";
import HeaderList from "../headerList";
import FilterCard from "../filterMoviesCard";
import FilterTVCard from "../filterTVCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";

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
  tvOrMovie,
  removeFaveIconAction,
  addToPlaylistIconAction,
  removeFromPlaylistIconAction,
}) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortByFilter, setSortByFilter] = useState("0");
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
    })
    .sort((a, b) => {
      switch (sortByFilter) {
        case "0":
          return a.title > b.title ? 1 : -1;
        case "1":
          return a.title > b.title ? -1 : 1;
        case "2":
          return a.popularity > b.popularity ? 1 : -1;
        case "3":
          return a.popularity > b.popularity ? -1 : 1;
        case "4":
          return a.release_date > b.release_date ? 1 : -1;
        case "5":
          return a.release_date > b.release_date ? -1 : 1;
        default:
          return a.title > b.title ? 1 : -1;
      }
    });

  // TV data
  let displayedTVPrograms = tvPrograms
    .filter((p) => {
      return p.name.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((p) => {
      return genreId > 0 ? p.genre_ids.includes(genreId) : true;
    })
    .sort((a, b) => {
      switch (sortByFilter) {
        case "0":
          return a.name > b.name ? 1 : -1;
        case "1":
          return a.name > b.name ? -1 : 1;
        case "2":
          return a.popularity > b.popularity ? 1 : -1;
        case "3":
          return a.popularity > b.popularity ? -1 : 1;
        case "4":
          return a.first_air_date > b.first_air_date ? 1 : -1;
        case "5":
          return a.first_air_date > b.first_air_date ? -1 : 1;
        default:
          return a.name > b.name ? 1 : -1;
      }
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "tv_Movie") {
      TVMovieChange(value);//call the main routine
      if (value == "movie") setPageTitle("Discover Movies");
      else setPageTitle("Discover TV");
    } else if (type === "SortBy") {
      setSortByFilter(value);
    }
  };

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <HeaderList
            title={pageTitle}
            pageChange={handleDataPageIndexChange}
            pageNumber={tmdbPage}
          />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            faveIconAction={faveIconAction}
            movies={displayedMovies}
            tvPrograms={displayedTVPrograms}
            tvOrMovie={tvOrMovie}
            sortByField={sortByFilter}
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
