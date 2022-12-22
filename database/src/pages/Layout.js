import React from 'react'
import { NavLink } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <ul className='flex space-x-3 items-center font-medium text-xl'>
     <li>
         <NavLink to={"/"}>Home</NavLink>
     </li>
     <li>
         <NavLink to={"/signup"}>Kayıt</NavLink>
     </li>
     <li>
         <NavLink to={"/login"}>Giriş</NavLink>
     </li>
    </ul>
    </>
  )
}

export default Layout