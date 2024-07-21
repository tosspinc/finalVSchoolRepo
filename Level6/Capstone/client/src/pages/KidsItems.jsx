import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import InventoryItem from "./InventoryItem";
import "../cssFiles/kidsitems.css"


export default function KidsItems() {
    const { inventory } = useContext(TosspiContext);
    const kidsItems = inventory.filter(item => item.category === 'Kids Items')

    return (
        <div className="kids-items-row">
            <div className="kids-items-search-container">
                <h1>Kid's Items</h1>
                <div className='kids-items-grid'>
                    {kidsItems.map(kidsItems => (
                        <InventoryItem key={kidsItems} item={kidsItem._id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}