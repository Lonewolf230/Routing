import { useOutletContext } from "react-router-dom"
import './hostvaninfo.css'

export default function Details(){
    const [vanDeets]=useOutletContext()
    return(
        <section className="host-van-detail-info">
            <h4>Name: <span>{vanDeets.name}</span></h4>
            <h4>Category: <span>{vanDeets.type}</span></h4>
            <h4>Description: <span>{vanDeets.description}</span></h4>
            <h4>Visibility: <span>Public</span></h4>
        </section>
        
    )
}


/*
    
*/