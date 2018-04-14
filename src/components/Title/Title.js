
import React from 'react';
import './Title.css';

const Title = props => (
    <nav className="title">
        <p className="headerText">Clicky Game</p>
        <p>Click on and image to earn points, but don't click any image more than once!</p>
        <p>{props.guess}</p>
        <ul>
            <li>Current Score: {props.score} | Highest Score: {props.highScore}  </li>
        </ul>
    </nav>
);


export default Title;