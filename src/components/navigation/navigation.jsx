import "./navigation.css";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";

const Navigation = () => {
  
  return (
    <div className="navigation">
        <img src={Logo}></img>
        <ul>
            <li><a href="">Sign in</a></li>
            <li><a href="">Create account</a></li>
            <li><a href="">Games</a></li>
      </ul>
    </div>
  );
};

export default Navigation;