import { Link, Outlet,NavLink } from "react-router-dom";
import './hostlayout.css'

export default function HostLayout(){

    const styles={
        textDecoration:"underline",
        color:"red",
        fontWeight:"bolder"
    }

    return(
        <> 
            <nav className="host-nav">
                <NavLink to="."  end
                style={({isActive})=>isActive? styles:null}>Dashboard</NavLink>
                <NavLink to="income"
                style={({isActive})=>isActive? styles:null}>Income</NavLink>
                <NavLink to="reviews"
                style={({isActive})=>isActive? styles:null}>Reviews</NavLink>
                <NavLink to="vans"
                style={({isActive})=>isActive? styles:null}>Vans</NavLink>
            </nav>
            <Outlet />
        </>
    )
}