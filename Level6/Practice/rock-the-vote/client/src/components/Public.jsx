import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import '../cssFiles/public.css';
import IssueList from './IssueList';

export default function Public() {
    const { getAllIssues, handleUpvote, handleDownvote, isAuthenticated, user, addComment, getComment, allIssues } = useContext(UserContext);
    const [commentContent, setCommentContent] = useState({});

    useEffect(() => {

        getAllIssues();
        getComment()


    }, []);

    return (
        <div className='public-wrapper'>
            <h1 className='public-issues-title'>Current Issues</h1>
            <IssueList issues={allIssues} isPublic={true} />
        </div>
    );
}
