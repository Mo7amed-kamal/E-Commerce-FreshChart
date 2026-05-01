import axios, { AxiosHeaders } from "axios"
import { createContext, useState } from "react"

const headers = {
    token: window.localStorage.getItem("token")
}

 export let CartContext =  createContext()

   function addProductToCart(productId) {
       return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {productId},
            {
                headers
            }
        ).then( res => res )
        .catch( err => err )

    }

    function getCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {headers}
        ).then( res => res.data )
        .catch( err => err.response.data)
    }

    function removeCart(id) {
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {headers}
    )
    .then( res => res.data )
    .catch( err => err.response?.data)

    }

    function updateCartProduct(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {count},
            {headers}
        ).then( res => res.data )
        .catch( err => err.response?.data )
    }


    function cashOrder(url,shippingAddress) {
        return axios.post(url,
            {shippingAddress},
            {headers}
        ).then(res => res.data)
        .catch(err => err.response?.data)
    }

    function getUserOrders(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then(res => res)
        .catch(err => err)
   }


 export default function CartContextProvider({children}) {
        const [cartId,setCartId] = useState(null)
        const [cartItemNo,setCartItemNo] = useState(0) // state inside number only == شايله رقم بس 

        return <CartContext.Provider value={ {cartItemNo,setCartItemNo,addProductToCart,getCart,removeCart,updateCartProduct,cashOrder,cartId,setCartId,getUserOrders}  }>
            {children}
        </CartContext.Provider>
    }