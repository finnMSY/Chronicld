import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import RootContext from "../../providers/root";

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
    const gamesPerPage = 40; 

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

    async function getAppDetails(appIDs) {
        const details = [];
        for (const appID of appIDs) {
            try {
                const response = await axios.get(`http://localhost:8081/app_data/${appID}`);
                if (response.data[appID].data !== undefined) {
                    details.push(response.data[appID].data);
                }
            } catch (error) {
                console.error(`Error fetching data for appID ${appID}:`, error);
            }
        }
        return details;
    }

    const handleOnChange = (event) => {
        setSearching(false);
        setNoResults(false)
        if (event.target.value === null || event.target.value.match(/^ *$/) !== null) {
            setSearchResults(null);
        } else {
            setSearchedName(event.target.value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setHasSubmitted(true)
        setSearching(true);
    
        const results = getAppIdByName(searchedName).slice(0, gamesPerPage+5).sort();
        const dataPromise = getAppDetails(results);
        const data = await dataPromise;
        setSearchResults(data.slice(0, gamesPerPage));
    
        setSearching(false);
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
        <div>
            <h1>Home Page</h1>
            <button onClick={handleClick}>Page 2</button><br />
            <form onSubmit={handleSubmit}>
                <input placeholder='Game Name' onChange={handleOnChange}></input>
                <button type="submit">Submit</button>
            </form>

            {searching ? (
                <p>Loading...</p>
            ) : searchResults && searchResults.length > 0 ? (
                <div>
                    {searchResults.map((game, index) => (
                        <button key={index}>
                            <p>{game['name']}</p>
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
    );
};

export default HomePage;
