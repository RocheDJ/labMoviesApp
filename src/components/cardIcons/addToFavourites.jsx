import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { TvContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from '@mui/material/Tooltip';


const AddToFavouritesIcon = ({ movie ,
                              tvOrMovie}) => {

  const context = useContext(MoviesContext);
  const contextTV = useContext(TvContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    if (tvOrMovie=="tv"){
      contextTV.addToFavorites(movie);
    }else{
      context.addToFavorites(movie);
    }
  };
  return (
    <Tooltip title="Add To Favorites">
    <IconButton aria-label="Add To Favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary"  fontSize="large" />
    </IconButton>
  </Tooltip>
  );
};

export default AddToFavouritesIcon;
