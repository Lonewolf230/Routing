import { redirect } from "react-router-dom"



export async function requireAuth(request) {
    const url= new URL(request.url)
    const pathname=url.pathname
    const isLoggedIn = localStorage.getItem("loggedin")

    if (!isLoggedIn) {
        const response = redirect(`/login?message=Please login to access this page&path=${pathname}`)
        response.body = true
        throw response
    }
    return null
}