import { useContext, useState } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userTokenContext } from '../Context/UserTokenContext'
import { Badge } from 'flowbite-react'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  let {token,setToken} = useContext(userTokenContext)
  let {cartItemNo} = useContext(CartContext)
  let {countProduct} = useContext(WishListContext)
  let navigate = useNavigate()

    function logOut(){
      setToken(null)
      localStorage.removeItem('token')
      navigate('/login')
    }

  return (

<nav className=" sticky top-0 z-50 shadow-md bg-[#e8e9ea]">
  <div className="container mx-auto px-4">

    {/* Top Bar */}
    <div className="flex items-center justify-between h-16">

      {/* Logo */}
      <NavLink to="home">
        <img width={135} src={logo} alt="logo" />
      </NavLink>

      {/* Burger Icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden text-2xl"
      >
        <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-between w-full">
        {/* Left Side - Links */}
        {token && (
          <ul className="flex gap-5 text-lg items-center m-5 active-edit">
            <li><NavLink to="home">Home</NavLink></li>
            <li><NavLink to="cart">Cart</NavLink></li>
            <li><NavLink to="products">Products</NavLink></li>
            <li><NavLink to="categories">Categories</NavLink></li>
            <li><NavLink to="brands">Brands</NavLink></li>
          </ul>
        )}


        {/* Right Side - Icons and Cart */}
        
        <ul className="flex  items-center  ms-auto  gap-4">
    
          {token ? (
            <>
          <a href="https://www.facebook.com" target='_blank'><i className="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com" target='_blank'><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.twitter.com" target='_blank'><i className="fa-brands fa-twitter"></i></a>
          <a href="https://www.tiktok.com" target='_blank'><i className="fa-brands fa-tiktok"></i></a>

              <Link to="/cart" className="relative">
                <i className="fa fa-shopping-cart text-main text-2xl"></i>
                <Badge className="bg-main absolute -top-2 -right-3 text-white">
                  {cartItemNo}
                </Badge>
              </Link>

              
              <Link to="/wishList" className="relative">
              <i class="fa-solid fa-heart text-red-600 text-2xl"></i>
                <Badge className="bg-main absolute -top-2 -right-3 text-white">
                  {countProduct}
                </Badge>
              </Link>

              <details className="relative">
    {/* Trigger */}
  <summary
    className="
      list-none cursor-pointer select-none
      flex items-center gap-2
      text-sm hover:text-main">
    {/* Icon (always visible) */}
    <i className="fa-solid fa-key text-lg"></i>

    {/* Text (hidden on mobile) */}
    <span className="hidden lg:inline">Forget Password</span>

    {/* Arrow (desktop only) */}
    <i className="fa-solid fa-chevron-down text-xs hidden lg:inline"></i>
  </summary>

  {/* Dropdown */}
  <div
    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
    <div className="p-4">
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        <i className="fa-solid fa-lock text-main"></i>
        Reset Password
      </h4>

      <p className="text-sm text-gray-500 mb-3">
        Reset your password from here
      </p>
      <Link to={'/forgetPassword'}>
        <button className="block px-3 text-center bg-main text-white py-2 rounded-lg hover:opacity-90 transition">Go to Reset Page </button>
      
      </Link>
    </div>
  </div>
</details>


              <button onClick={logOut}>SignOut</button>
            </> ) : (
            <div className='flex gap-4 ms-auto edit-login text-center justify-center items-center'>
              <NavLink to="">Register<i className="fa-solid fa-user-plus"></i></NavLink>
              <NavLink to="login">Login<i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink>
            </div>
          )}
        </ul>
      </div>
    </div>

    {/* Mobile Menu */}
    <div
      className={`
        lg:hidden
        overflow-hidden
        transition-all duration-300
        ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <div className="py-4 border-t ">
        {token && (
          <ul className="flex flex-col gap-4 text-lg ">
            <NavLink onClick={() => setMenuOpen(false)} to="home">Home</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="cart">Cart</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="products">Products</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="categories">Categories</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="brands">Brands</NavLink>
          </ul>
        )}

        {!token && (
          <ul className="flex flex-col gap-4 text-lg">
            <NavLink onClick={() => setMenuOpen(false)} to="login">Login</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="">Register</NavLink>
          </ul>
        )}

        <div className="flex gap-4 mt-4">
          <a href="https://www.facebook.com" target='_blank'><i className="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com" target='_blank'><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.twitter.com" target='_blank'><i className="fa-brands fa-twitter"></i></a>
          <a href="https://www.tiktok.com" target='_blank'><i className="fa-brands fa-tiktok"></i></a>
          {token && (
            <>
            <Link to="/cart" className="relative" onClick={() => setMenuOpen(false)}>
              <i className="fa fa-shopping-cart text-main text-2xl"></i>
              <Badge className="bg-main absolute -top-2 -right-3 text-white">
                {cartItemNo}
              </Badge>
            </Link>

            <Link to="/wishList" className="relative" onClick={() => setMenuOpen(false)}>
              <i className="fa-solid fa-heart text-red-600 text-2xl"></i>
                <Badge className="bg-main absolute -top-2 -right-3 text-white">
                {countProduct}
                </Badge>
              </Link>

              <details className="relative " >
  {/* Trigger */}
  <summary
    className="
      list-none cursor-pointer select-none
      flex items-center gap-2
      text-sm hover:text-main
    "
  >
    {/* Icon (always visible) */}
    <i className="fa-solid fa-key text-lg"></i>

    {/* Arrow (desktop only) */}
    <i className="fa-solid fa-chevron-down text-xs hidden lg:inline"></i>
  </summary>

  {/* Dropdown */}
  <div
    className=" absolute left-0 mt-2 w-40 bg-main rounded-xl shadow-lg border z-50">
       <Link to={'/forgetPassword'} onClick={() => setMenuOpen(false)}>
        <button className="block px-3 text-center bg-main text-white py-2 rounded-lg hover:opacity-90 transition">Go to Reset Page </button>
      </Link>
  </div>
</details>

            </>
          )}

        </div>


        {token && (
          <button onClick={logOut} className="mt-4">SignOut</button>
        )}
      </div>
    </div>

  </div>
</nav>



  )
}
