import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function FormSubmission() {
  const submitHandle = useContext(ThemeContext).addUglyThing;

const [todo, setTodo] = useState({
  title: "",
  imgUrl: "",
  description : ""
})

const handleChange = (e) => {
  const {name, value} = e.target;
  setTodo(prevTodo => {
    return {
      ...prevTodo,
      [name] :value
    }
  })
}
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const imgUrl = formData.get('img_url');
    const title = formData.get('img_title');
    const description = formData.get('img_desc');
//have one object state.
    submitHandle(todo);

    setImgUrl('');
    setTitle('');
    setDescription('');
    setFormSubmitted(true);
  };

  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input
            type='url'
            name='imgUrl'
            className='img_url'
            placeholder='Ugly Image URL'
            value={todo.imgUrl}
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='title'
            className='img_title'
            placeholder='Name the Image'
            value={todo.title}
            onChange={handleChange}
          />
          <input
            type='textarea'
            name='description'
            className='img_desc'
            placeholder='Describe the image'
            value={todo.description}
            required
            onChange={handleChange}
          />
          <input type='submit' name='img_submit' className='img_submit' value='Submit Your Image' />
        </form>
      </div>
      {formSubmitted && (
        <div className='form-submitted'>
          <p>Thank you for your submission!</p>
          <a href='/history'>View Submission History</a>
        </div>
      )}
    </>
  );
}