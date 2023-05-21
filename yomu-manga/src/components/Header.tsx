import React from 'react'
import logo from '../assets/logo.svg'

function Header() {
  return (
    <header className='w-full flex justify-between items-center bg-[#101A36] sm:px-8 px-4 py-4 border-b border-b-[#101A36]'>
        <img src={logo} alt="logo" className='w-[300px] object-contain'/>
        <li>
            <a href="#">Home</a>
            <a href="#">Login</a>
            <a href="#">Create</a>
        </li>
    </header>
  )
}

export default Header