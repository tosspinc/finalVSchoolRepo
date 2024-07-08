//my old code:
// import React, { useState, useEffect } from "react";

// export default function Meme() {
//     const [meme, setMeme] = useState({
//         topText: '',
//         bottomText: '',
//         randomImage: 'http://i.imgflip.com/1bij.jpg'
//     });

//     console.log(meme)

//     const [savedMemes, setSavedMemes] = useState([]);

//     // useEffect(() => { 
//     //     // Retrieves saved memes from local storage.
//     //     const savedMemesJson = localStorage.getItem('SavedMemes');
//     //     if (savedMemesJson) {
//     //         const savedMemesArray = JSON.parse(savedMemesJson);
//     //         setSavedMemes(savedMemesArray);
//     //     }
//     // }, []);

//     // Gets new meme image.
//     async function getMemeImage() {
//         try {
//             console.log("get")
//             const res = await fetch("https://api.imgflip.com/get_memes");
//             const data = await res.json();
//             const randomNumber = Math.floor(Math.random() * data.data.memes.length);
//             const randomMeme = data.data.memes[randomNumber];
//             setMeme(prevMeme => ({
//                 ...prevMeme,
//                 randomImage: randomMeme.url
//             }));
//         } catch (error) {
//             console.error('Error fetching meme: ', error);
//         }
//     }   

//     function handleChange(event) {
//         const {name, value} = event.target;
//         setMeme(prevMeme => ({
//             ...prevMeme,
//             [name]: value
//         }));
//     }

//     function saveEditedMeme() {
//         // Add the current meme to the saved memes list
//         const updatedMemes = [...savedMemes, meme];
//         // Save the updated memes list to local storage
//         localStorage.setItem('SavedMemes', JSON.stringify(updatedMemes));
//         // Update the state to reflect the newly saved meme
//         setSavedMemes(updatedMemes);
//         // Clear text message boxes
//         setMeme(prevMeme => ({
//             ...prevMeme,
//             topText: '',
//             bottomText: ''
//         }));
//         alert('Meme saved successfully!');
//     }

//     function editSavedMeme(savedMeme) {
//         // Sets the meme state to selected saved meme.
//         setMeme(savedMeme);
//     }

//     function deleteSavedMeme (index) {
//         const updatedMemes = [...savedMemes]
//         updatedMemes.splice(index, 1)
//         setSavedMemes(updatedMemes)
//         localStorage.setItem('SavedMemes', JSON.stringify(updatedMemes))
//     }

//     return (
//         <main>
//             {/* <div className="meme-form-container">
//                 <input 
//                     type="text" 
//                     placeholder="Top Text"
//                     className="top-text"
//                     name='topText'
//                     value={meme.topText}
//                     onChange={handleChange}
//                 />
//                 <input 
//                     type="text"
//                     placeholder="Bottom Text"
//                     className="bottom-text"
//                     name='bottomText'
//                     value={meme.bottomText}
//                     onChange={handleChange}
//                 />
//             </div> */}

//             <button onClick={getMemeImage}>
//                 Get A New Meme. 
//             </button>
//             <input />

//             <div className="meme-container">
//                 <img src={meme.randomImage} className="meme-image" alt="Meme" />
//                 <div className="meme--text">
//                     <h2 className='top meme-text'>{meme.topText}</h2>
//                     <h2 className='bottom meme-text'>{meme.bottomText}</h2>
//                 </div>
//             </div>

//             {/* <div className='sdbuttons-container'>
//                 <button className='saved-meme-button' onClick={saveEditedMeme}>
//                     Save Edited Meme.
//                 </button>

//                 <button className='delete-saved-meme-button' onClick={deleteSavedMeme}>
//                     Delete Edited Meme.
//                 </button>
//             </div> */}

//             {/* <div className='saved-memes-container'>
//                 <h2>Saved Memes</h2>
//                 <ul>
//                     {savedMemes.map((savedMeme, index) => (
//                         <li key={index}>
//                             <button className='edit-meme-button' onClick={() => editSavedMeme(saveEditedMeme)}>Edit Meme</button>
//                             <button className='delete-saved-meme-button' onClick={() => deleteSavedMeme(index)}>Delete Meme</button>
//                             <span>{savedMeme.topText}</span>
//                             <span>{savedMeme.bottomText}</span>
//                         </li>
//                     ))}
//                 </ul>
//                 {savedMemes.length === 0 && <p>No saved memes yet.</p>}
//             </div> */}
//         </main>
//     );
// }

//Mostly Zaks code for fixing
// import React, {useState} from "react"

// export default function Meme2(){


//     const [meme, setMeme] = useState({
//         topText: '',
//         bottomText: '',
//         randomImage: 'http://i.imgflip.com/1bij.jpg'
//     });

//     const [savedMemes, setSavedMemes] = useState([]);
//     const [selectedMemeIndex, setSelectedMemeIndex] = useState(null)

//     async function getMemeImage() {
//         try {
//             console.log("get")
//             const res = await fetch("https://api.imgflip.com/get_memes");
//             const data = await res.json();
//             const randomNumber = Math.floor(Math.random() * data.data.memes.length);
//             const randomMeme = data.data.memes[randomNumber];
//             setMeme(prevMeme => ({
//                 ...prevMeme,
//                 randomImage: randomMeme.url
//             }));
//         } catch (error) {
//             console.error('Error fetching meme: ', error);
//         }
//     }   

//     function handleChange(event) {
//         const {name, value} = event.target;
//         setMeme(prevMeme => ({
//             ...prevMeme,
//             [name]: value
//         }));
//     }

//     function handleSubmit(event){
//         event.preventDefault()
//         setSavedMemes(prevSavedMemes => {
//             return [
//                 ...prevSavedMemes,
//                 meme,
//             ]
//         })
//     }

//     function editSavedMeme(index) {
//         setSelectedMemeIndex(index)
//         //const updatedMemes = [...savedMemes]
//         const selectedMeme = savedMemes[index]
//         setMeme({
//             topText: selectedMeme.topText,
//             bottomText: selectedMeme.bottomText,
//             randomImage: selectedMeme.randomImage
//         })
//         //const updatedMemes = [...savedMemes, meme]
//         //setSavedMemes(updatedMemes)
//         //alert('Meme edited successfully.')
//         // setMeme(prevMeme => ({
//         //     ...prevMeme,
//         //     topText: "",
//         //     bottomText: ""
//         //}))
//         //alert('Meme Saved successfully')
//     }

//     function deleteSavedMeme(index) {
//         const updatedMemes = [...savedMemes]
//         updatedMemes.splice(index, 1)
//         setSavedMemes(updatedMemes)
//     }

//     console.log(savedMemes)
//     return (
//         <main>
//             <form onSubmit = {handleSubmit}>
//                 <input name = "topText" value = {meme.topText} onChange = {handleChange} />
//                 <input name = "bottomText" value = {meme.bottomText} onChange = {handleChange} />
//                 <button>Add Meme</button>
//             </form>
//             <button onClick={getMemeImage}>
//                 Get A New Meme. 
//             </button>


//             <div style = {{backgroundImage : `url(${meme.randomImage})`, height: "670px", width: "565px"}}>
//                 <h1>{meme.topText}</h1>
//                 <h1>{meme.bottomText}</h1>
//             </div>

//             <div className="saved-memes-container">
//                 <h1>Saved Memes</h1>
//                 <ul>
//                     {savedMemes.map((savedMeme, index) => (
//                         <li>    
//                             <div style = {{backgroundImage: `url(${savedMeme.randomImage})`, height: "300px", width: "300px"}}>
//                                 key={index}
//                                 <button className="edit-meme-button" onClick={() => editSavedMeme(savedEditedMeme)}>Edit Meme</button>
//                                 <button className="delete-saved-meme-button" onClick={() => deleteSavedMeme(index)}>Delete Meme</button>
//                                 <h1>{savedMeme.topText}</h1>
//                                 <h1>{savedMeme.bottomText}</h1>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>        
//             </div>
//         </main>
//     )
// }