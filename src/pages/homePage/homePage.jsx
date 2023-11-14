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
    } = useContext(RootContext);

    const [allApps, setAllApps] = useState([]); 
    const [searchedName, setSearchedName] = useState(""); 
    const [searching, setSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const gamesPerPage = 5; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSearching(true);
                const response = await axios.get('http://localhost:8081');
                setAllApps(response.data.applist.apps);
                setSearching(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setSearching(false);
            }
        };

        fetchData();
    }, []);

    function getAppIdByName(appName) {
        const ids = allApps
            .filter(id => id.name.toLowerCase().includes(appName.toLowerCase()))
            .map(app => app.appid);
        return ids;
    }

    const rateLimiter = new RateLimiterMemory({
        points: 10, // Number of requests
        duration: 1, // Per second
    });

    async function getAppDetails(appIDs) {
        const urls = appIDs.map(item => `http://localhost:8081/app_data/${item}`);
        const details = await Promise.all(
            urls.map(async (url, index) => {
                try {
                    await rateLimiter.consume(url);
                    const response = await axios.get(url);
                    return response.data[appIDs[index]].data;
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            })
        );

        return details;
    }

    const handleOnChange = debounce(async (event) => {
        setSearching(true);
        setNoResults(false);
        setHasSubmitted(false);
        const inputValue = event.target.value;
     
        if (inputValue === null || inputValue.match(/^ *$/) !== null) {
            setSearchResults(null);
        } else {
            setSearchedName(inputValue);
            const results = getAppIdByName(inputValue).slice(0, gamesPerPage * 3).sort();
            const data = await getAppDetails(results);
            const cleaned_data = data.filter(array => array !== undefined);
            console.log(cleaned_data);
     
            if (cleaned_data.length > gamesPerPage) {
                setSearchResults(cleaned_data.slice(0, gamesPerPage));
            } else {
                setSearchResults(cleaned_data);
            }
        }
        setHasSubmitted(true);
        setSearching(false);
     }, 500);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchedName)
    }

    useEffect(() => {
        if (searchResults && searchResults.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [searchResults]);

    const handleClick = () => {
        setCurrentPage("rating");
    };

    return (
        <div className="home_page">
            < Navigation/>
            <div className="title">
                <img src={Logo}></img>
            </div>
            
            {/* <button onClick={handleClick}>Page 2</button><br /> */}

            <form onSubmit={handleSubmit} className="search_bar">
                <input placeholder='Game Name' onKeyUp={handleOnChange}></input>
                <button type="submit">Submit</button>
            </form>

            <div className="search_results">
                {searching ? (
                    <p>Loading...</p>
                ) : searchResults && searchResults.length > 0 ? (
                    <div>
                        {searchResults.map((game, index) => (
                            <button key={index} onClick={() => console.log(game['name'])}>
                                <img src={game['capsule_image']} alt={game['name']}></img>
                            </button>
                        ))}
                    </div>
                ) : noResults && hasSubmitted ? (
                    <p>No Results</p>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
