import { useOutletContext } from "react-router-dom"
import './hostvaninfo.css'
export default function Photos(){

    const [vanDeets,setVanDeets]=useOutletContext()
    return(

        <img src={vanDeets.imageUrl} className="host-van-detail-image" />
    )
}