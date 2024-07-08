import React from "react";

export default function Box(props) {
    const [on, setOn] = React.useState(props.on)

    const styles = {
        //checks to see if on is true and if it is it fills in the square with black.  
        //if it is false then there is not fill color.
        backgroundColor: on ? "#222222" : "transparent" 
    }

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    return (
        <div style = {styles} 
            className="box" 
            onClick={toggle}
        ></div> 
    )
}