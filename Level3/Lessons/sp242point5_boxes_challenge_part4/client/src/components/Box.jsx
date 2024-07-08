import React from "react";

export default function Box(props) {
    
    const styles = {
        //checks to see if on is true and if it is it fills in the square with black.  
        //if it is false then there is not fill color.
        backgroundColor: props.on ? "#222222" : "transparent" 
    }

    return (
        <div style = {styles} 
            className="box" 
            //allows to see which box is checked when a box is clicked as it see the id of each square. props.toggle(props.id)
            onClick={() => props.toggle(props.id)}
        ></div> 
    )
}