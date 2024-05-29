import { useEffect,useState } from "react"
import { Link,NavLink } from "react-router-dom"
import './hostvans.css'

export default function HostVans(){
    const [vanList,setVanList]=useState([])
    useEffect(()=>{
        fetch(`/api/host/vans`).then(res=>res.json())
        .then(res=>setVanList(res.vans))
    },[])

    const vans=vanList.map(van=>{
        return(
            
        
        <Link to={`/host/vans/${van.id}`} className="host-van-link-wrapper" key={van.id}>
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            
            </div>
        </Link>    
    
        )
    })
    return(
        <>
          <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section>
                            {vans}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>  
          

        </>
    )
}