import React from "react";
import TvCard from "../components/tvCard";
import SampleTvShow from "./sampleTvData";
import { MemoryRouter } from "react-router";
import TvContextProvider from "../contexts/tvContext";
import { action } from "@storybook/addon-actions";

import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";

import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

export default {
  title: "Home Page/TvCard",
  component: TvCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvContextProvider>{Story()}</TvContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <TvCard
      movie={SampleTvShow}
      faveIconAction={(movie) => <AddToFavouritesIcon movie={movie} />}
      removeFaveIconAction={(movie) => <AddToFavouritesIcon movie={movie} />}
      addToPlaylistIconAction={(movie) => <AddToPlaylistIcon movie={movie} />}
      removeFromPlaylistIconAction={(movie) => <RemoveFromPlaylistIcon  movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleTvShow, poster_path: undefined };
  return (
    <TvCard
      movie={sampleNoPoster}
      faveIconAction={(movie) => <AddToFavouritesIcon movie={movie} />}
      removeFaveIconAction={(movie) => <RemoveFromFavouritesIcon movie={movie} />}
      addToPlaylistIconAction={(movie) => <AddToPlaylistIcon movie={movie} />}
      removeFromPlaylistIconAction={(movie) => <AddToPlaylistIcon movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
