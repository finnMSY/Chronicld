import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import RootContext from "../../providers/root";
import { debounce } from 'lodash';

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

    async function getAppDetails(appIDs) {
        const urls = appIDs.map(item => `http://localhost:8081/app_data/${item}`);
        const details = await Promise.all(
            urls.map(async (url, index) => {
                try {
                    const response = await axios.get(url);
                    return response.data[appIDs[index]].data;
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            })
        );

        return details;
    }

    // function debounce(func, timeout = 500) {
    //     let timer;
    //     return (...args) => {
    //         clearTimeout();
    //         timer = setTimeout(() => { func.apply(this, args); }, timeout);
    //     };
    // }

    // const loadResults = async (event) => {
    //     setSearching(true);
    //     setNoResults(false);
    //     setHasSubmitted(false);
    //     const inputValue = event.target.value;
    
    //     if (inputValue === null || inputValue.match(/^ *$/) !== null) {
    //         setSearchResults(null);
    //     } else {
    //         setSearchedName(inputValue);
    //         const results = getAppIdByName(inputValue).slice(0, gamesPerPage + 5).sort();
    //         const data = await getAppDetails(results);
    //         const cleaned_data = data.filter(array => array !== undefined);
    //         console.log(cleaned_data);
        
    //         if (cleaned_data.length > gamesPerPage) {
    //             setSearchResults(cleaned_data.slice(0, gamesPerPage));
    //         } else {
    //             setSearchResults(cleaned_data);
    //         }
    //     }
    
    //     setSearching(false);
    // }

    const handleOnChange = debounce(async (event) => {
        setSearching(true);
        setNoResults(false);
        setHasSubmitted(false);
        const inputValue = event.target.value;
     
        if (inputValue === null || inputValue.match(/^ *$/) !== null) {
            setSearchResults(null);
        } else {
            setSearchedName(inputValue);
            const results = getAppIdByName(inputValue).slice(0, gamesPerPage + 5).sort();
            const data = await getAppDetails(results);
            const cleaned_data = data.filter(array => array !== undefined);
            console.log(cleaned_data);
     
            if (cleaned_data.length > gamesPerPage) {
                setSearchResults(cleaned_data.slice(0, gamesPerPage));
            } else {
                setSearchResults(cleaned_data);
            }
        }
     
        setSearching(false);
     }, 500);

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);
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
                <input placeholder='Game Name' onKeyUp={handleOnChange}></input>
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
