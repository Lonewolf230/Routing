import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import './App.css'
import Home from './Home'
import About from './About'

function App() {
  

  return (
    <BrowserRouter>
    <nav>      
      <div className='left'>
        <Link to='/'>#VANLIFE</Link>
      </div>  
      
      <div className='right'>
        <Link className='right' to='/About'>About</Link>
        <Link className='right' to='/Vans' >VANS</Link>
      </div>
    </nav>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/About' element={<About />}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
