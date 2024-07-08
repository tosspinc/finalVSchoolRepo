import React from "react";

export default function Star(props) {
    const starIcon = props.isFilled ? "star.jpg" : "star-empty.png"

    return (
        <img
            src={`../imgs/${starIcon}`}
            className="card--favorite"
            onClick={props.handleClick}
           />
    )
}