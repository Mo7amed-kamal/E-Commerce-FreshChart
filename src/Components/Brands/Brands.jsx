import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Loader from '../Loader/Loader'

export default function Brands() {
  let [theBrands,setTheBrands] = useState([])


    function getBrands() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
     }

   let {isLoading,data} = useQuery({
    queryKey: ['brandsData'],
    queryFn: getBrands,
    refetchInterval:4000,
    retry:5,
    retryDelay:4000,
    select: (data)=> data.data.data
   })

    useEffect( ()=> {
      setTheBrands(data)
    },[data] )

    if(isLoading){
      <Loader/>
    }

  return (
    <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
    
    {isLoading ? <Loader/> : <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {theBrands?.map( (brand,i) =>  <>
          
          <div key={i} className="group relative bg-white rounded-2xl overflow-hidden
                   border border-gray-200 shadow-sm
                   hover:shadow-xl transition-all duration-300 cursor-pointer">

          <div className="relative h-60 overflow-hidden">
          <img src={brand.image} alt={brand.name} className="w-full h-full object-cover
          group-hover:scale-110 transition-transform duration-500"/>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t
                     from-black/70 via-black/30 to-transparent
                     opacity-0 group-hover:opacity-100
                       transition-opacity duration-300"/>
        </div>

        <div className="p-5 text-center">
          <h2 className="text-lg font-extrabold text-main  mb-3">{brand.name}</h2>
        </div>
        </div>
          
          
          </> )}


        </div>
      </div>
    </>}

   





      
    </>
  )
}
