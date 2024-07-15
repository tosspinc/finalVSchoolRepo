import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import IssueForm from './IssueForm';
import '../cssFiles/profile.css';
import IssueList from './IssueList';

function Profile() {
    const { user, issues, getUserIssues, deleteIssue, editIssue, addComment, deleteComment, editComment, getComment } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIssue, setCurrentIssue] = useState({});
    const [currentComment, setCurrentComment] = useState({});
    const [isCommentEditing, setIsCommentEditing] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        getUserIssues()
        getComment()
    }, []);



    return (
        <div className='profile-public-wrapper'>
            
            <IssueForm />
            <IssueList issues={issues} />
        </div>
    );
}

export default Profile;
