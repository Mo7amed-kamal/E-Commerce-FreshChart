import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function CheckOut() {
      let [isOnlinePayment,setIsOnlinePayment] = useState(false)
      let {cartId} = useParams()
      let {cashOrder}  = useContext(CartContext)
      let navigate =  useNavigate()

   async function pay() {

      let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}` // URL Cash Delivary
      if(isOnlinePayment){ //  is Online payMent = true 
        url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
      }

        let res = await cashOrder(url,myForm.values)
        if(res.status == "success") {
          if(isOnlinePayment) { // Is Online PayMent = True
            window.location.href = res.session.url
          }else{ // Navigate to Page All Order
            navigate('/allorders')  
          }
        console.log(res);
        }
    }

    let myForm = useFormik({
        initialValues: {
            details : '',
            phone: "",
            city: ""
        },

        onSubmit: pay
    })





  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>CheckOut</title>
            </Helmet>


    <section className='my-10 p-9 container handala mx-auto'>
    <form className="max-w-lg mx-auto" onSubmit={myForm.handleSubmit}>

<div className="mb-5">
<label htmlFor="details" className="block mb-2 text-lg  font-medium text-gray-900">Your details:</label>
<input type="text" id="details"  name='details'  onChange={myForm.handleChange} value={myForm.values.details}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="details..."  />
</div>
<div className="mb-5">
<label htmlFor="phone" className="block mb-2 text-lg  font-medium text-gray-900">Your phone:</label>
<input type="text" id="phone"  name='phone'  onChange={myForm.handleChange} value={myForm.values.phone}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone..."  />
</div>
<div className="mb-5">
<label htmlFor="city" className="block mb-2 text-lg  font-medium text-gray-900">Your city:</label>
<input type="text" id="city"  name='city'  onChange={myForm.handleChange} value={myForm.values.city}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="city..."  />
</div>

{/* CheckBox */}
<div className="flex items-center mb-4">
<input id="default-checkbox" type="checkbox" onChange={()=> setIsOnlinePayment(!isOnlinePayment)} className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
<label htmlFor="default-checkbox" className="select-none ms-2 text-lg font-medium text-heading">Pay Online</label>
</div>


<button onClick={()=>pay()} className='bg-main text-white p-2 px-8 rounded me-auto'>
{isOnlinePayment ? 'Pay Online' : 'Cash'}
</button>

</form>
    </section>
    
    </>
  )
}
