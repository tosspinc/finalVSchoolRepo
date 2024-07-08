import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import serviceData from "../serviceData";


export default function Services() {
    const navigate = useNavigate()
    //const { serviceId } = useParams()
    //console.log(serviceId)
    const foundServices = serviceData.map(services => (
        <h3 key={services._id}>
            <Link to={`/services/${services.Id}`}>{services.name}</Link> - ${services.price}
        </h3>
    ))
      return (
        <div className="services_page">
            <h2>Residential Plumbing Services we provide: </h2>
            {foundServices}
            
            <div className="buttons-container">
                <button onClick={() => navigate('/')}>Go to Home page</button>
                <button onClick={() => navigate('/about')}>Go to About page</button>
            </div>
            
        </div>
    )
}