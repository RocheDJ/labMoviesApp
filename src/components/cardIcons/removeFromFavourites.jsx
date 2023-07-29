import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import { TvContext } from "../../contexts/tvContext";
import { blue, pink } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";

const RemoveFromFavouritesIcon = ({ movie, tvOrMovie }) => {
  const context = useContext(MoviesContext);
  const contextTV = useContext(TvContext);

  const onUserRequest = (e) => {
    e.preventDefault();
    if (tvOrMovie == "tv") {
      contextTV.removeFromFavorites(movie);
    } else {
      context.removeFromFavorites(movie);
    }
  };

  return (
    <Tooltip title="Remove From Favorites">
      <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
        <FavoriteIcon color="error" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromFavouritesIcon;
