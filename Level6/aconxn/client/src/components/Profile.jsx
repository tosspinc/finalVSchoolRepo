import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import IssueList from './IssueList';

function Profile() {
    const { user, getUserIssues, issues } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])
    console.log(issues)
    return (
        <>
            <IssueList issues = {issues}/>
        </>
    )
}

export default Profile