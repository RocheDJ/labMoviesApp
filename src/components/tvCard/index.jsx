import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { TvContext } from "../../contexts/tvContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const styles = {
  card: { maxWidth: 250, height: 650 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function tvCard({
  tvShow,
  faveIconAction,
  removeFaveIconAction,
  addToPlaylistIconAction,
  removeFromPlaylistIconAction,
}) {
  const { favorites, addToFavorites } = useContext(TvContext);
  const { mustWatch, addTowWatchList } = useContext(TvContext);


  if (favorites.find((id) => id === tvShow.id)) {
    tvShow.favorite = true;
  } else {
    tvShow.favorite = false;
  }

  if (mustWatch.find((id) => id === tvShow.id)) {
    tvShow.mustWatch = true;
  } else {
    tvShow.mustWatch = false;
  }

  return (
    <Card sx={styles.card}>
      <Link to={`/tv/${tvShow.id}`}>
        <CardMedia
          sx={styles.media}
          image={
            tvShow.poster_path
              ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
              : img
          }
        />
      </Link>

      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {tvShow.name}{" "}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="h9" component="p">
          <CalendarIcon fontSize="small" />
          {"  First Aired "}{tvShow.first_air_date}{" "}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h9" component="p">
          <CalendarIcon fontSize="small" />
          {"  Country "}{tvShow.origin_country}{" "}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h9" component="p">
          <StarRateIcon fontSize="small" />
          {"  Average Rating "} {tvShow.vote_average}{" "}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        {tvShow.favorite == true
          ? removeFaveIconAction(tvShow)
          : faveIconAction(tvShow)}
        <Tooltip title="More info">
          <Link to={`/tv/${tvShow.id}`}>
            <IconButton aria-label="More Info">
              <InfoIcon color="secondary" fontSize="large" />
            </IconButton>
          </Link>
        </Tooltip>
        {tvShow.mustWatch == true
          ? removeFromPlaylistIconAction(tvShow)
          : addToPlaylistIconAction(tvShow)}
      </CardActions>
    </Card>
  );
}
