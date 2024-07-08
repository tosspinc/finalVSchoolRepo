import React from "react";

export default function Form() {
    const [firstName, setFirstName] = React.useState('')

    console.log(firstName)          

    function handleChange(event) {
        setFirstName(event.target.value)
    }

    return (
        <form>
            <input 
                type='text'
                placeholder='First Name'
                onChange={handleChange}
            />
        </form>
    )
}