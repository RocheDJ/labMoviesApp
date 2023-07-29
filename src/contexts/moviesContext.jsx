import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState( {} )  // NEW
  const [mustWatch, setMustWatch] = useState([]); // my playlist movies 

  const addReview = (movie, review) => {   // NEW
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToFavorites = (movie) => {
    let updatedFavorites = [...favorites];
    if (!favorites.includes(movie.id)) {
      updatedFavorites.push(movie.id);
    }
    setFavorites(updatedFavorites);
  };

  const addToMustWatch = (movie) => {
   let updatedMustWatch = [...mustWatch];
   if (!mustWatch.includes(movie.id)) {
     updatedMustWatch.push(movie.id);
   }
   setMustWatch(updatedMustWatch);
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
   };
 

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites: favorites,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addReview,    // NEW
        addToMustWatch,
        removeFromMustWatch,
        mustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
