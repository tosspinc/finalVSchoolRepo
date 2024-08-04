import Issue from './Issue';
import '../cssfiles/issuelist.css';

export default function IssueList(props) {
    const { issues, handleSelect } = props

    const issueElements = issues.map(issue => (
        <Issue 
            key={issue._id}
            id={issue._id}
            title={issue.title}
            description={issue.description}
            imgUrl={issue.imgUrl}
            handleSelect={handleSelect}
        />
    ))

    return (
        <div className='issuelist-container' >
            {issueElements}
        </div>
    )
}