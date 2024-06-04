import React, { useState } from "react"
import {useLoaderData,Form,redirect,useActionData,useNavigation } from "react-router-dom"
import './login.css'
import {loginUser} from '../api'

export function loader({request}){
    //can check logged in status and redirect to somewhere else
    const message=new URL(request.url).searchParams.get("message")
    
    return message
}

export async function action({request}){//analogous to handleSubmit
    const formData=await request.formData()//async method return FormData obj
    const email=formData.get("email")
    const password=formData.get("password")
    const searchparam=new URL(request.url).searchParams.get("path")||"../host"

    try{
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin", true)
        const response = redirect(searchparam)
        response.body = true
        return response
    }
    catch(err){
        return err.message
    }
    
    
}

export default function Login() {
    //const [loginFormData,setLoginFormData]=useState({emailId:"",name:""})
    //const [status,setStatus]=useState("idle")
    //const [error,setError]=useState(null)
    const navigation=useNavigation()//track status of the form(state) 
    //used with loaders and actions while we use own functions when not using data layer api's(manual state for status)
    console.log(navigation)
    const actionData=useActionData()
    
    //const navigate=useNavigate()   Can pass state prop together with navigate instead of passing search params like we do in this case use useLocation to access it
    // function handleSubmit(e) {

    //     e.preventDefault()
    //     setStatus("submitting")
    //     setError(null)
    //     document.querySelector("button").disabled=true
    //     async function fetchData(){
    //         try{
    //             const data=await loginUser(loginFormData)
    //             navigate("/host",{replace:true})//navigate to page before login on going back
    //         }
    //         catch(err){
    //             setError(err.message)
                
    //         }
    //         finally{
    //             setStatus("idle")
    //         }
    //         console.log(error)
    //         console.log(status)
    //     }
    //     fetchData()
        
        
    // }

    

    const errmsg=useLoaderData()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {actionData && <h1 className="login-message">{actionData}</h1>}
            <Form  className="login-form" method="post" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    
                />
                <input
                    name="password" 
                    type="password"
                    placeholder="Password"
                    
                />
                <button 
                    disabled={navigation.state === "submitting"}
                    style={{cursor:"pointer"}}
                >
                    {navigation.state === "submitting" 
                        ? "Logging in..." 
                        : "Log in"
                    }
                </button>
            </Form>
            {errmsg &&<h1 className="login-message">{errmsg}</h1>}
        </div>
        
    )

}


//uses native Form default get req change with method prop
//action set to path specifed in route
//handles own state
//we use action function like loader