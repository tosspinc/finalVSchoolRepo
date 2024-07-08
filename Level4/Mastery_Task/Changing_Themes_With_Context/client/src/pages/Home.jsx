import React from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className='home'>
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}