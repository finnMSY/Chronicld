import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import RootContext from "../../providers/root";
import { debounce } from 'lodash';
import { Navigation } from "../../components"
import { RateLimiterMemory } from 'rate-limiter-flexible';
import Logo from "../../assets/logo.png";

import "./homePage.css";

const HomePage = () => {
    const {
        setCurrentPage,
        searchResults,
        setSearchResults,
        setSelectedGame,
        setFullSearchResults
    } = useContext(RootContext);

    // const [allApps, setAllApps] = useState([]); 
    // const [searchedName, setSearchedName] = useState(""); 
    // const [searching, setSearching] = useState(false);
    // const [noResults, setNoResults] = useState(false);
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    // const gamesPerPage = 5; 

    // useEffect(() => {
    //     setSearchResults([])
    //     const fetchData = async () => {
    //         try {
    //             setSearching(true);
    //             const response = await axios.get('http://localhost:8081');
    //             setAllApps(response.data.applist.apps);
    //             setSearching(false);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setSearching(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // function getAppIdByName(appName) {
    //     const ids = allApps
    //         .filter(id => id.name.toLowerCase().includes(appName.toLowerCase()))
    //         .map(app => app.appid);
    //     return ids;
    // }

    // const rateLimiter = new RateLimiterMemory({
    //     points: 10, // Number of requests
    //     duration: 1, // Per second
    // });

    // async function getAppDetails(appIDs) {
    //     const urls = appIDs.map(item => `http://localhost:8081/app_data/${item}`);
    //     const details = await Promise.all(
    //         urls.map(async (url, index) => {
    //             try {
    //                 await rateLimiter.consume(url);
    //                 const response = await axios.get(url);
    //                 return response.data[appIDs[index]].data;
    //             } catch (error) {
    //                 console.error('Error fetching data:', error);
    //             }
    //         })
    //     );

    //     return details;
    // }

    // const handledSelectedGame = (Game) => {
    //     setSelectedGame(Game)
    //     setCurrentPage("selected_game");
    // }

    // const handleAdvancedSearch = () => {
    //     console.log(searchedName)
    //     setCurrentPage("advanced_search");
    // }

    // const handleOnChange = debounce(async (event) => {
    //     setSearching(true);
    //     setNoResults(false);
    //     setHasSubmitted(false);
    //     const inputValue = event.target.value;
     
    //     if (inputValue === null || inputValue.match(/^ *$/) !== null) {
    //         setSearchResults(null);
    //     } else {
    //         setSearchedName(inputValue);
    //         const results = getAppIdByName(inputValue).slice(0, gamesPerPage * 3).sort();
    //         const data = await getAppDetails(results);
    //         const cleaned_data = data.filter(array => array !== undefined);
    //         //console.log(cleaned_data);
     
    //         if (cleaned_data.length > gamesPerPage) {
    //             setSearchResults(cleaned_data.slice(0, gamesPerPage));
    //         } else {
    //             setSearchResults(cleaned_data);
    //         }
    //         setFullSearchResults(cleaned_data)
    //     }
    //     setHasSubmitted(true);
    //     setSearching(false);
    //  }, 500);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     handleAdvancedSearch()
    // }

    // useEffect(() => {
    //     if (searchResults && searchResults.length === 0) {
    //         setNoResults(true);
    //     } else {
    //         setNoResults(false);
    //     }
    // }, [searchResults]);

    // const handleClick = () => {
    //     setCurrentPage("rating");
    // };

    return (
        <div className="home_page page">
            < Navigation/>
        </div>
    );
};

export default HomePage;
