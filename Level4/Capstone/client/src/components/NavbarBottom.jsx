import React from "react";
import { Link } from 'react-router-dom';

export default function NavbarBottom() {
    return (
        <div className="navbar-bottom-container">
            <Link to='/appliance-products' className="item appliance-products">Appliances</Link>
            <Link to='/womens-clothing' className="item womens-clothing">Womens</Link>
            <Link to='/mens-clothing' className="item mens-clothing">Mens</Link>
            <Link to='/kids-products' className="item kids-products">Kids</Link>
            <div className="item shoes">Shoes</div>
            <div className="item household-goods">Household Goods</div>
            <div className="item pet-products">Pets</div>
            <div className="item electronic-goods">Electronics</div>
            <div className="item tools">Tools</div>
            <div className="item outdoor-products">Outdoor goods</div>
            <div className="item toy-products">Toys</div>
            <div className="item books">Books</div>
            <div className="item sports-products">Sports</div>
            <div className="item all-products">All Products</div>
        </div>
    );
}
