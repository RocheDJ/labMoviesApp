import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Tooltip from "@mui/material/Tooltip";
import { TvContext } from "../../contexts/tvContext";

const RemoveFromPlaylistIcon = ({ movie,tvOrMovie }) => {
  const context = useContext(MoviesContext);
  const contextTV = useContext(TvContext);
  const onUserSelect = (e) => {
    e.preventDefault();
    if (tvOrMovie == "tv") {
      contextTV.removeFromMustWatch(movie);
    }else{
      context.removeFromMustWatch(movie);
    }
  };
  return (
    <Tooltip title="Remove From Watch list">
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <PlaylistRemoveIcon color="warning" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromPlaylistIcon;
