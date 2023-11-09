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
    const [gameData, setGameData] = useState({}); 
    const [searching, setSearching] = useState(false)

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081');
            setAllApps(response.data.applist.apps);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    const handleOnChange = async (event) => {
        if (event.target.value === null || event.target.value.match(/^ *$/) !== null) {
            setSearching(setSearching)
            setSearchResults(null)
        }
        else {
            setSearchedName(event.target.value)
            setSearching(true)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const results = getAppIdByName(searchedName).slice(0, 50);
        const dataPromise = getAppDetails(results);
        const data = await dataPromise;
        console.log(data)
        setSearchResults(data)
    }

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
            

            {searchResults && searchResults.length > 0 ? (
                <div>
                {searchResults.map((game) => (
                    <button>
                        <p>{game['name']}</p>
                        <img src={game['capsule_image']}></img>
                    </button>
                ))}
                </div>
            ) : searching && searchResults && searchResults.length === 0 ? (
                <p>No Results</p>
            ) : (
               <p></p> 
            )}
        </div>
    );
};

export default HomePage;
