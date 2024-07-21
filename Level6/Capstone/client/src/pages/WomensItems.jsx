import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import InventoryItem from "./InventoryItem";
import "../cssFiles/womensitems.css"


export default function WomensItems() {
    const { inventory } = useContext(TosspiContext);
    const womensItems = inventory.filter(item => item.category === 'Womens Items')

    return (
        <div className="womens-items-row">
            <div className="womens-items-search-container">
                <h1>Women's Items</h1>
                <div className='womens-items-grid'>
                    {womensItems.map(womensItems => (
                        <InventoryItem key={womensItems} item={womensItem._id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}