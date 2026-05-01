import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import styles from "./ProductDetails.module.css"
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify'
import {Helmet} from "react-helmet";

export default function ProductDetails() {
    let [productDetails, setProductDetails] = useState()

    let {id} = useParams()
    
    let {addProductToCart,setCartItemNo} = useContext(CartContext)
        
      async function addToCartItem(id) {
           let data = await addProductToCart(id)
            console.log(data);
            
            if(data?.data?.status == "success"){
                    setCartItemNo( prev => prev + 1 )
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

        function getApi() {
            return  axios.get( `https://ecommerce.routemisr.com/api/v1/products/${id}` )
        }

        let {data,isLoading} = useQuery({
            queryKey: ['Details',id],
            queryFn: getApi,
            select: (data)=> data.data.data
           })
           
           useEffect( ()=> {
            setProductDetails(data)
           },[data] )

           if(isLoading){
            <Loader/>
           }


        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed: 1400,
            
          };


  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
            </Helmet>


    {isLoading ?  <Loader/> : <>
        

<div className="my-10 container mx-auto px-4">
  <div
    className={`flex flex-col lg:flex-row w-full lg:w-10/12 mx-auto gap-6 p-6 rounded-lg ${styles.handala}`}
  >
    {/* Slider Section */}
    <div className="w-full lg:w-1/2">
      <Slider {...settings}>
        {productDetails?.images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="w-full rounded-lg object-contain"
            alt=""
          />
        ))}
      </Slider>
    </div>

    {/* Content Section */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <h1 className="text-xl lg:text-3xl font-bold">
        {productDetails?.title}
      </h1>

      <p className="mt-2 text-gray-600">
        {productDetails?.description}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        {productDetails?.category.name}
      </p>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-semibold">
          {productDetails?.price} EGP
        </span>
        <span>
          {productDetails?.ratingsAverage}
          <i className="fa fa-star rating-color ml-1"></i>
          <i className="fa fa-star rating-color ml-1"></i>
          <i className="fa fa-star ml-1"></i>
        </span>
      </div>

      <button onClick={() => addToCartItem(productDetails.id)}
        className="w-full mt-5 text-white bg-main rounded p-2 hover:opacity-90 transition">Add to Cart</button>
    </div>

    
  </div>
</div>


        </> }


   

        </>
  )
}
