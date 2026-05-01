import React, { useContext, useEffect, useState } from 'react'
import { userTokenContext } from '../Context/UserTokenContext'
import { CartContext } from '../Context/CartContext'
import { Helmet } from 'react-helmet'
import Loader from '../Loader/Loader';

export default function Order() {
    let {userId} = useContext(userTokenContext)
    let {getUserOrders} = useContext(CartContext)
    let [allOrders,setAllOrders] = useState([])
    let [isLoading,setIsLoading] = useState(false)
    useEffect(()=> {  
     if(userId) userOrder() //  لو فيه قيمة في اليوزر اي دي هيتم استدعاء الفنكشن (شرط)
    },[userId]) // معناها اليوزأفيكت هيتفنذ اول مره بعد اول ريندر ,  وبعدين هيتنفذ تاني أي مره تتغير فيها قيمة اليوزر أي دي
   
    
    async function userOrder() {
      setIsLoading(true)
        let res = await getUserOrders(userId)
        setAllOrders(res.data)
        setIsLoading(false)
        // console.log(res.data);
        
        // console.log("res.data:", res.data)
        // console.log("typeof res.data:", typeof res.data)
        // console.log("keys:", Object.keys(res.data))
      }
        console.log(allOrders);
        
  return (
    <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>All Order</title>
            </Helmet>
{isLoading ? <Loader/> : <>
<section className='my-10 p-9 container handala mx-auto'>
  
<div className="flex flex-col gap-4">
  {allOrders.map((order, index) =>

    order.cartItems.map((item) => (

      <div key={item._id} className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 w-3/4 mx-auto">
        <img src={item.product.imageCover} alt="" className="w-20 h-20 object-cover rounded-lg"/>

        <div className="flex flex-col items-center justify-center w-full lg:flex-row lg:justify-between lg:items-start">
      <div className='text-center lg:text-left'>
    <h3 className="font-bold">{item.product.title.split(" ").splice(0,5).join(" ")}</h3>
    <p className="text-green-600">{item.price} EGP</p>
  </div>

    <div className='text-center lg:text-left'>
    <h4 className='text-emerald-500 font-bold'>Payment Type : {order.paymentMethodType}</h4>
    <p>Total Order Price : {order.totalOrderPrice}</p>
  </div>
  </div>



      </div>
    ))
  )}
</div>

</section>
</> }



      
      </>
  )
}
