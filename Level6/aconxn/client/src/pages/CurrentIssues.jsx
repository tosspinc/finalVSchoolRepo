import React, { useContext, useEffect, useState } from "react";
import { UserContext, userAxios } from '../context/UserProvider';
import { useUIContext } from '../context/UIContext';
import ChatBox from '../components/ChatBox';
import AdsBox from '../components/AdsBox';
import IssueList from '../components/IssueList';
import IssueForm from '../components/IssueForm';
import '../cssfiles/currentissues.css';

export default function CurrentIssues() {
    const { userState, getUserIssues } = useContext(UserContext);
    const { showIssueForm } = useUIContext();
    const { issues, user } = userState;
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [allPostsComment, setAllPostsComment] = useState('');
    const [myPostsComment, setMyPostsComment] = useState('');
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getUserIssues();
        fetchTrendingPosts();
        fetchUserPosts();
    }, [refresh]);

    const fetchTrendingPosts = async () => {
        try {
            const response = await userAxios.get('/main/issues/allPosts');
            setTrendingPosts(response.data);
        } catch (error) {
            console.error('Error fetching trending posts: ', error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            if (user && user._id) {
                const response = await userAxios.get(`/main/issues/userPosts/${user._id}`);
                setUserPosts(response.data);
            }
        } catch (error) {
            console.error('Error fetching user posts: ', error);
        }
    };

    const handleSelectIssue = (id, section) => {
        if (selectedIssueId === id) {
            setSelectedIssueId(null);
            setSelectedSection(null);
            setIsEditing(false);
        } else {
            setSelectedIssueId(id);
            setSelectedSection(section);
            const issueToEdit = (section === 'myPosts' ? userPosts : trendingPosts).find(issue => issue._id === id);
            if (issueToEdit) {
                if (section === 'allPosts') {
                    setAllPostsComment(issueToEdit.description);
                } else if (section === 'myPosts') {
                    setMyPostsComment(issueToEdit.description);
                }
                setIsEditing(false);
            }
        }
    };

    const saveEdit = async () => {
        if (!selectedIssueId) {
            console.error('Select an issue to save.');
            return;
        }

        try {
            let updatedComment = '';
            if (selectedSection === 'allPosts') {
                updatedComment = allPostsComment;
            } else if (selectedSection === 'myPosts') {
                updatedComment = myPostsComment;
            }

            await userAxios.put(`/main/issues/post/${selectedIssueId}`, { description: updatedComment });
            getUserIssues();
            fetchTrendingPosts();
            fetchUserPosts();
            setSelectedIssueId(null);
            setSelectedSection(null);
            setAllPostsComment('');
            setMyPostsComment('');
            setIsEditing(false);
            setRefresh(prev => !prev); // Refresh the issues list
        } catch (error) {
            console.error('Error saving issue: ', error);
        }
    };

    const deleteIssue = async () => {
        if (!selectedIssueId) {
            console.error('Select an issue to delete.');
            return;
        }

        try {
            await userAxios.delete(`/main/issues/${selectedIssueId}`);
            setSelectedIssueId(null);
            setRefresh(prev => !prev);
            getUserIssues();
            fetchTrendingPosts();
            fetchUserPosts();
        } catch (error) {
            console.error('Error deleting issue: ', error);
        }
    };

    const handleUpvote = async (id) => {
        try {
            await userAxios.post(`/main/issues/upvote/${id}`);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error('Error upvoting issue: ', error);
        }
    };
    
    const handleDownvote = async (id) => {
        try {
            await userAxios.post(`/main/issues/downvote/${id}`);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error('Error downvoting issue: ', error);
        }
    };

    return (
        <div className="currentissues-container">
            <div className="currentissues-toprow">
                <h1 className="currentissues-title">All Posts</h1>
            </div>
            <div className="currentissues-main-content">
                {showIssueForm && (
                    <div className="currentissues-issueform-container">
                        <IssueForm />
                    </div>
                )}
                <div className="currentissues-comments-container">
                    <div className="currentissues-left-column">
                        <select className="currentissues-content-selector">
                            <option value='outdoors'>Outdoors</option>
                            <option value='sports'>Sports</option>
                            <option value='travel'>Travel</option>
                            <option value='health'>Health</option>
                            <option value='beauty'>Beauty</option>
                            <option value='religion'>Religion</option>
                            <option value='paranormal'>Paranormal</option>
                            <option value='entertainment'>Entertainment</option>
                            <option value='politics'>Politics</option>
                        </select>
                        <hr className="currentissues-selector-seperator" />
                        <div className="currentissues-content-container">
                            <div className="currentissues-contentinputposts-displayeditems-container">
                                {/* Container for selected item */}
                            </div>
                        </div>
                    </div>
                    <div className="currentissues-center-column">
                        <h2 className="currentissues-trendingposts-title">Trending Posts</h2>
                        <div className="currentissues-content-container full-width">  {/* Added full-width class */}
                            <div className="currentissues-trendingposts-displayeditems-container">
                                <IssueList
                                    issues={trendingPosts}
                                    handleSelect={(id) => handleSelectIssue(id, 'allPosts')}
                                    showUsername={true}
                                    handleUpvote={handleUpvote}
                                    handleDownvote={handleDownvote}
                                    showVoteButtons={true}
                                    showCheckbox={true} // Ensure it's visible for trending posts but only selectable for non-user posts
                                    allowComments={true}
                                />
                            </div>
                            {selectedSection === 'allPosts' && selectedIssueId && (
                                <>
                                    <hr className="currentissues-button-seperator" />
                                    <div className="currentissues-trendingposts-input-container">
                                        <input 
                                            type="text" 
                                            maxLength="200" 
                                            placeholder="Enter your comment" 
                                            value={allPostsComment}
                                            onChange={(e) => setAllPostsComment(e.target.value)}
                                        />
                                    </div>
                                    <div className="currentissues-button-container">
                                        <button className="currentissues-submit-button" onClick={saveEdit}>Submit</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="currentissues-right-column">
                        <h2 className="currentissues-myposts-title">My Posts</h2>
                        <div className="currentissues-content-container">
                            <div className="currentissues-myposts-displayeditems-container">
                                <IssueList
                                    issues={userPosts}
                                    handleSelect={(id) => handleSelectIssue(id, 'myPosts')}
                                    showUsername={false}
                                    handleUpvote={handleUpvote}
                                    handleDownvote={handleDownvote}
                                    showVoteButtons={false}
                                    showCheckbox={true}
                                    allowComments={false} // Ensure it's hidden for user posts
                                />
                            </div>
                            {selectedSection === 'myPosts' && selectedIssueId && (
                                <>
                                    <hr className="currentissues-selector-seperator" />
                                    <div className="currentissues-button-container">
                                        <button className="currentissues-edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                                        <button className="currentissues-delete-button" onClick={deleteIssue}>Delete</button>
                                    </div>
                                    {isEditing && (
                                        <div className="currentissues-mypost-input-container">
                                            <input 
                                                type="text" 
                                                maxLength="200" 
                                                placeholder="Edit your comment"
                                                value={myPostsComment}
                                                onChange={(e) => setMyPostsComment(e.target.value)}
                                            />
                                            <button className="currentissues-save-button" onClick={saveEdit}>Save</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="smapp-right-column">
                    <div className="aconxn-adsbox-container">
                        <AdsBox />
                    </div>
                    <div className="aconxn-chatbox-container">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>
    );
}
