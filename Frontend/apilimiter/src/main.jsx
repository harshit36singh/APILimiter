import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/navbar.jsx'
import Midcom from './components/midcom.jsx'
import Cards from './components/Cards.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <Midcom/>
   
  </StrictMode>,
)
