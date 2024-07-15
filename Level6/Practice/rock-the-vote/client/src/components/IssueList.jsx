import Issue from "./Issue"
import '../cssFiles/issuelist.css'



function IssueList(props){

    const {issues} = props

    const issueElements = issues.map(issue => {
        return(
            <Issue key={issue._id} {...issue}/>
        )
    })

    return(
        <div className="issue-list-container">
            {issueElements}
        </div>
    )
}

export default IssueList