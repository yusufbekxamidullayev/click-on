import React from 'react'
import HeaderPage from '../header/HeaderPage'
import { Outlet } from 'react-router-dom'
import FooterPage from '../footer/FooterPage'

const Layout = () => {
  return (
    <>
      <HeaderPage/>
      <main className='pt-40'>
        <Outlet/>
      </main>
      <FooterPage/>
    </>
  )
}

export default Layout