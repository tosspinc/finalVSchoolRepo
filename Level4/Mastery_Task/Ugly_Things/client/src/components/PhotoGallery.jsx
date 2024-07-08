import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function PhotoGallery() {
  const { uglyThings, deleteUglyThing, editUglyThing } = useContext(ThemeContext);
  const [editModes, setEditModes] = useState(uglyThings.map(() => false));
  const [editedTitles, setEditedTitles] = useState(uglyThings.map(() => ''));
  const [editedDescriptions, setEditedDescriptions] = useState(uglyThings.map(() => ''));
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState(uglyThings.map(() => ''));

  const updateLocalStorage = () => {
    uglyThings.forEach((uglyThing) => {
      localStorage.setItem(`comments_${uglyThing._id}`, JSON.stringify(comments[uglyThing._id] || []));
    });
  };

  useEffect(() => {
    const storedComments = {};
    uglyThings.forEach((uglyThing) => {
      const storedCommentsForUglyThing = JSON.parse(localStorage.getItem(`comments_${uglyThing._id}`));
      if (storedCommentsForUglyThing) {
        storedComments[uglyThing._id] = storedCommentsForUglyThing;
      }
    });
    setComments(storedComments);
  }, [uglyThings]);

  useEffect(() => {
    updateLocalStorage();
  }, [comments, uglyThings]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      updateLocalStorage();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleEdit = (index, uglyThing) => {
    const updatedEditModes = [...editModes];
    const updatedEditedTitles = [...editedTitles];
    const updatedEditedDescriptions = [...editedDescriptions];

    updatedEditModes[index] = true;
    updatedEditedTitles[index] = uglyThing.title;
    updatedEditedDescriptions[index] = uglyThing.description;

    setEditModes(updatedEditModes);
    setEditedTitles(updatedEditedTitles);
    setEditedDescriptions(updatedEditedDescriptions);
  };

  const handleCancelEdit = (index) => {
    const updatedEditModes = [...editModes];
    const updatedEditedTitles = [...editedTitles];
    const updatedEditedDescriptions = [...editedDescriptions];

    updatedEditModes[index] = false;
    updatedEditedTitles[index] = '';
    updatedEditedDescriptions[index] = '';

    setEditModes(updatedEditModes);
    setEditedTitles(updatedEditedTitles);
    setEditedDescriptions(updatedEditedDescriptions);
  };

  const handleSaveEdit = (index, uglyThing) => {
    editUglyThing(uglyThing._id, editedTitles[index], editedDescriptions[index]);

    const updatedEditModes = [...editModes];
    const updatedEditedTitles = [...editedTitles];
    const updatedEditedDescriptions = [...editedDescriptions];

    updatedEditModes[index] = false;
    updatedEditedTitles[index] = '';
    updatedEditedDescriptions[index] = '';

    setEditModes(updatedEditModes);
    setEditedTitles(updatedEditedTitles);
    setEditedDescriptions(updatedEditedDescriptions);
  };

  const handleAddComment = (index, comment) => {
    const uglyThing = uglyThings[index];
    const uglyThingId = uglyThing._id;
    const updatedComments = { ...comments };
    if (!updatedComments[uglyThingId]) {
      updatedComments[uglyThingId] = [];
    }
    updatedComments[uglyThingId] = [...updatedComments[uglyThingId], comment];
    setComments(updatedComments);
    const updatedCommentInputs = [...commentInputs];
    updatedCommentInputs[index] = '';
    setCommentInputs(updatedCommentInputs);
    updateLocalStorage();
  };

  const handleDeleteComment = (uglyThingId, commentIndex) => {
    const updatedComments = { ...comments };
    updatedComments[uglyThingId] = comments[uglyThingId].filter((_, index) => index !== commentIndex);
    setComments(updatedComments);
    updateLocalStorage();
  };

  return (
    <div className='img_gallery'>
      {uglyThings.map((uglyThing, index) => (
        <div key={uglyThing._id} className='photo-sq'>
          <img src={uglyThing.imgUrl} alt={uglyThing.title} />
          {editModes[index] ? (
            <>
              <input
                type='text'
                value={editedTitles[index]}
                onChange={(e) => {
                  const updatedEditedTitles = [...editedTitles];
                  updatedEditedTitles[index] = e.target.value;
                  setEditedTitles(updatedEditedTitles);
                }}
              />
              <input
                type='text'
                value={editedDescriptions[index]}
                onChange={(e) => {
                  const updatedEditedDescriptions = [...editedDescriptions];
                  updatedEditedDescriptions[index] = e.target.value;
                  setEditedDescriptions(updatedEditedDescriptions);
                }}
              />
              <button onClick={() => handleSaveEdit(index, uglyThing)}>Save</button>
              <button onClick={() => handleCancelEdit(index)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{uglyThing.title}</h3>
              <p>{uglyThing.description}</p>
              <div className='edit-delete'>
                <button onClick={() => handleEdit(index, uglyThing)}>Edit</button>
                <button onClick={() => deleteUglyThing(uglyThing._id)}>Delete</button>
              </div>
              <input
                type='text'
                value={commentInputs[index]}
                onChange={(e) => {
                  const updatedCommentInputs = [...commentInputs];
                  updatedCommentInputs[index] = e.target.value;
                  setCommentInputs(updatedCommentInputs);
                }}
                className='comment-input'
              />
              <button onClick={() => handleAddComment(index, commentInputs[index])}>Add Comment</button>
              {comments[uglyThing._id] &&
                comments[uglyThing._id].map((comment, commentIndex) => (
                  <div key={commentIndex} className='comment-section'>
                    <p>{comment}</p>
                    <button onClick={() => handleDeleteComment(uglyThing._id, commentIndex)}>x</button>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}