import axios from 'axios';
import { Alert, Label } from 'flowbite-react'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet'

export default function Register() {
    const [apiError , setApiError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    let navigate = useNavigate()

    function sendData(formValue) {
      setApiError(null)
      setIsLoading(true)  // اول ما اضغط علي الزرار

      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , formValue  )
      .then( (res) => {
        let myData = res.data;
        if(myData.message == 'success'){
          // Yro7 3la Login Page
          navigate('/login')
        }
      })
      .catch( (err) => {
        setApiError(err.response.data.message)
        setIsLoading(false)
        
      })
    }


    //Validations
    function validationSchema() {
      return Yup.object( {
        name: Yup.string().min(3 , 'name min length 15 charcter').max(6 ,'name max length 6' ).required('Requierd'),
        email: Yup.string().email('Invalid Email').required('Requierd'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{6,15}/,'password is must start capital letter and min length 6').required('Required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')],'rePassword not match password').required('Required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/,'phone is must egyptian number').required('Required')
      } )
    }


    const myForm = useFormik({
      initialValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:""
      },
      validationSchema,
        onSubmit:sendData
    })

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
    

<div className='my-9 py-5 container handala mx-auto'>
  
    {/* show error account el form */}
    {apiError &&  <Alert className='bg-red-500 mt-1 p-3 text-white max-w-lg mx-auto'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {apiError}
    </Alert> }
<form className="max-w-lg mx-auto" onSubmit={myForm.handleSubmit}>

<div className="mb-5">
    <label htmlFor="name" className="block  text-lg font-medium text-gray-900">Name:</label>
    <input type="text" id="name"  name='name' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.name}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name..."  />

   {myForm.errors.name && myForm.touched.name ?  <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.name}
    </Alert> : null}
     </div>

<div className="mb-5">
    <label htmlFor="email" className="block text-lg  font-medium text-gray-900">Email:</label>
    <input type="email" id="email"  name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."  />
    {myForm.errors.email && myForm.touched.email ?   <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.email}
    </Alert> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block text-lg font-medium text-gray-900">Password:</label>
    <input type="password" id="password"  name='password' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.password}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password..."  />

    {myForm.errors.password && myForm.touched.password  ?  <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.password}
    </Alert> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="rePass" className="block text-lg font-medium text-gray-900">rePassword:</label>
    <input type="password" id="rePass"  name='rePassword' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.rePassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="rePassword..."  />

    {myForm.errors.rePassword && myForm.touched.rePassword  ?  <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.rePassword}
    </Alert> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="phone" className="block text-lg font-medium text-gray-900">Phone:</label>
    <input type="tel" id="phone"  name='phone' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.phone}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone..."  />

    {myForm.errors.phone  && myForm.touched.phone ?  <Alert className='bg-red-500 mt-1 p-2 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.phone}
    </Alert> : null}
  </div>


    <button type="submit" disabled={isLoading} className=' p-3 block ms-auto rounded bg-main text-slate-200'>
     {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Register' } 
      </button>
    
</form>

</div>
    </>
  )
}
