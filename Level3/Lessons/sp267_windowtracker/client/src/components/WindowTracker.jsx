import React from "react";

export default function WindowTracker() {
    
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    React.useEffect(() => {
        function watchWidth() {
            console.log('setting up...')
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', watchWidth)
        //this part cleans up the memory leak. called a function cleanup.
        return function() {
            console.log('cleaning up....')
            window.removeEventListener('resize', watchWidth)
        }
    }, [])

    return (
        <h1>Window Width: {windowWidth}</h1>
    )
}