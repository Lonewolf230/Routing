import { useEffect,useState,Suspense } from "react"
import { Link,NavLink,useLoaderData,defer,Await } from "react-router-dom"
import './hostvans.css'
import {getHostVans} from '../../api'
import { requireAuth } from "../../utils"

export async function loader({request}){
    await requireAuth(request)
    return defer({vans:getHostVans()})
}

export default function HostVans(){
    const vanListPromise=useLoaderData()
    //const [vanList,setVanList]=useState([])
    // useEffect(()=>{
    //     fetch(`/api/host/vans`).then(res=>res.json())
    //     .then(res=>setVanList(res.vans))
    // },[])

    
    return(
        <>
          <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <Suspense fallback={<h1>Loading vans...</h1>}>
                <Await resolve={vanListPromise.vans}>
                    {(vanList)=>{
                        const vans=vanList.map(van=>{
                            return(
                                
                            
                            <Link to={`${van.id}`} className="host-van-link-wrapper" key={van.id}>
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
                                <div className="host-vans-list">
                        
                                    <section>
                                        {vans}
                                    </section>

                
                                </div>
                            </>
                        )
                    }}
                    
                </Await>
            </Suspense>
        </section>  
          

        </>
    )
}