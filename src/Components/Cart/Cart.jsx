import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import {Helmet} from "react-helmet";

export default function Cart() {
  let {setCartItemNo,getCart,removeCart,updateCartProduct,setCartId,cartId} = useContext(CartContext)
  let [cartInfo,setCartInfo] = useState(null)
  let [isloading, setIsLoading] = useState(true)
  let navigate = useNavigate()

  useEffect( ()=> {
    getCartInfo()
  },[])
    
   

   async function getCartInfo() {
     let response = await getCart()
      setCartInfo(response)
      setCartItemNo(response.numOfCartItems)
      setIsLoading(false)
      setCartId(response.data._id)
      console.log("data gat...." , response);
      
}
      
   async function removeItem(id) {
      let res = await removeCart(id)

        setCartInfo(res)
        setCartItemNo(res.numOfCartItems)
        console.log("removeeeeeeee",res);
        
    }


   async function updateProduct(id,count) {
    if(count == 0 ) return
     let res = await updateCartProduct(id,count)
     setCartInfo(res)
     console.log(res);
     
    }

      function goToCheckOut() {
        navigate(`/checkout/${cartId}`)
      }



  return (
      <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>

   
    {isloading ? <Loader/> : <div className="w-full md:w-[75%] mx-auto my-12 bg-neutral-primary-soft shadow-xs rounded-base border border-default p-5">



      {cartInfo?.data?.products == 0  ? 
      <Alert className='bg-red-500 mt-1 p-7 text-white text-center  text-lg flex items-center'>
      <span className="font-medium text-center"><i className="fa-solid fa-alarm-clock"> </i> No Cart Exist For This User , Please Start Shopping</span> 
    </Alert> : <>
      
      <h2 className="text-center font-extrabold text-xl md:text-3xl my-4 text-green-600">Shipping Cart</h2>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 mb-5">
    <h2 className="font-extrabold text-gray-500 text-base md:text-xl">
      Total Cart Item: {cartInfo?.numOfCartItems}
    </h2>
    <h2 className="font-extrabold text-green-500 text-base md:text-xl">
      Total Cart Price: {cartInfo?.data?.totalCartPrice}
    </h2>
</div>

{/* PRODUCTS LIST */}
<div className="flex flex-col gap-4">
          {cartInfo?.data.products?.map((ele) => (<div key={ele._id} id={ele._id}
      className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 transition-all duration-300 ease-in-out animate-fadeIn">

      {/* Image */}
      <img src={ele.product.imageCover} alt="" className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg"/>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">

        {/* Product Title */}
        <h3 className="font-bold text-heading text-sm md:text-lg">{ele.product.title.split(" ").splice(0,5).join(" ")}</h3>

        {/* Price */}
        <p className="text-green-600 font-semibold">Price: {ele.price} EGP</p>

        {/* Quantity Buttons */}
        <div className="flex items-center gap-3">
          <button disabled={ele.count == 1} onClick={()=>updateProduct(ele.product.id,ele.count - 1)} className="h-7 w-7 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition">
            -
          </button>

          <span className="font-semibold">{ele.count}</span>

          <button onClick={()=>updateProduct(ele.product.id,ele.count + 1)} className="h-7 w-7 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition">
            +
          </button>
        </div>

      </div>

      {/* Remove Button */}
      <button
        onClick={() => {
          const card = document.getElementById(ele._id);
          if (card) {
            card.classList.add("opacity-0", "scale-75");
            setTimeout(() => removeItem(ele.product.id), 300);
          } else {
            removeItem(ele.product.id);
          }
        }}
        className="bg-red-500 hover:bg-red-600 transition text-white text-xs md:text-sm px-3 py-2 rounded"
      >
        <i className="fa-solid fa-trash mr-1"></i> Remove
      </button>

    </div>
  ))}

    
    <button onClick={goToCheckOut} className='bg-main text-white p-2 rounded me-auto'>CheckOut <i class="fa-solid fa-money-check-dollar"></i></button>

</div>
      
      </>
    }




</div> } 
 






      
      
      
      
      
      
      </>

  )
}
