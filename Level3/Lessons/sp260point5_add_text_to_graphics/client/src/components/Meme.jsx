import React from "react";
import MemesData from "../components/MemesData";

export default function Meme() {
    //const [memeImage, setMemeImage] = React.useState('http://i.imgflip.com/1bij.jpg')

    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemeImages, setAllMemeImages] = React.useState(MemesData)

    function getMemeImage() {
    const memesArray = allMemeImages.data.memes  
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))

    }   
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
        return (
        <main>
            <div className="meme-form">
                <input 
                    type="text" 
                    placeholder="Top Text"
                    className="meme-form-input"
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Bottom Text"
                    className="meme-form-input"
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="meme-button"
                onClick={getMemeImage}>Get A New Meme Image. 🖼</button>
            </div>
            <div className='meme'>
                <img src={meme.randomImage} className="meme-image"/>
                <h2 className='meme-text top'>{meme.topText}</h2>
                <h2 className='meme-text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}