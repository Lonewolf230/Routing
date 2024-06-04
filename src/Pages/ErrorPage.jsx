import { Link } from "react-router-dom";
import './errorpage.css'


export default function ErrorPage(){


    return(
        <>
        <div className="not-found-container">
            <h1>Sorry Page you're looking for is not found</h1>
            <Link to="/" className="link-button">Return to home</Link>
        </div>
        </>
    )
}