import React, { useState, useEffect } from "react";

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    });

    const [savedMemes, setSavedMemes] = useState([]);

    useEffect(() => { 
        // Retrieves saved memes from local storage.
        const savedMemesJson = localStorage.getItem('SavedMemes');
        if (savedMemesJson) {
            const savedMemesArray = JSON.parse(savedMemesJson);
            setSavedMemes(savedMemesArray);
        }
    }, []);

    // Gets new meme image.
    async function getMemeImage() {
        try {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            const randomNumber = Math.floor(Math.random() * data.data.memes.length);
            const randomMeme = data.data.memes[randomNumber];
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: randomMeme.url,
                topText: '',
                bottomText: ''
            }));
        } catch (error) {
            console.error('Error fetching meme: ', error);
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function saveEditedMeme() {
        // Add the current meme to the saved memes list
        const updatedMemes = [...savedMemes, meme];
        // Save the updated memes list to local storage
        localStorage.setItem('SavedMemes', JSON.stringify(updatedMemes));
        // Update the state to reflect the newly saved meme
        setSavedMemes(updatedMemes);
        // Clear text message boxes
        setMeme(prevMeme => ({
            ...prevMeme,
            topText: '',
            bottomText: ''
        }));
        alert('Meme saved successfully!');
    }

    function editSavedMeme(savedMeme) {
        // Sets the meme state to selected saved meme.
        setMeme(savedMeme);
    }

    function deleteSavedMeme (index) {
        const updatedMemes = [...savedMemes]
        updatedMemes.splice(index, 1)
        setSavedMemes(updatedMemes)
        localStorage.setItem('SavedMemes', JSON.stringify(updatedMemes))
    }

    return (
        <main>
            <div className="meme-form-container">
                <input 
                    type="text" 
                    placeholder="Top Text"
                    className="top-text"
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom Text"
                    className="bottom-text"
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="meme-button" onClick={getMemeImage}>
                    Get A New Meme. 🖼
                </button>
            </div>

            <div className="meme-container">
                <img src={meme.randomImage} className="meme-image" alt="Meme" />
                <div className="meme--text">
                    <h2 className='top meme-text'>{meme.topText}</h2>
                    <h2 className='bottom meme-text'>{meme.bottomText}</h2>
                </div>
            </div>

            <div className='sdbuttons-container'>
                <button className='saved-meme-button' onClick={saveEditedMeme}>
                    Save Edited Meme.
                </button>

                <button className='delete-saved-meme-button' onClick={deleteSavedMeme}>
                    Delete Edited Meme.
                </button>
            </div>

            <div className='saved-memes-container'>
                <h2>Saved Memes</h2>
                <ul>
                    {savedMemes.map((savedMeme, index) => (
                        <li key={index}>
                            <button className='edit-meme-button' onClick={() => editSavedMeme(savedMeme)}>Edit Meme</button>
                            <span>{savedMeme.topText}</span>
                            <span>{savedMeme.bottomText}</span>
                        </li>
                    ))}
                </ul>
                {savedMemes.length === 0 && <p>No saved memes yet.</p>}
            </div>
        </main>
    );
}
