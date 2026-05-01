import axios from 'axios';
import { Alert } from 'flowbite-react';
import { useFormik } from 'formik'
import React, {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userTokenContext } from '../Context/UserTokenContext';
import { Helmet } from 'react-helmet'

export default function Login() {
  const [apiError , setApiError] = useState(null)
  const [isLoading , setIsLoading] = useState(false)
  let navigate = useNavigate()

     let tokenContext =  useContext( userTokenContext ) 
      
      
  function login(formValue) {
    setIsLoading(true)
    setApiError(null)

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValue)
    .then( (res) => {
      let {data} = res
      if(data.message == "success") {
        localStorage.setItem( "token", data.token )
        tokenContext.setToken(data.token) // send the Token To Context

        navigate('/home')
      }
    })
    .catch( (err) => {
      setIsLoading(false)
      setApiError(err.response.data.message)
      console.log(err);
    })
  }

  // Validation
  function validationSchema() {
    return Yup.object({
      email: Yup.string().email('Invalid Email').required('required'),
      password: Yup.string().matches( /^[A-Z][a-z0-9]{6,15}/,'password is must start capital letter and min length 6' ).required('required')
    })
  }


  let myForm = useFormik({
    initialValues: {
      email: "",
    password: ""
    },

    validationSchema,
    onSubmit: login
  })

  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>

  


 

          <section className='my-8 py-9  container handala mx-auto '>
          <form className="max-w-lg mx-auto" onSubmit={myForm.handleSubmit}>
        <h1 className=' text-xl lg:text-3xl mb-4 font-bold '>Login Now:</h1>

     {/* show error account f el form */}
     {apiError &&  <Alert className='bg-red-500 my-6 p-3 text-white max-w-lg mx-auto'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {apiError}
    </Alert> }


<div className="mb-5">
    <label htmlFor="email" className="block  text-lg font-medium text-gray-900">Email:</label>
    <input type="email" id="email"  name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email}  className=" border bg-red-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."  />
    {myForm.errors.email && myForm.touched.email ?   <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.email}
    </Alert> : null}
  </div>

<div className="mb-5">
    <label htmlFor="password" className="block  text-lg font-medium text-gray-900">password:</label>
    <input type="password" id="password"  name='password' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.password}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password..."  />
    {myForm.errors.password && myForm.touched.password ?   <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.password}
    </Alert> : null}
  </div>

  <button type="submit" disabled={isLoading} className='p-3 px-6 block ms-auto rounded bg-main text-slate-200'>
     {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Login' } 
      </button>


    </form>
          </section>
    
    </>
  )
}
