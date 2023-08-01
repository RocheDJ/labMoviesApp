import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

const HeaderList = ({ 
  title,
  pageChange ,
  pageNumber}) => {

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="Page dn" id="back" >
        <ArrowBackIcon onClick={() => pageChange(-1)} color="primary" fontSize="large" />
      </IconButton>
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <Typography variant="h6" component="h3">
        Page = {pageNumber}
      </Typography>
      <IconButton aria-label="go forward" id="forward" >
        <ArrowForwardIcon onClick={() => pageChange(+1)} color="primary" fontSize="large" />
      </IconButton>
      
    </Paper>
  );
};

export default HeaderList;
