import React from 'react';
import '../cssfiles/issue.css';

export default function Issue(props) {
    const {title, description, imgUrl} =  props

    return (
        <div className="aconxn-issue-container">
            <div className='aconxn-issue'>
                <img src={imgUrl} className='aconxn-issue-img'/>    
                <h1 className='aconxn-issue-title'>{title}</h1>
                <h3 className='aconxn-issue-description'>{description}</h3>
            </div>
        </div>
    )
}