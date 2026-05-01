import axios from 'axios'
import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function Categories() {

  let [categories,setCategories] = useState([])
  let [isLoading,setIsLoading] = useState(true)

  useEffect( () => {
    getAllCategories()
  },[] )


    function getAllCategories() {
      axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then( ({data}) => {
        setCategories(data.data)
        setIsLoading(false)
        console.log(data.data);
        
      })
      .catch( (err) => console.log(err))
    }
    


  return (
    <>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
            </Helmet>
    
    {isLoading ? <Loader/> : <>
    
      <div className="container mx-auto my-10 px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

    {categories.map((category) => (
 <Link to={`/categoryDetails/${category._id}`}>
      <div key={category._id}
        className="group relative bg-white rounded-2xl overflow-hidden
                   border border-gray-200 shadow-sm
                   hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover
                       group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t
                       from-black/70 via-black/30 to-transparent
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            {category.name}
          </h2>

   
        </div>
      </div>
 </Link>
    ))}

  </div>
</div>
    </>}




 
    </>
  )
}
