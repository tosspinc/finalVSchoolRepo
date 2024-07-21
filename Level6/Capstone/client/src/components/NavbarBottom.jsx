import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import { Link } from 'react-router-dom';
import "../cssFiles/navbarbottom.css"


export default function NavbarBottom() {
    return (
        <div className="navbar-bottom-container">
            <div className="item all-products">All Products</div>
            <Link to='/applianceParts' className='item appliance-parts'>Appliance Parts</Link>
            <Link to='/books' className='item books'>Books</Link>
            <Link to='/pets' className='item pets'>Pets</Link>
            <Link to='/womens-items' className='item womens-items'>Women's Items</Link>
            <Link to='/mens-items' className='item mens-items'>Mens Items</Link>
            <Link to='/kids-items' className='item kids-items'>Kids Items</Link>
            <div className="item shoes">Shoes</div>
            <div className="item household-goods">Household</div>
            <div className="item electronic-goods">Electronics</div>
            <div className="item tools">Tools</div>
            <div className="item outdoor-products">Outdoors</div>
            <div className="item toy-products">Toys</div>
            <div className="item sports-products">Sports</div>
            
        </div>
    );
}
