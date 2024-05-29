
import { useOutletContext } from "react-router-dom"
import './hostvaninfo.css'
export default function Pricing(){
    const [ vanDeets ] = useOutletContext()
    
    return (
        <h3 className="host-van-price">${vanDeets.price}<span>/day</span></h3>
    )
    
}