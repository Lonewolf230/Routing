import { useEffect,useState,Suspense } from "react";
import './vans.css'
import { Link,useSearchParams,useLoaderData,defer,Await } from "react-router-dom";
import '../../server'
import {getVans} from '../../api.js'

//loader func outside func comp and hence component rendering delays till fetch is done(rendering after fetching is done)
export  function loader(){
    
        // const res = await fetch("/api/vans")
        // console.log(res)
        // if (!res.ok) {
        //     throw  {
        //         message: "Failed to fetch vans", 
        //         statusText: res.statusText,
        //         status: res.status
        //     }
        //     //throw new Error("Fetch failed")
        // }
        // const data = await res.json()
        // console.log(data.vans)
        // return data.vans
        return defer({data:getVans()})
    
}

export default function Vans(){
    const [searchParams,setSearchParams]=useSearchParams()
    //const [vans,setVans]=useState([]);
    
    //const [isLoading,setIsLoading]=useState(false)//for setting up loading state
    //const [error,setError]=useState(null)
    const typeFilter=searchParams.get("type")

    const dataPromise=useLoaderData()
    
    //useEffect for fetchin causes fetch after mounting hence causing ui delays. Using loader makes sure the content is loaded before we swap/render some other page Used by including data layer api's

    

    
    
    
    // const displayedVans = typeFilter
    //     ? data.filter(van => van.type === typeFilter)
    //     : data
    
    // //Van display card
    
    
    // const van_cards=displayedVans.map(van=>{
    //     return(
    //         <div key={van.id} className="van-tile" >
    //             <Link to={`${van.id}`} state={{search:searchParams.toString(),type:typeFilter}} aria-label={`View details for ${van.name}, 
    //                                                     priced at $${van.price} per day`}>
                
    //                 <img src={van.imageUrl} alt={`Image of ${van.name}`}/>
    //                 <div className="van-info" style={{color:"black"}}>
    //                     <h3>{van.name}</h3>
    //                     <p >${van.price}/day</p>
    //                 </div>
    //                 <i className={'van-type ${van.type} selected'}>{van.type.charAt(0).toUpperCase()+van.type.slice(1)}</i>
                
    //             </Link>
    //         </div>
    //     )
    // })
    
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    

    return(
        
        <>
            

            <div className="van-list-container">
                <h1>Explore all Vans</h1>
               <Suspense fallback={<h1>Loading...</h1>}> 
                <Await resolve={dataPromise.data}>
                    {(vans)=>{
                        const displayedVans = typeFilter
                        ? vans.filter(van => van.type === typeFilter)
                        : vans
                    
                    //Van display card
                    
                    
                    const van_cards=displayedVans.map(van=>{
                        return(
                            <div key={van.id} className="van-tile" >
                                <Link to={`${van.id}`} state={{search:searchParams.toString(),type:typeFilter}} aria-label={`View details for ${van.name}, 
                                                                        priced at $${van.price} per day`}>
                                
                                    <img src={van.imageUrl} alt={`Image of ${van.name}`}/>
                                    <div className="van-info" style={{color:"black"}}>
                                        <h3>{van.name}</h3>
                                        <p >${van.price}/day</p>
                                    </div>
                                    <i className={'van-type ${van.type} selected'}>{van.type.charAt(0).toUpperCase()+van.type.slice(1)}</i>
                                
                                </Link>
                            </div>
                        )
                    })

                    return(
                        <>
                            <div className="van-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange("type", "simple")}
                        className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                    >Simple</button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                    >Luxury</button>
                    <button
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                    >Rugged</button>
                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >Clear filter</button>
                    ) : null}
                
                </div>
                    <div className="van-list">
                        {van_cards}
                    </div>
                        </>
                    )
                    }}
                    
                </Await>
                </Suspense>
            </div>
                
        </>
    )
}