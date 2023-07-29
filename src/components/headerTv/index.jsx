import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from '@mui/icons-material/Language';
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const TvHeader = (props) => {
  const TvShow = props.tvShow;
  const isFav = props.isFav;// could also have set to movie.favourite

  // based on https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
  const renderFavIcon = () => {
    if (isFav === "true") {
      return (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      );
    } else {
      return null;
    }
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton> 
      {console.log("1) TvShow.favorite =" + TvShow.favorite)}
     
      {renderFavIcon()}

      <Typography variant="h4" component="h3">
        {TvShow.name}
        {" - "}
        <a href={TvShow.homepage} target="_blank">
          <LanguageIcon color="primary" fontSize="='large" />
        </a>
        <br />
        <span>{`${TvShow.tagline}`} </span>
      </Typography>
      
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TvHeader;
