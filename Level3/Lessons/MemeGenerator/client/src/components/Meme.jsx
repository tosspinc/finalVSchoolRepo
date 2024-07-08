import React from "react";
import MemesData from "../components/MemesData";

export default function Meme() {
    function getMemeImage() {
        const memesArray = MemesData.data.memes  
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
            console.log(url)
    }
    return (
        <main>
            <div className="meme-form">
                <input 
                    type="text" 
                    placeholder="Top Text"
                    className="meme-form-input"
                />
                <input 
                    type="text" 
                    placeholder="Bottom Text"
                    className="meme-form-input"
                />
                <button className="meme-button"
                onClick={getMemeImage}>Get A New Meme Image. 🖼</button>
            </div>
        </main>
    )
}