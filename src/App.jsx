import React from "react";
import { useState } from "react";
import RootContext from "./providers/root";
import { HomePage, AdvSearch, Game } from "./pages";
import "./App.css";

export const PageName = "HomePage" | "RatingPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState(PageName);
  const [searchResults, setSearchResults] = useState([]);
  const [fullSearchResults, setFullSearchResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");

  // Root page navigation setup.
  const renderPage = () => {
    switch (currentPage) {
      case "advanced_search":
        return <AdvSearch />;
      case "selected_game":
        return <Game />
      default:
        return <HomePage />;
    }
  };
  return (
    // List of global variables used through the project.
    <div>
      <RootContext.Provider
        value={{
          searchResults,
          setSearchResults,
          setCurrentPage,
          currentPage,
          selectedGame,
          setSelectedGame,
          setFullSearchResults,
          fullSearchResults
        }}
      >
        {renderPage()}
      </RootContext.Provider>
    </div>
  );
};

export default App;