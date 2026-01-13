import React from 'react'
import Cart from './components/cart/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/home/HomePage'
import CartPage from './pages/cart/CartPage'
import LikePage from './pages/like/LikePage'
import ProductsPage from './pages/products/ProductsPage'
import RegisterPage from './pages/register/RegisterPage'
import SinglePage from './pages/single/SinglePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='cart' element={<CartPage/>} />
          <Route path='like' element={<LikePage/>} />
          <Route path='products' element={<ProductsPage/>} />
          <Route path='register' element={<RegisterPage/>} />
          <Route path='products/:id' element={<SinglePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App