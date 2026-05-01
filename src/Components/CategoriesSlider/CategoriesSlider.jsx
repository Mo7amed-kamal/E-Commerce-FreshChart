import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategoriesSlider() {
    let [categories,setCategories] = useState([])

  useEffect( () => {
    getAllCategories()
  },[] )


    function getAllCategories() {
      axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then( ({data}) => {
        setCategories(data.data)
      })
      .catch( (err) => console.log(err))
    }

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 1280, // laptop
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1024, // tablet
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 768, // mobile
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480, // small mobile
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    };
    
    

  return (
    <>
    
    
    <div className="my-8 w-full mx-auto px-2 overflow-x-hidden">
  <Slider {...settings}>
    {categories.map((category) => (
      <div key={category._id} className="px-2">
        <div className="text-center">
          <img
            src={category.image}
            className="w-full h-24 sm:h-32 md:h-36 object-contain mx-auto"
            alt={category.name}/>
            
          <h2 className="mt-2 text-sm sm:text-base font-semibold">
            {category.name}
          </h2>
        </div>
      </div>
    ))}
  </Slider>
</div>



    
    
    </>
  )
}
