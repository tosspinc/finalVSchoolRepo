import React from "react";

export default function Joke(props) {
    const [isShown, setIsShown] = React.useState(false)

    function toggleShown() {
        setIsShown(prevShown => !prevShown)
    }

    return (
        <div>
            {props.setup && <h3>{props.setup}</h3>}
            {isShown && <p>{props.punchline}</p>}
            {/*using the ternary ? it checks if isShown is true or false.  if true then it will display hide punchline button. */}
            <button onClick={toggleShown}>{isShown ? 'Hide' : 'Show'} Punchline</button>
            <hr />
        </div>
    )
}
