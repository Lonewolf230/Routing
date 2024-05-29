import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Vans from './Pages/Van/Vans'
import VanDetails from './Pages/Van/VanDetails'
import './server'
import Layout from './components/Layout'
import Dashboard from './Pages/Host/Dashboard'
import Income from './Pages/Host/Income'
import Reviews from './Pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans from './Pages/Host/HostVans'
import HostVanDeets from './Pages/Host/HostVanDeets'
import Photos  from './Pages/Host/Photos'
import Details from './Pages/Host/Details'
import Pricing from './Pages/Host/Pricing'

function App() {
  

  return (
    <BrowserRouter>
    
      <Routes >
        <Route path='/'element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='About' element={<About />}/>
          <Route path='Vans' element={<Vans />} />
          <Route path='Vans/:id' element={<VanDetails />} />
          
          <Route path='host' element={<HostLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='income' element={<Income />} />
            <Route path='reviews' element={<Reviews />} />
            <Route path='vans' element={<HostVans />} />
            <Route path='vans/:id' element={<HostVanDeets />} >
              <Route index  element={<Details/>}/>
              <Route path='pricing' element={<Pricing/>}/>
              <Route path='photos' element={<Photos/>}/>
            </Route>
          </Route>
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
