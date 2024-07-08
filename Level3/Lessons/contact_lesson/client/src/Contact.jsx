import React from "react";

export default function Contact(props) {
    return (
        <div className="contact-card">
            <img src={props.img} />
            <h3>{props.name}</h3>
            <div className="info-group">
                <img src="./src/imgs/phone-contact.jpg" />
                <p>{props.phone}</p>
            </div>
            <div className="info-group">
                <img src="./src/imgs/Email-contact.png" />
                <p>{props.email}</p>
            </div>
        </div>
    )
}