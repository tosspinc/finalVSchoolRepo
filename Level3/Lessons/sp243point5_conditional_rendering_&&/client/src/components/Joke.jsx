import React from "react";

export default function Joke(props) {
    const [shown, isShown] = React.useState(false)

    function toggleShown() {
        setIsShown(prevShown => !prevShown)
    }

    return (
        <div>
            {props.setup && <h3>{props.setup}</h3>}
            {isShown && <p>{props.punchline}</p>}
            <button onClick={toggleShown}>Show Punchline</button>
            <hr />
        </div>
    )
}

const cond1 = false
const cond2 = false
if(cond1 && console.log("hello there")) {
    
}