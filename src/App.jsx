import './App.css'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Login from './Components/Login/Login'
import Notfound from './Components/Notfound/Notfound'
import Brands from './Components/Brands/Brands'
// import Products from './Components/Products/Products'
// import Cart from './Components/Cart/Cart'
import SignOut from './Components/SignOut/SignOut'
import Register from './Components/Register/Register'
import TokenContextProvider from './Components/Context/UserTokenContext'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProtectedLogin from './Components/ProtectedLogin/ProtectedLogin'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Categories from './Components/Categories/Categories'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider, { CartContext } from './Components/Context/CartContext'
import { ToastContainer } from 'react-toastify';
import CheckOut from './Components/CheckOut/CheckOut'
import Order from './Components/Order/Order'
import { lazy, Suspense, useContext, useEffect } from 'react'
import CategoryDetails from './Components/CategoryDetails/CategoryDetails'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import WishListContextProvider, { WishListContext } from './Components/Context/WishListContext'
// import WishList from './Components/WishList/WishList'


  // Use Lazy Loading
let Cart = lazy(()=> import('./Components/Cart/Cart') )
let Products = lazy(()=> import('./Components/Products/Products') )
let WishList = lazy( ()=>  import('./Components/WishList/WishList') )


function App() {

    const routes = createBrowserRouter( [
      {path:"" , element:<LayOut/> , children: [
        {index:true , element:<ProtectedLogin> <Register/> </ProtectedLogin> },
        {path:"login" , element:<ProtectedLogin> <Login/> </ProtectedLogin> },
        {path:"home" , element: <ProtectedRoutes> <Home/> </ProtectedRoutes>  },
        {path:"brands" , element:<ProtectedRoutes>  <Brands/> </ProtectedRoutes>   },
        {path:"products" , element:<ProtectedRoutes> 
            <Suspense fallback={<h1 className='bg-red-500 w-fit text-white text-xl text-center mx-auto'>Wait.. For Loading Component</h1>}>
              <Products/>
            </Suspense>
           </ProtectedRoutes>  },
        {path:"cart" , element:<ProtectedRoutes>  
            <Suspense fallback={<h1 className='bg-red-500 w-fit text-white text-xl text-center mx-auto'>Wait.. For Loading Component</h1>}>
              <Cart />
            </Suspense>
           </ProtectedRoutes> },
        {path:"signout" , element:<ProtectedRoutes> <SignOut/>  </ProtectedRoutes>  },
        {path:"productDetails/:id" , element:<ProtectedRoutes> <ProductDetails/>  </ProtectedRoutes>  },
        {path:'categories' , element: <ProtectedRoutes>  <Categories/> </ProtectedRoutes>},
        {path:'categoryDetails/:id' , element: <ProtectedRoutes>  <CategoryDetails/> </ProtectedRoutes>},
        {path:'checkout/:cartId' , element: <ProtectedRoutes>  <CheckOut/> </ProtectedRoutes>},
        {path:'allorders' , element: <ProtectedRoutes>  <Order/> </ProtectedRoutes>},
        {path:'forgetPassword' , element: <ProtectedRoutes>  <ForgetPassword/> </ProtectedRoutes>},
        {path:'wishList' , element: <ProtectedRoutes>  
            <Suspense fallback={<h1 className='bg-red-500 w-fit text-white text-xl text-center mx-auto'>Wait.. For Loading Component</h1>}>
            <WishList/>
            </Suspense>
           </ProtectedRoutes>},

        {path:"*" , element:<Notfound/>}
      ]} 
      
    ]  )

    
    let query = new QueryClient()

    let {getCart,setCartItemNo} = useContext(CartContext)
    let {getWishlist,setCountProduct} = useContext(WishListContext)

    
    useEffect( () => {
      if( localStorage.getItem("token") ) {
        getCartInfo()
        displayWishList()
      }
   
    } ,[])
    
    async function getCartInfo() {
      if (!localStorage.getItem("token")) return;
    
      try {
        let response = await getCart();
        setCartItemNo(response.numOfCartItems);
        console.log("Public get Cart data", response);
      } catch (err) {
        console.log("Cart Error", err);
      }
    }
    

    async function displayWishList() {
      if (!localStorage.getItem("token")) return;
    
      try {
        let response = await getWishlist();
        setCountProduct(response.data.count);
        console.log("Public wishList Data", response.data);
      } catch (err) {
        console.log("Wishlist Error", err);
      }
    }
    

  return (
    <>
    <QueryClientProvider client={query}>

    <ReactQueryDevtools></ReactQueryDevtools>
   
    <TokenContextProvider>
      
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    
    </TokenContextProvider>

    </QueryClientProvider>
 

  
   


    </>
  )
}

export default App
