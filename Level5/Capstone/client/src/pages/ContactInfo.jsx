import React, { useState } from "react";
import "../cssFiles/contactinfo.css"
import emailjs from "emailjs-com"

export default function ContactInfo() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send email using EmailJS
        emailjs.sendForm(
            "service_zbf1zst", // Your EmailJS service ID
            "template_01y6xj5", // Your EmailJS template ID
            e.target, // The form element
            "YQnsTa0IcDLULF8G7" // Your EmailJS user ID
        )
        .then((result) => {
            console.log(result.text);
            // Optionally, you can show a success message to the user
            alert("Your message has been sent successfully!");
        })
        .catch((error) => {
            console.error(error.text);
            // Optionally, you can show an error message to the user
            alert("An error occurred while sending your message. Please try again later.");
        });

        // Clear form data after submission
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: ""
        });
    };

    return (
        <div className="contact-page-container"> 
            <h1>Contact Us!</h1>     
            <form className="contact_form_container" onSubmit={handleSubmit}>
                
                <label className="form-label">
                    First Name:
                    <input 
                        className="first-name-input-box" 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label className="form-label">
                    Last Name: 
                    <input 
                        className="last-name-input-box"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label className="form-label">
                    Email:
                    <input 
                        className="email-input-box"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label className="form-label">
                    Message:
                    <textarea 
                        className="form-message-text-box"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button className="contact_button" type="submit" >Submit</button>
            </form>
        </div>
    );
}