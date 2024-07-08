import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
})
const [allMemes, setAllMemes] = React.useState([])

React.useEffect(() => {
//using an async function.
    async function getMemes() {
        const res = await fetch('https://api.imgflip.com/get_memes')
        const data = await res.json()
        setAllMemes(data.data.memes)
    }
    getMemes()
//This below works fine.
//     fetch('https://api.imgflip.com/get_memes')
//         .then(res => res.json())
//         .then(data = setAllMemes[data.data.memes])
 }, [])

function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
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

//function saves the edited meme.
function saveEditedMeme() {
    //converts meme data to a json string.
    const editedMemeJson = JSON.stringify(meme)
    //saves edited meme to local memory.
    localStorage.setItem('EditedMeme', editedMemeJson)
    alert('Meme saved successfuly')
}

return (
    <main>
        <div className="form">
            <input 
                type="text"
                placeholder="Top text"
                className="form-input"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
            />
            <input 
                type="text"
                placeholder="Bottom text"
                className="form-input"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
            />
            <button 
                className="form-button"
                onClick={getMemeImage}
            >
                Get a new meme image 🖼
            </button>
            <button
                className='form-button'
                onClick={saveEditedMeme}
            >Save Edited Meme
            </button>
        </div>
        <div className="meme">
            <img src={meme.randomImage} className="meme-image" />
            <h2 className="meme-text top"> {meme.topText} </h2>
            <h2 className="meme-text bottom"> {meme.bottomText} </h2>
        </div>
    </main>
)

}