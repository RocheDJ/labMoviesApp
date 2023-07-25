import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const TvList = ({  action, tvPrograms }) => {
  let tvCards = tvPrograms.map((p) =>(
    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
    <Movie key={p.id} movie={p} action={action} />
  </Grid>
  ));
  
  return tvCards;
};

export default TvList;