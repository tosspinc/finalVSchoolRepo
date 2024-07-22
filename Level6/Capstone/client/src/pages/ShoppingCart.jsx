import { useContext } from "react"
import TosspiContext from "../context/TosspiContext"
import InventoryItem from "./InventoryItem"



export default function ShoppingCart(){

    const {cartItems} = useContext(TosspiContext)
    const cartElements = cartItems.map(item => {
        return(
            <InventoryItem {...item}/>
        )
    })
    return(
        <div>
            {cartElements}
        </div>
    )
}