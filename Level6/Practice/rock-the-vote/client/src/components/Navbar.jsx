import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import '../cssFiles/navbar.css'

function Navbar(props) {

    const {logout} = props
    return ( 
        <div id = "navbar">
        <Link to = "/profile"><button>Profile</button></Link>
        <Link to = "/public"><button>Public</button></Link>
        <Link to = "/"><button onClick = {logout}>Logout</button></Link>
        </div>
     );
}

export default Navbar;