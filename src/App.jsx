import React from "react";
import { useState } from "react";
import RootContext from "./providers/root";
import { HomePage, RatingPage } from "./pages";
import "./App.css";

export const PageName = "HomePage" | "RatingPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState(PageName);
  const [searchResults, setSearchResults] = useState([]);

  // Root page navigation setup.
  const renderPage = () => {
    console.log(currentPage)
    switch (currentPage) {
      case "rating":
        return <RatingPage />;
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
          setCurrentPage
        }}
      >
        {renderPage()}
      </RootContext.Provider>
    </div>
  );
};

export default App;