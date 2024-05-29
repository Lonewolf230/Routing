
import { Link,NavLink } from 'react-router-dom'
import './header.css'

export default function Header(){

    const styles={
        textDecoration:"underline",
        color:"skyblue",
        fontWeight:"bolder",
    }
    const styles2={
        textDecoration:"underline",
        color:"skyblue",
    }


    return(
        <>
        <header>
            <NavLink className="site-logo" to="/" end 
              style={({isActive})=>isActive? styles2:null}  >#VanLife</NavLink>
            <nav>
                <NavLink to="/about"
                    style={({isActive})=>isActive? styles:null}>About</NavLink>
                <NavLink to="/vans"
                    style={({isActive})=>isActive? styles:null}>Vans</NavLink>
                <NavLink to="/host" 
                    style={({isActive})=>isActive? styles:null}>Host</NavLink>
            </nav>
        </header>
        </>
    )
}