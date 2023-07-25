import React ,{ useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"; 
import MoviesContextProvider from "./contexts/moviesContext";
import TrendingTVPage from "./pages/trendingTVPage";


// testing
import SandBox from './components/sandbox';

//
// retain all data in the cache for 1 hour before it becomes invalidated.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});




const App = () => {
  const [AppIsTV, setAppIsTV] = useState("movie");
  
  const handleTVMovieChange = (value) => {
    console.log(`Index page Handle TV Movie change value= ${value}`);  
    setAppIsTV(value);
    console.log(`Index page Handle TV Movie change - ${AppIsTV}`);  
   };
  

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
     <SiteHeader AppIsTV={AppIsTV} />   
     <SandBox AppIsTV={AppIsTV} />  
     <MoviesContextProvider>
      <Routes>
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/tv/trending" element={<TrendingTVPage />} />
        <Route path="/movies/:id/:isFav" element={<MoviePage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage handleTVMovieChange={handleTVMovieChange}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
