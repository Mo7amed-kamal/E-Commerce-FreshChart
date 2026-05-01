import React from 'react'
import Loader from '../Loader/Loader'
import notfound from '../../assets/images/404.jpg'
export default function Notfound() {
  return (
    <>

    <div className="container">
      <img src={notfound} className='' alt="" />
    </div>

    </>
  )
}
