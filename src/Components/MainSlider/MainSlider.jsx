import React from 'react'
import Slider from 'react-slick'
import slider1 from '../../assets/images/slider-big.jpg'
import slider2 from '../../assets/images/main-slider-2.jpeg'
import slider3 from '../../assets/images/main-slider-3.jpeg'

export default function MainSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1600,
  }

  return (
<div className="w-full overflow-hidden">
  <div className="flex flex-row">

    {/* Slider */}
    <div className="w-3/4">
      <Slider {...settings}>
        <img src={slider1} className="w-full h-[280px] sm:h-[400px] lg:h-[600px] object-cover" alt="" />
        <img src={slider2} className="w-full h-[280px] sm:h-[400px] lg:h-[600px] object-cover" alt="" />
        <img src={slider3} className="w-full h-[280px] sm:h-[400px] lg:h-[600px] object-cover" alt="" />
      </Slider>
    </div>

    {/* Side images */}
    <div className="w-1/4 flex flex-col">
      <img src={slider2} className="w-full h-[140px] sm:h-[200px] lg:h-[300px] object-cover" alt="" />
      <img src={slider3} className="w-full h-[140px] sm:h-[200px] lg:h-[300px] object-cover" alt="" />
    </div>

  </div>
</div>

  
  )
}
