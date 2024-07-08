import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export default function ApplianceDetails() {
    const { id } = useParams()
    const [appliance, setAppliance] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/Appliance/${id}`)
            .then(response => response.json())
            .then(data => setAppliance(data))
            .catch(error => console.error('Error fetching appliance item: ', error))
    }, [id])

    if (!appliance) return <div>Loading...</div>

    return (
        <div className="appliance-detail">
            <img src={appliance.imageUrl} alt={appliance.title} />
            <h1>{appliance.title}</h1>
            <p>{appliance.Number}</p>
            <p>{appliance.description}</p>
            <p>Manufacturer: {appliance.manufacturer}</p>
            <p>Price: {appliance.price}</p>
            <p>Likes: {appliance.likes}</p>
        </div>
    )
}