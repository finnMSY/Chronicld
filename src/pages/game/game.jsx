import React, { useContext, useEffect } from "react";
import RootContext from "../../providers/root";

const HomePage = () => {
    const {
        setCurrentPage,
        selectedGame
    } = useContext(RootContext);

    const handleClick = () => {
        setCurrentPage("");
    };

    useEffect(() => {
        console.log(selectedGame)
    })

    return (
        <div>
            <h1>Game</h1>
            <p>{selectedGame['name']}</p>
            <button onClick={handleClick}>Page 1</button>
        </div>
    );
};

export default HomePage;
