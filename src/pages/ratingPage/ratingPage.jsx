import React, { useContext } from "react";
import RootContext from "../../providers/root";

const HomePage = () => {
    const {
        setCurrentPage,
    } = useContext(RootContext);

    const handleClick = () => {
        setCurrentPage("");
    };

    return (
        <div>
            <h1>Rating Page</h1>
            <button onClick={handleClick}>Page 1</button>
        </div>
    );
};

export default HomePage;
