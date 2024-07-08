import React, {useState} from 'react';

const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [value, setValue] = useState('dark')

    const themeAction = () => {
        setValue(prevValue => prevValue === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{value, themeAction}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}