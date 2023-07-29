import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Tooltip from "@mui/material/Tooltip";

import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: { maxWidth: 250, height: 650 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  blue: {
    backgroundColor: "rgb(0, 0, 255)",
  },
};

export default function MovieCard({
  movie,
  faveIconAction,
  removeFaveIconAction,
  addToPlaylistIconAction,
  removeFromPlaylistIconAction,
}) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { mustWatch, addTowWatchList } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false;
  }

  return (
    <Card sx={styles.card}>
      <Link to={`/movies/${movie.id}`}>
        <CardMedia
          sx={styles.media}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
        />
      </Link>

      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardContent>
        <Typography variant="h9" component="p">
          <CalendarIcon fontSize="small" />
          {"  Released "}{movie.release_date}{" "}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography variant="h9" component="p">
          <StarRateIcon fontSize="small" />
          {"  Average Rating "} {movie.vote_average}{" "}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {movie.favorite == true
          ? removeFaveIconAction(movie)
          : faveIconAction(movie)}
        <Tooltip title="More info">
          <Link to={`/movies/${movie.id}`}>
            <IconButton aria-label="More Info">
              <InfoIcon color="secondary" fontSize="large" />
            </IconButton>
          </Link>
        </Tooltip>
        {movie.mustWatch == true
          ? removeFromPlaylistIconAction(movie)
          : addToPlaylistIconAction(movie)}
      </CardActions>
    </Card>
  );
}
