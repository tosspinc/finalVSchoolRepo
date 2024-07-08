import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard(props) {
    return (
        <div className={`dashboard`}>
            <Navbar />
                Dashboard Page
            <Footer />
        </div>
    )
}