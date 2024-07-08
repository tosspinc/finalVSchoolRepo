import React, { useState } from 'react';

export default function Form({setList}) {
    const [input, setInput] = useState({
        firstName: "",
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log("name: ", name);
      console.log("value: ", value);
      setInput((prevInput) => {
        return {
          ...prevInput,
          [name]: value,
        }
      })
    }

    const handleSubmit = (e) => {
        e.preventDefault();  //stops from refreshing screen.
        setList((prevList) => {
            return [...prevList, input.firstName];
        })
    }
    console.log(input);

    return (
        <form onSumbit = {handleSubmit}>
            <input 
                placeholder='First Name'
                name = 'firstName'
                value = {input.firstName}
                onChange={handleChange}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}