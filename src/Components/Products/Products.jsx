import axios from 'axios'
import React, { use, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ProductItem from '../ProductItem/ProductItem'
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'

export default function Products() {
  let [products,setProducts] = useState([])
  let [isloading, setIsLoading] = useState(true)

  let {addProductToCart,setCartItemNo} = useContext(CartContext)

  useEffect( ()=> {
      getAllProducts()
  },[] )

 async function getAllProducts() {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then(res => res)
    .catch( err => err )
    setProducts(data.data)
    setIsLoading(false)
    console.log(data.data);
     
  }

  async function addCartItem(id) {
    let data = await addProductToCart(id)
     //Show Toster When click button to Cart  
   if(data?.data?.status == "success"){

     setCartItemNo(prev => prev + 1);
     toast.success(data.data.message,{
       position: "top-right",
       theme: "dark",
      });
   }
   else{
     toast.error(data.response.data.message,{
       position: "top-right",
       theme: "dark",
      });
   }

  

   }


  return (
    <>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>

            
      {isloading ? <Loader/> :  <div className="container  mx-auto py-4">
        <h1 className='text-center text-3xl  my-5  font-light'>All Products</h1>
        <div className="row">
        {products.map( product => <ProductItem key={product._id}  product={product} addCart={addCartItem}  /> )}
        </div>
      </div>}
     
    
    
    
    
    </>
  )
}
