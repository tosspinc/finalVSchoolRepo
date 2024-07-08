import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export default function AppliancePartDetails() {
    const { id } = useParams()
    const [appliancePart, setAppliancePart] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:9000/api/appliance/${id}`)
            .then(response => response.json())
            .then(data => setAppliancePart(data))
            .catch(error => console.error('Error fetching appliance part: ', error))
    }, [id])

    if (!appliancePart) return <div>Loading...</div>

    return (
        <div className="appliance-parts-detail">
            <img src={appliancePart.imageUrl} alt={appliancePart.title} />
            <h1>{appliancePart.title}</h1>
            <p>{appliancePart.Number}</p>
            <p>{appliancePart.description}</p>
            <p>Manufacturer: {appliancePart.manufacturer}</p>
            <p>Price: {appliancePart.price}</p>
            <p>Likes: {appliancePart.likes}</p>
        </div>
    )
}