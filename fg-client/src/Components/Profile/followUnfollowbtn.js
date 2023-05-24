import React, { useState } from "react";
import { ReactDOM } from "react-dom";
import "./Profile.css"

function FollowUnfollowBtn() {
    const initial = 'Follow';
    const afterClick = 'Following';
    const initialBgColor = "White";
    const afterClickBgColor = "#0096FF";
    const initialTextColor = "black";
    const afterClickTextColor = "white";

    const [buttonText, setButtonText] = useState(initial);
    const [bgColor, setBgColor] = useState(initialBgColor);
    const [textColor,setTextColor] = useState(initialTextColor);

    const handleClick = () => {
        setButtonText(prev => prev === afterClick ? initial : afterClick);
        setBgColor(prev => prev === afterClickBgColor ? initialBgColor : afterClickBgColor);
        setTextColor(prev => prev === afterClickTextColor ? initialTextColor : afterClickTextColor);
    };

    return(
        <button className="btn" onClick={handleClick} style={{ backgroundColor: bgColor, textColor:textColor }}>
            {buttonText}
        </button>
    );
}

export default FollowUnfollowBtn;