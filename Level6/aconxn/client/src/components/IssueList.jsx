import Issue from './Issue';
import '../cssfiles/issuelist.css';

export default function IssueList(props) {
    const { issues, handleSelect, showUsername } = props

    const issueElements = issues.map(issue => (
        <Issue 
            key={issue._id}
            id={issue._id}
            title={issue.title}
            description={issue.description}
            imgUrl={issue.imgUrl}
            username={ showUsername ? issue.userId.username : undefined } //this conditionally passes the username where needed.
            handleSelect={handleSelect}
        />
    ))

    return (
        <div className='issuelist-container' >
            {issueElements}
        </div>
    )
}