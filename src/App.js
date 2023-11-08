import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [allApps, setAllApps] = useState([]); 

  // Retrieves a a dictionary of all Steam App Names paired with their appids
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081');
        setAllApps(response.data.applist.apps);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    //console.log(allApps);
  }, []);

  return (
    <div className="App">
    
    </div>
  );
}

export default App;
