import React, {useContext} from "react";
import { ThemeContext } from "../ThemeContext";

export default function Main(props) {
    const {value, themeAction} = useContext(ThemeContext)  

    return (
        <>
            <div classame={`light-container`}>
                <div className='center'>
                    <button className='button' onClick={themeAction}>
                        {value} Mode
                    </button>
                </div>
            </div>
        </>
    )
}