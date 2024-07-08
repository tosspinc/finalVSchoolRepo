import React, { useState } from "react";
import MovieForm from "./MovieForm.jsx";

export default function Movie(props) {
    const {title, genre, _id, deleteMovie, editMovie} = props
    const [editToggle, setEditToggle] = useState(false)
    return (    
        <div className="movie">
            { !editToggle ?
                <>
                    <h1>Title: {title}</h1>
                    <p>Genre: {genre}</p>
                    <p>Id: {_id}</p>
                    <button 
                        className="delete-button"
                        onClick={() => deleteMovie(_id)}>
                        {/* onClick={() => props.deleteMovie(_id)}> */}
                        Delete Movie
                    </button>
                    <button 
                        className="update-button"
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                        Update Movie
                    </button>
                </>
            :
                <>
                    <MovieForm 
                        title={title}
                        genre={genre}
                        _id={_id}
                        btnText="Submit Edit"
                        // submit={props.editMovie}
                        submit={(updatedMovie)=> {
                            editMovie(updatedMovie, _id)
                            setEditToggle(false)
                        }}
                    />
                    <button
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                        Close
                    </button>
                </>
            }
        </div>
    )
}