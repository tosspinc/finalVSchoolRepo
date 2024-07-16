import Issue from "./Issue"
import '../cssFiles/issuelist.css'



function IssueList(props){

    const {issues, isPublic} = props
    console.log(props)
    const issueElements = issues.map(issue => {
        return(
            <Issue key={issue._id} {...issue} isPublic={isPublic}/>
        )
    })

    return(
        <div className="issue-list-container">
            {issueElements}
        </div>
    )
}

export default IssueList