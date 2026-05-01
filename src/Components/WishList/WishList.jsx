import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../Context/WishListContext'
import { Helmet } from 'react-helmet'
import ProductItem from '../ProductItem/ProductItem'
import { toast } from 'react-toastify'
import { CartContext } from '../Context/CartContext'
import Loader from '../Loader/Loader'

export default function WishList() {

    let [products,setProducts] = useState([])
    let {addProductToCart,setCartItemNo} = useContext(CartContext)
    let {getWishlist,removeWishlist,setCountProduct} = useContext( WishListContext )
    let [isLoading, setisLoading] = useState(true)

    useEffect( ()=> {
      if( localStorage.getItem("token") ){
        displayWishList()
      }else {
        setisLoading(false);
      }
    },[] )

    async function displayWishList() {
      if (!localStorage.getItem("token")) return;
    
      try {
        let response = await getWishlist();
        setCountProduct(response.data.count);
        setProducts(response.data.data);
      } catch (error) {
        console.log("Wishlist error:", error);
      } finally {
        setisLoading(false);
      }
    }
    

async function removeProduct(prodId){
    try {
      await removeWishlist(prodId);
  
      // Optimistic Update
      setProducts(prev =>
        prev.filter(product => product._id !== prodId)
      );
        setCountProduct((prev) => prev - 1)
      toast.success("Removed from wishlist ❤️", {
        position: "top-right",
        theme: "dark",
      });
  
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product", {
        position: "top-right",
        theme: "dark",
      });
    }
  }
  
  async function addCartItem(id) {
    if (!localStorage.getItem("token")) {
      toast.error("Please login first", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
  
    let data = await addProductToCart(id);
  
    if (data?.data?.status === "success") {
      setCartItemNo(prev => prev + 1);
      toast.success(data.data.message, {
        position: "top-right",
        theme: "dark",
      });
    } else {
      toast.error(
        data?.response?.data?.message || "Something went wrong",
        {
          position: "top-right",
          theme: "dark",
        }
      );
    }
  }
  

  return (
    <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>WishList</title>
            </Helmet>
    
            {isLoading ? (
  <Loader />
) : (
  <div className="container mx-auto py-4">

    <h1 className='text-2xl my-5 text-main font-bold'>
      Your Wish List <i className="fa-solid fa-heart text-red-600"></i>
    </h1>

    {products.length === 0 ? (
      <div className="text-center py-20">
        <i className="fa-regular fa-heart text-6xl text-gray-400 mb-4"></i>
        <p className="text-xl text-gray-600">
          Your wishlist is empty
        </p>
        <p className="text-gray-500 mt-2">
          Add products you love ❤️
        </p>
      </div>
    ) : (
      <div className="row">
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            addCart={addCartItem}
            removeItem={removeProduct}
          />
        ))}
      </div>
    )}

  </div>
)}

        
    </>
  )
}
