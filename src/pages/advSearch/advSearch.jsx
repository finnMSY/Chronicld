import React, { useContext, useEffect, useState } from "react";
import RootContext from "../../providers/root";
import { Navigation } from "../../components"

const HomePage = () => {
    const {
        setCurrentPage,
        fullSearchResults,
        setSelectedGame
    } = useContext(RootContext);

    const handledSelectedGame = (Game) => {
        setSelectedGame(Game)
        setCurrentPage("selected_game");
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        console.log(fullSearchResults)
    })

    return (
        <div className="page">
            < Navigation/>
            <h1>Adv Search</h1>

            <form onSubmit={handleSubmit} className="search_bar">
                <input placeholder='Game Name'></input>
                <button type="submit">Submit</button>
            </form>

            {fullSearchResults.map((game, index) => (
                <button key={index} onClick={() =>handledSelectedGame(game)}>
                    <img src={game['capsule_image']} alt={game['name']}></img>
                </button>
            ))}
</div>
    );
};

export default HomePage;
