import React from "react";
import { Link } from 'react-router-dom';
import "../cssFiles/navbarbottom.css"


export default function NavbarBottom() {
    return (
        <div className="navbar-bottom-container">
            <div className="item all-products">All Products</div>
            <Link to='/applianceParts' className='item appliance-parts'>Appliance Parts</Link>
            <Link to='/books' className='item books'>Books</Link>
            <Link to='/pets' className='item pets'>Pets</Link>
            <Link to='/womans-clothing' className='item womans-clothing'>Women's</Link>
            <Link to='/mens-clothing' className='item mens-clothing'>Mens</Link>
            <Link to='/kids-products' className='item kids-products'>Kids</Link>
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
