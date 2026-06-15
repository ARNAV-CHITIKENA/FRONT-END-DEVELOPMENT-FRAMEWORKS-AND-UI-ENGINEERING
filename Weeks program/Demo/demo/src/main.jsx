import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Approach2 from './Approach2.jsx'
import Approach4 from './Approach4.jsx'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Approach2/> */}
    <Approach4 />

  </StrictMode>,
)
