import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../pages/Popup";
import TosspiContext from "../context/TosspiContext";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import "../cssFiles/navbar.css"; 

export default function Navbar() {
    const [popupVisible, setPopupVisible] = useState(false);
    const { user, logout, token, cartItems } = useContext(TosspiContext);
    const { shoppingCartItems } = useContext(ShoppingCartContext)
    
    console.log(user)

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    return (
        <nav className="navbar-top">
            <div className="navleft-company-logo">
                <Link to='/'>
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
                {token ? (
                    <>
                        <span className="username-display">Welcome: {user.username}</span>
                        <button className="item login" onClick={logout}>
                            <img src="./src/assets/Imgs/Logout.png" className="logout-logo" />
                        </button>
                    </>
                ) : (
                    <>
                        <span className="username-display">Welcome:</span>
                        <button className="item login" onClick={togglePopup}>
                            <img src="./src/assets/Imgs/Login.jpg" className="login-logo" />
                        </button>
                    </>
                )}
                <div className="navright-shopping-cart">
                    <Link to='/shoppingcart' className="item shoppingcart">
                        <img src="./src/assets/Imgs/shopping-cart.jpg" className="cart-logo" />
                        <span className="cart-count">{cartItems.length}</span>
                    </Link>
                </div>
            </div>
            {popupVisible && <Popup closePopup={togglePopup} />}
        </nav>
    );
}
