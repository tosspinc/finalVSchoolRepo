import Issue from './Issue';
import '../cssfiles/issuelist.css';

export default function IssueList(props) {
    const { issues, handleSelect, showUsername, handleUpvote, handleDownvote, showVoteButtons, showCheckbox, allowComments } = props;

    const issueElements = issues.map(issue => (
        <Issue 
            key={issue._id}
            id={issue._id}
            title={issue.title}
            description={issue.description}
            imgUrl={issue.imgUrl}
            username={ showUsername ? issue.userId.username : undefined }
            handleSelect={handleSelect}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
            upvotes={issue.upvotes}
            downvotes={issue.downvotes}
            showVoteButtons={showVoteButtons}
            showCheckbox={showCheckbox}
            allowComments={allowComments}
            comments={issue.comments}
        />
    ));

    return (
        <div className='issuelist-container'>
            {issueElements}
        </div>
    );
}
