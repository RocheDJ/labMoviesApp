import React, { useState } from "react"; // useState/useEffect redundant
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { getGenres } from "../../api/tmdb-api";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import MovieIcon from "@mui/icons-material/Movie";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FilterIcon from "@mui/icons-material/Filter";

import Spinner from "../spinner";
const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [tvOrMoviePrompt, setTvOrMoviePrompt] = useState("Filter the movies.");

  const sortBy = {
    fields: [
      { id: "0", name: "Title Ascending" },
      { id: "1", name: "Title Descending" },
      { id: "2", name: "Popularity Ascending" },
      { id: "3", name: "Popularity Descending" },
      { id: "4", name: "Release Date Ascending" },
      { id: "5", name: "Release Date Descending" },
    ],
  };
  const sortByFields = sortBy.fields;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;

  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleUserInput(e, "title", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleUserInput(e, "genre", e.target.value);
  };

  const handleSortByChange = (e) => {
    handleUserInput(e, "SortBy", e.target.value);
  };

  const handleRadioButtonChange = (e) => {
    handleUserInput(e, "tv_Movie", e.target.value);
    if (e.target.value == "movie") setTvOrMoviePrompt("Filter the movies.");
    else setTvOrMoviePrompt("Filter the TV Programs");
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <MovieIcon fontSize="large" />
            Select TV or Movie.
          </Typography>
          <FormControl sx={styles.formControl}>
            <RadioGroup
              aria-labelledby="radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={props.tvOrMovie}
              onChange={handleRadioButtonChange}
            >
              <FormControlLabel
                value="movie"
                control={<Radio />}
                label="MOVIE"
              />
              <FormControlLabel value="tv" control={<Radio />} label="TV" />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Search By name.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={props.titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterIcon fontSize="large" />
            Select Genre
          </Typography>
          <FormControl sx={styles.formControl}>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
        <FormControl sx={styles.formControl}>
        <Typography variant="h5" component="h1">
              <SortIcon fontSize="large" />
              Sort the list.
            </Typography>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={props.sortByField}
              onChange={handleSortByChange}
            >
              {sortByFields.map((sortByField) => {
                return (
                  <MenuItem key={sortByField.id} value={sortByField.id}>
                    {sortByField.name}
                  </MenuItem>
                );
              })}
            </Select>


        </FormControl>
        </CardContent>
      </Card>
    </>
  );
}
