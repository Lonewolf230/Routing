import { Link,useLocation,useLoaderData } from "react-router-dom"

import './VanDetails.css'
import {getVan } from '../../api'

export function loader({params}){
    console.log(params)
    return getVan(params.id)
}

export default function VanDetails(){
    //const [van,setVan]=useState(null)
    //const params=useParams()
    const location=useLocation()
    const van=useLoaderData()
    console.log(van)
    // useEffect(()=>{
    //     fetch(`/api/vans/${params.id}`).then(res=>res.json()).then(res=>setVan(res.vans))
    // },[params.id])

    const search= location.state?.search||""
    const type=location.state?.type||"all"
    //for conditional rendering we can use URLSearchParams to get certain param then utilise it
    return(
        <>
            <div className="van-detail-container">
            <Link
                to={`..?${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type.charAt(0).toUpperCase()+van.type.slice(1)}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            
        </div>
        </>
    )
}