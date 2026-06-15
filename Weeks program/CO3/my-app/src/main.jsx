
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import DefaultParams from './components/DefaultParams.jsx'
//import Childrenprop from './components/Childrenprop.jsx'
//import Counter from './components/Counter.jsx'
// import StudentList from './components/StudentsList.jsx'
//import ResponsiveLayout from './components/ResponsiveLayout.jsx'
// import ControlledForm from './components/ControlledForm.jsx'
import UncontrolledForm from './components/UncontrolledForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<Default />*/}
    {/* <Counter />*/}
    {/*<StudentList/>*/}
    {/*<ResponsiveLayout />*/}
    {/*<ControlledForm />*/}
   <UncontrolledForm />
    {/*<Childrenprop/>*/}

  </StrictMode>,)