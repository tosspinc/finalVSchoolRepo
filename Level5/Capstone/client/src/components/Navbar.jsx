import React from "react";
import { Link } from "react-router-dom";
import "../cssFiles/navbar.css" 

export default function Navbar() {
    return (
        <nav className="navbar-top">
            <div className="navleft-company-logo">
                <Link to= '/'>
                    <img src="./src/assets/Imgs/Transp_Tosspi_logo.png" className="tosspi-logo" />
                </Link>
            </div>
            <div className="navcenter-search">
                <div className="search-container">
                    <button type="submit" className="all"> All <i className="fa fa-sort-desc"></i></button>
                        <input type="text" placeholder="Search Tosspi " />
                    <button type="submit" className="search"><i className="fa fa-search"></i></button>
                </div>
            </div>
            <div className="navright-login">
                <Link to='/login' className="item login">
                    <img src="./src/assets/Imgs/Login.jpg" className="login-logo" />
                </Link>
                <div className="navright-shopping-cart">
                    <Link to='/shoppingcart' className="item shoppingcart">
                        <img src="./src/assets/Imgs/shopping-cart.jpg" className="cart-logo" />
                    </Link>
                </div>
            </div>
        </nav>
        
    )
}