import { useState } from 'react'
import './App.css'

export default function App() {
  const [list, setList] = useState(["Jane", "John", "Zak"])
  const   listElements = list.map((name) =>  <p>{name}</p>)
  //const listElements = list.map((name) => <p>`The person's name is: ${name}`</p>)
  
  return (
    <>
      <div className='App'>
        <h2>Add New Name.</h2>
        <form className='form-container' setList={setList} />
        <h1>Names</h1>
        {listElements}
      </div>
    </>
  )
}

/**
Part 1:
1) Map through the "List" state and render each name
in a <p> tag
2) Render the list under <h1>Names</h1>

Part 2:
1) Go to the Form component and complete the form
so that an input can be added to the field and saved
to state
2) In the handleSubmit function, add a console.log 
statement to print out the form data for now

Part 3
1) Implement the handleSubmit function in Form so that
when the input is submitted, it will be added to the end of
the List state
*/
