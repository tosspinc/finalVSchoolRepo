import React from "react";

export default function Box(props) {
    const styles = {
        //checks to see if props.on is true and if it is it fills in the square with black.  
        //if it is false then there is not fill color.
        backgroundColor: props.on ? "#222222" : "none" 
    }

    return (
        <div style = {styles} className="box" ></div> 
    )
}