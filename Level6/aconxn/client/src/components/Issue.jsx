    import React from 'react';
    import '../cssfiles/issue.css';

    export default function Issue(props) {
        const { id, title, description, imgUrl, handleSelect } = props;

        return (
            <div className="issue-container">
                <div className='issue'>
                    <img src={imgUrl} className='issue-img' />    
                    <h1 className='issue-title'>{title}</h1>
                    <h3 className='issue-description'>{description}</h3>
                    <input
                        type='checkbox'
                        className='issue-checkbox'
                        onChange={() => handleSelect(id)}
                    />
                </div>
            </div>
        );
    }
