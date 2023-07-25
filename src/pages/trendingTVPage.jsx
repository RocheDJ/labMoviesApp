import React, { useEffect } from "react";
import { getTrendingTvPrograms } from "../api/tmdb-api";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateTvListPage";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Spinner from "../components/spinner";

const TrendingTVPage = (props) => {
  const trendingTvResponse = useQuery("discoverTrendingTV", getTrendingTvPrograms);
  //retrieve the tv data

  if (trendingTvResponse.isLoading) {
    console.log("Loading TV Data");
    return <Spinner />;
  }

  if (trendingTvResponse.isError) {
    return (
      <h1>
        `There was an error reading TV Data`${tvDataResponse.error.message}
      </h1>
    );
  }

  const tvPrograms = trendingTvResponse.data ? trendingTvResponse.data.results : []; 

  const TVMovieChange = (value) => {
    props.handleTVMovieChange(value);
  };

  return (
    <PageTemplate
      title="Trending TV"
      tvPrograms={tvPrograms}
      TVMovieChange={TVMovieChange}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default TrendingTVPage;
