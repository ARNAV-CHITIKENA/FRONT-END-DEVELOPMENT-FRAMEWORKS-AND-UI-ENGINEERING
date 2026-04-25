import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Parent2 from './Components/Parent2.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Parent2></Parent2>
  
  </StrictMode>,
)
