//import necessary library tools from react for project.
import React, {useState} from "react"

//declare Meme2 function.
export default function Meme2(){

    //define inital state of Meme2
    const initialMemeState = {
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    };

    //utilize useState reach hook.
    //initialize initial arrays and variables.
    const [meme, setMeme] = useState(initialMemeState);
    const [savedMemes, setSavedMemes] = useState([]);
    const [selectedMemeIndex, setSelectedMemeIndex] = useState(null);

    //fetch the meme images from url (API) and handle errors.
    async function getMemeImage() {
        try {
            console.log("get")
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            const randomNumber = Math.floor(Math.random() * data.data.memes.length);
            const randomMeme = data.data.memes[randomNumber];
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: randomMeme.url
            }));
        } catch (error) {
            console.error('Error fetching meme: ', error);
        }
    }   

    //defining handleChange
    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function handleSubmit(event){
        event.preventDefault()
        setSavedMemes(prevSavedMemes => {
            if (selectedMemeIndex !== null) {
                const updatedMemes = [...prevSavedMemes];
                updatedMemes[selectedMemeIndex] = meme; // Replace the edited meme
                return updatedMemes;
            } else {
                return [
                    ...prevSavedMemes,
                    meme,
                ];
            }
        });
        setMeme(initialMemeState); // Reset the meme state to clear textboxes
        setSelectedMemeIndex(null); // Reset the selected meme index
    }

    function editSavedMeme(index) {
        setSelectedMemeIndex(index);
        const selectedMeme = savedMemes[index];
        setMeme({
            topText: selectedMeme.topText,
            bottomText: selectedMeme.bottomText,
            randomImage: selectedMeme.randomImage
        });
    }

    function deleteSavedMeme(index) {
        //this code replaces what I did below it.
        setSavedMemes(prevSavedMemes => prevSavedMemes.filter((meme, pos) => pos !== index && meme))
        //my previous code - not appropriate to use.
        // const updatedMemes = [...savedMemes]
        // updatedMemes.splice(index, 1)
        // setSavedMemes(updatedMemes)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input className='meme-input' name="topText" value={meme.topText} onChange={handleChange} placeholder='Top Line Text'/>
                <input className='meme-input' name="bottomText" value={meme.bottomText} onChange={handleChange} placeholder='Bottom Line Text'/>
                <button className="addMeme-button">Save Meme</button>
            </form>
            <button className="getNewMeme-button" onClick={getMemeImage}>
                Get A New Meme. 
            </button>

            <div style={{backgroundImage: `url(${meme.randomImage})`, height: "670px", width: "565px"}}>
                <h1>{meme.topText}</h1>
                <h1>{meme.bottomText}</h1>
            </div>

            <div className="saved-memes-container">
                <h1>Saved Memes</h1>
                <ul>
                    {savedMemes.map((savedMeme, index) => (
                    <li key={index} className="saved-meme"> {/* Add class here */}
                    <div className="saved-meme-image" style={{backgroundImage: `url(${savedMeme.randomImage})`}}></div>
                    <div className="saved-meme-text">
                        <h1>{savedMeme.topText}</h1>
                        <h1>{savedMeme.bottomText}</h1>
                    </div>
                    <div className="saved-meme-buttons">
                        <button className="edit-meme-button" onClick={() => editSavedMeme(index)}>Edit Meme</button>
                        <button className="delete-saved-meme-button" onClick={() => deleteSavedMeme(index)}>Delete Meme</button>
                    </div>
                    </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}