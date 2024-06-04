import ReactDOM from 'react-dom/client'
import { Link,createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Vans,{loader as vansPageLoader} from './Pages/Van/Vans'
import VanDetails,{loader as vanDetailsLoader} from './Pages/Van/VanDetails'
import './server'
import Layout from './components/Layout'
import Dashboard from './Pages/Host/Dashboard'
import Income from './Pages/Host/Income'
import Reviews from './Pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans,{loader as hostVansLoader} from './Pages/Host/HostVans'
import HostVanDeets,{loader as hostVanDeetsLoader} from './Pages/Host/HostVanDeets'
import Photos  from './Pages/Host/Photos'
import Details from './Pages/Host/Details'
import Pricing from './Pages/Host/Pricing'
import ErrorPage from './Pages/ErrorPage'
import Error from './components/Error'
import Login,{loader as loginLoader,action as loginAction} from './Pages/Login'
import {requireAuth} from './utils'
//localStorage.removeItem("isLoggedIn")

//Browser router doesnt allow usage of Data api's
//createRoutesfromElements converts routes to js objects then passed to createbrowserRouter

const routerobjs=createBrowserRouter(createRoutesFromElements(
  <Route path='/'element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='About' element={<About />}/>
          <Route path="login" element={<Login />} loader={loginLoader} action={loginAction}/>
          <Route path='vans' element={<Vans />} loader={vansPageLoader} errorElement={<Error />}/>
          <Route path='vans/:id' element={<VanDetails />} loader={vanDetailsLoader} errorElement={<Error/>}/>
          
          <Route path='host' element={<HostLayout />} >
            <Route index element={<Dashboard />} 
            loader={async ({request}) =>await  requireAuth(request)}/>


            <Route path='income' element={<Income />} 
            loader={async ({request}) => {
              return await requireAuth(request)
            }}/>
            <Route path='reviews' element={<Reviews />} 
            loader={async ({request}) => {
              return await requireAuth(request) 
            }}/>
            <Route path='vans' element={<HostVans />} 
            loader={hostVansLoader} errorElement={<Error/>}/>

            <Route path='vans/:id' element={<HostVanDeets/>} 
            loader={hostVanDeetsLoader} errorElement={<Error/>}>

              <Route index  element={<Details/>}
              loader={async ({request}) => {
                return await requireAuth(request)
              }}/>
              <Route path='pricing' element={<Pricing/>}
              loader={async ({request}) => {
                return await requireAuth(request)
              }}/>
              <Route path='photos' element={<Photos/>}
              loader={async ({request}) => {
                return await requireAuth(request)
              }}/>
            </Route>
            
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Route>
))

function App() {
  

  return (
    <RouterProvider router={routerobjs}/>
  )
}

export default App





//Protected Routes without loaders
//Nest the req protected route 
//in the parent route conditionally render your outlet(protected) based on whether user loggin in or not else Navigate to Login page
//works because fetch happens only if component renders 


//when using loaders instead of nesting write a separate route for auth with element pointing to 
//required component and in loader check login status and use redirect() to point user to login page if not logged in
//We do it in loader because data fetches even before rendering
//only downside is to define loader for each route separately