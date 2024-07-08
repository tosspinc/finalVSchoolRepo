import React from "react";

export default function Header(props) {
    return (
        <header>
            <p>Current User: {props.user}</p>
        </header>
    )
}