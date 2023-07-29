import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TvIcon from "@mui/icons-material/Tv";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
//import  DialogSlide  from '../slideDialogue';

//slide dialogue
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const TvDetails = ({ tvShow }) => {
  const [open, setOpen] = React.useState(false);
  const [seasonTitle, setSeasonTitle] = React.useState("Season Title");
  const [info, setInfo] = React.useState("ToDo: Season Overview");
  
  const handleClickOpen = (e) => {
    e.preventDefault();
     setSeasonTitle(e.target.innerText);
     setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tvShow.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
        <Chip icon={<TvIcon />} 
            label={`${tvShow.seasons.length} seasons.`} color="primary"/>
        </li>
        {tvShow.seasons.map((s) => (
          <li key={s.id}>
            <Chip 
                id = {s.id} 
                label={s.name}
                onClick={handleClickOpen} 
              />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <Chip
          icon={<StarRate />}
          label={`${tvShow.vote_average} (${tvShow.vote_count}`}
        />
        <Chip label={`First aired: ${tvShow.first_air_date}`} />
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {seasonTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TvDetails;
