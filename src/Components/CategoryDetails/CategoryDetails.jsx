import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { data, useParams } from 'react-router-dom'
import styles from './CategoryDetails.module.css'
import Loader from '../Loader/Loader';

export default function CategoryDetails() {
        let [productDetails,setProductDetails] = useState(0)
        let [isLoading,setIsLoading] = useState(true)
    let {id} = useParams()
        console.log(id);
        
    useEffect( ()=> {
        getCategoryDetails()
    },[] )
    function getCategoryDetails() {
            axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .then( ({data})=> {
                setProductDetails(data.data)
                setIsLoading(false)
                // console.log("haaaaaaaaaaa",data.data)
            })
            .catch(  ({err})=> console.log(err))
                
                
        
    }

  return (
        <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Category Details</title>
</Helmet>


{isLoading ? <Loader /> : <>
    <div className="my-10 container mx-auto px-4">
  <div className={`max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-lg ${styles.handala}`}>
    {/* Image */}
    <div className="w-full lg:w-1/2 flex justify-center">
      <img src={productDetails.image} alt={productDetails.name}
      className="w-full max-w-sm object-contain rounded-xl"/>
    </div>

    {/* Content */}
    <div className="w-full lg:w-1/2 text-center lg:text-left">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold font-mono">
        {productDetails.name}
      </h1>
    </div>
  </div>
</div>

</> }


        </>

  )
}
