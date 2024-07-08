import React from "react";

export default function Jokes(props) {
    return (
        <div>
            {props.setup &&
                <div>
                    <h1>Setup: </h1>
                    <p>{props.setup}</p>
                </div>
            }
            {props.punchline &&   
                <div>
                    <h1>Punchline: </h1>
                    <p>{props.punchline}</p>
                </div>
            }
            <hr />
        </div>
    )
}

