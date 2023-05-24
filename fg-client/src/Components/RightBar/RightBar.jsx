import React, { Component } from "react";
import "./RightBar.css"

const RightBar = () =>{
    return (
        <div className="rightBar">
            <div className="rightBarWrapper">
                <h4 className="rightBarTitle">User Information</h4>
                <div className="rightBarInfo">
                    <div className="rightBarInfoItem">
                        <span className = "rightBarInfoKey">Followers:</span>
                        <span className = "rightBarInfoValue">23</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className = "rightBarInfoKey">Following:</span>
                        <span className = "rightBarInfoValue">23</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar
