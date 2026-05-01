import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayOut() {

  const [showBtn, setShowBtn] = useState(false)

  function goToUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

      {showBtn && (
        <button onClick={goToUp} className='btn-up'>
          <i className="fa-solid fa-circle-up fa-bounce"></i>
        </button>
      )}
    </>
  )
}
