import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import './VanDetails.css'

export default function VanDetails(){
    const [van,setVan]=useState(null)
    const params=useParams()
    
    useEffect(()=>{
        fetch(`/api/Vans/${params.id}`).then(res=>res.json()).then(res=>setVan(res.vans))
    },[params.id])
    return(
        <>
            <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type.charAt(0).toUpperCase()+van.type.slice(1)}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
        </>
    )
}