
import { Link,Outlet, NavLink,useLoaderData} from "react-router-dom"
import './hostvandeets.css'
import { getVan } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({params,request}){
    await requireAuth(request)
    return getVan(params.id)
}

export default function HostVanDeets(){

    const styles={
        color:"red",
        fontWeight:"bolder",
        textDecoration:"underline"
    }

    //const [vanDeets,setVanDeets]=useState(null)
    const vanDeets=useLoaderData()
    
    
    //const params=useParams()

    // useEffect(()=>{
    //     fetch(`/api/host/vans/${params.id}`).then(res=>res.json())
    //     .then(res=>setVanDeets(res.vans[0]))
        
    // },[])
    
    
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
                            {vanDeets.type
                            }
                        </i>
                        <h3>{vanDeets.name
                        }</h3>
                        <h4>${vanDeets.price
                        }/day</h4>
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
                <Outlet  context={[vanDeets]}/>
            </div>


            
        </section>
    )
}


/*<section>
            <Link to='../vans'  className="back-button"> &larr; <span>Back to all vans</span></Link>
            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type`}
                        >
                            {//vanDeets.type
                            }
                        </i>
                        <h3>{//vanDeets.name
                        }</h3>
                        <h4>${//vanDeets.price
                        }/day</h4>
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
                <Outlet  context={[vanDeets]}/>
            </div>


            
        </section>
        */