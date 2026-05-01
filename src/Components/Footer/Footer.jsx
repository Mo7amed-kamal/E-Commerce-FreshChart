import React from 'react'
import amazon from '../../assets/images/amazon-pay-logo-19553.svg'
import mastercard from '../../assets/images/mastercard.svg'
import paypal from '../../assets/images/paypal-blue-logo-19528.svg'
import google from '../../assets/images/google-store.svg'
import appstore from '../../assets/images/google-play-download-android-app-logo-svgrepo-com.svg'


export default function Footer() {

  return (
    <footer className='bg-[#ddd] ' >
      
      <div className="container mx-auto">
        <div className="row">
        <div className="info py-5 w-full m-5">
        <h1 className='text-lg md:text-xl font-semibold mb-1'>Get the FrechCart App</h1>
        <p className='text-sm md:text-lg font-light'>We Will send you a Link, Open it On your Phone to download the app</p>

        <div className="flex justify-between items-center mt-4 p-5 gap-4 ">
          <input type="email" name="email" placeholder='Email' className=" rounded-md block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" />
          <button className='px-4 py-2 flex-shrink-0 rounded text-white bg-main '>share app Link</button>
        </div>

        <div className="payment flex flex-col lg:flex-row justify-between items-center border-t-2 border-white border-solid border-b-2 ">
          <div className="part-right flex justify-center items-center">
          <p className='text-sm md:text-lg mr-4'>Payment Partenrs</p>
          <div className="flex items-center justify-center gap-4">
            <img src={amazon} className='w-[70px]' alt="amazon logo" />
            <img src={mastercard} className='w-[70px]' alt="mastercard logo" />
            <img src={paypal} className='w-[70px]' alt="paypal logo" />
          </div>
          </div>
          <div className="part-left  flex items-center justify-center gap-4">
            <p className='text-sm md:text-lg'>Get deliveries with FreshCart</p>
            <img src={google} className='w-[70px]' alt=" google-store logo" />
            <img src={appstore} className='w-[100px]' alt=" app-store logo" />
          </div>
        </div>

        <p className=' text-center my-7'> © 2026 <a className='font-bold text-main' href="https://www.linkedin.com/in/mohamed-kamal-frontend/" target='_blank'> Mohmed Kamal </a> All Rights Reserved <span className='text-xl'>❤️</span>
        </p>

        </div>
    
    


        </div>
      </div>



      
    </footer>
  )
}
