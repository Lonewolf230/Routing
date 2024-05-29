import { useEffect,useState } from "react";
import './vans.css'
import { Link } from "react-router-dom";


export default function Vans(){
    
    const [vans,setVans]=useState([]);

    useEffect(()=>{
        fetch("/api/Vans").then(response=>response.json())
        .then(response=>setVans(response.vans))
        
    },[])
    
    //Van display card
    const van_cards=vans.map(van=>{
        return(
            <div key={van.id} className="van-tile" >
                <Link to={`/Vans/${van.id}`} aria-label={`View details for ${van.name}, 
                                                        priced at $${van.price} per day`}>
                
                    <img src={van.imageUrl} alt={`Image of ${van.name}`}/>
                    <div className="van-info" style={{color:"black"}}>
                        <h3>{van.name}</h3>
                        <p >${van.price}/day</p>
                    </div>
                    <i className={'van-type ${van.type} selected'}>{van.type.charAt(0).toUpperCase()+van.type.slice(1)}</i>
                
                </Link>
            </div>
        )
    })

    return(
        <>
            <div className="van-list-container">
                <h1>Explore all Vans</h1>
                <div className="van-list">
                    {van_cards}
                </div>
            </div>
            
        </>
    )
}