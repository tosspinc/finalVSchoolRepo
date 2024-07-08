import React from "react";



export default function Numbs() {
    const numbs = [1, 2, 3, 4, 5]

    const squared = numbs.map(function(item) {
            return item * item;
        })

    return (
        <div> 
            {squared.map((value, index) => (
                <div key={index}>{value}</div>
            ))}
        </div>
    )
}

