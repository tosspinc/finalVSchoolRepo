import React from "react";

export default function Navigation({ handleNavigation, handleLogout }) {
    return (
        <div className='navigation-dropdown'>
            <select onChange={(e) => handleNavigation(e.target.value)}>
                <option value="">Navigate to...</option>
                <option value="/currentIssues">Current Issues</option>
                <option value="/addNewIssue">Add New Issue</option>
                <option value="/myPosts">My Posts</option>
                <option value="" onClick={handleLogout}>Logout</option>
            </select>
        </div>
    )
}