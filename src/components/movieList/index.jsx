import React from "react";
import Movie from "../movieCard";
import Tv from "../tvCard";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action, tvPrograms ,tvOrMovie}) => {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
  ));

  let tvCards = tvPrograms.map((p) =>(
    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
    <Tv key={p.id} tvShow={p} action={action} />
  </Grid>
  ));
  
  let retValue =  movieCards

  if (tvOrMovie=="tv")
    retValue =  tvCards;
  
  return retValue;
};

export default MovieList;
