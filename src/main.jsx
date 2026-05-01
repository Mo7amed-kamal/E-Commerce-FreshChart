import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Components/Context/CartContext.jsx'
import WishListContextProvider from './Components/Context/WishListContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
    <WishListContextProvider>
    <App />
    </WishListContextProvider>
    </CartContextProvider>
  </StrictMode>,
)
