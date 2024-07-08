import React from "react"


export default function Card(props) {   
    let badgeText
    if (props.openSpots === 0) {
        badgeText = "Sold Out"
    } else if (props.location === "Online") {
        badgeText = "Online"
    }

    return (
        <div className="card">
            {badgeText && <div className="card--badge">{...badgeText}</div>}
            <img src={`./imgs/${props.coverImg}`} className="card--image" />
            <div className="card--stats">
                <img src="./imgs/star.jpg" className="card--star" />
                <span>{props.stats.rating}</span>
                <span className="gray">({props.stats.reviewCount}) • </span>
                <span className="gray">{props.location}</span>
            </div>
            <p>{props.title}</p>
            <p><span className="bold">From ${props.price}</span> / person</p>
        </div>
    )
}