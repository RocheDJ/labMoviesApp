import React, { useState } from "react";

export const TvContext = React.createContext(null);

const TvContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({}); //
  const [mustWatch, setMustWatch] = useState([]); //

  const addReview = (tvShow, review) => {
    //
    setMyReviews({ ...myReviews, [tvShow.id]: review });
  };

  const addToFavorites = (tvShow) => {
    let updatedFavorites = [...favorites];
    if (!favorites.includes(tvShow.id)) {
      updatedFavorites.push(tvShow.id);
    }
    setFavorites(updatedFavorites);
  };

  const addToMustWatch = (tvShow) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(tvShow.id)) {
      updatedMustWatch.push(tvShow.id);
    }
    setMustWatch(updatedMustWatch);
  };

  const removeFromMustWatch = (tvShow) => {
    setMustWatch(mustWatch.filter((pId) => pId !== tvShow.id));
  };
  // We will use this function in a later section
  const removeFromFavorites = (tvShow) => {
    setFavorites(favorites.filter((pId) => pId !== tvShow.id));
  };

  return (
    <TvContext.Provider
      value={{
        favorites,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addReview,
        addToMustWatch,
        removeFromMustWatch,
        mustWatch,
      }}
    >
      {props.children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
