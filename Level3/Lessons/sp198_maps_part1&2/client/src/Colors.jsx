import React from "react";

export default function Colors() {
    const colors = [
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue"
    ]

    return (
        <div>
            <h1>Hello!</h1>
            {colors.map((color, index) => (
                <h4 key={index}>{color}</h4>
            ))}
        </div>
    )
}