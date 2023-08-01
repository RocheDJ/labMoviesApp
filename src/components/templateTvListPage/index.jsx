import React, { useState } from "react";
import HeaderList from "../headerList";
import FilterCard from "../filterTVCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvList from "../tvList";

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

function TvListPageTemplate({
  title,
  tvPrograms,
  TVMovieChange,
  action

}) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const [pageTitle, setPageTitle] = useState("Trending TV in the last week");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  // TV data
  let displayedTVPrograms = tvPrograms
    .filter((p) => {
      return p.name.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((p) => {
      return genreId > 0 ? p.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "title")
     setTitleFilter(value);
    else if (type === "genre") 
      setGenreFilter(value);
    else setTvOrMovie(value);
      TVMovieChange(value);
      if (value == "movie")
      {
        setPageTitle("Trending TV in the last week");
      }
      else 
        setPageTitle("Trending TV in the last week");
  };

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <HeaderList title={pageTitle} />
        </Grid>
        <Grid item container spacing={5}>
          <TvList action={action} tvPrograms={displayedTVPrograms} />
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
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          tvOrMovie={"tv"}
        />
      </Drawer>
    </>
  );
}
export default TvListPageTemplate;
