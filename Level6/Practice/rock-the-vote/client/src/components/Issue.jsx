import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import PublicComments from "./PublicComments"



function Issue(props){

    const {title, description, imgUrl, username, userId, upvotes, downvotes, _id, isPublic } = props

    const {comments, user, handleUpvote, handleDownvote} = useContext(UserContext)
    const [formData, setFormData] = useState({
        title, 
        description
    })

    const filteredComments = comments.filter(comment => comment.issue === _id)
    console.log(filteredComments)

    const [isEditing, setIsEditing] = useState(false)

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleToggle(){
        setIsEditing(!isEditing)
    }


    return(
        <>
        <div className="issue-list">
        <div className="issue-list-container"></div>
            <img src={imgUrl} style={{marginTop: '10px', marginBottom: '10px', height: '150px', width: '100px'}}/>
            <div></div>
            <h1 className="issue-title">{title}</h1>
            <h4 className="issue-description">Description: {description}</h4>
            <h4 className="issue-author">
                <span className="author-label">Author:</span> {username}</h4>           
            
            <div className="vote-buttons-container">
                <div className="vote-button" onClick={() => handleUpvote(_id)}>
                    <img src='../src/assets/IMGS/upvote.png' alt='Upvote' className='vote-icon' />
                    <span className='vote-count'>{upvotes.length}</span>
                </div>
                <div className="vote-button" onClick={() => handleDownvote(_id)}>
                    <img src='../src/assets/IMGS/downvote.png' alt='Downvote' className='vote-icon' />
                    <span className='vote-count'>{downvotes.length}</span>
                </div>
            </div>
            {userId === user._id && 
            <>
            <button onClick={handleToggle}>Edit</button>
            <button>Delete</button>
            </>}
        </div>
        
       { isEditing && 
            ( <form>
                <input 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <button>Submit</button>
                <button onClick={handleToggle}>Cancel</button>
            </form>
        )}
        {isPublic && <PublicComments issueId = {_id}/>}
        <div>
            {filteredComments.map(comment => {
                return(
                    <div /*key={comment._id*/>
                        <h3>{comment.content}</h3>
                        <p>{comment.username}</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Issue