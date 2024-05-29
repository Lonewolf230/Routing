import { useState,useEffect } from "react"
import { useParams,Link,Outlet, NavLink} from "react-router-dom"
import './hostvandeets.css'

export default function HostVanDeets(){

    const styles={
        color:"red",
        fontWeight:"bolder",
        textDecoration:"underline"
    }

    const [vanDeets,setVanDeets]=useState(null)
    const params=useParams()

    useEffect(()=>{
        fetch(`/api/host/vans/${params.id}`).then(res=>res.json())
        .then(res=>setVanDeets(res.vans[0]))
        
    },[])
    
    if (!vanDeets) {
        return <h1>Loading...</h1>
    }
    // can set relative="path" to remove relativity based on hierarchy
    return (
        <section>
            <Link to='../vans'  className="back-button"> &larr; <span>Back to all vans</span></Link>
            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={vanDeets.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${vanDeets.type}`}
                        >
                            {vanDeets.type}
                        </i>
                        <h3>{vanDeets.name}</h3>
                        <h4>${vanDeets.price}/day</h4>
                    </div>
                </div>
                <nav className="host-van-detail-nav">
                    <NavLink 
                    to="." end
                    style={({isActive})=>isActive? styles:null}>Details</NavLink>
                    <NavLink to="pricing"
                    style={({isActive})=>isActive? styles:null}>Pricing</NavLink>
                    <NavLink to="photos"
                    style={({isActive})=>isActive? styles:null}>Photos</NavLink>
                </nav>
                <Outlet  context={[vanDeets,setVanDeets]}/>
            </div>


            
        </section>
    )
}