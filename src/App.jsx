import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/home/HomePage'
import CartPage from './pages/cart/CartPage'
import LikePage from './pages/like/LikePage'
import ProductsPage from './pages/products/ProductsPage'
import RegisterPage from './pages/register/RegisterPage'
import SinglePage from './pages/single/SinglePage'
import OrderPage from './pages/order/OrderPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='like' element={<LikePage />} />
            <Route path='products' element={<ProductsPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='products/:id' element={<SinglePage />} />
            <Route path='order' element={<OrderPage />} />
            <Route path='checkout' element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App