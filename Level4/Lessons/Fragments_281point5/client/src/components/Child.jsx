import React from "react";
import Grandchild from "./Grandchild";

export default function Child() {
    return (
        <div className="child-component">
            <h1>I'm the only child component.</h1>
            <Grandchild />
        </div>
    )
}