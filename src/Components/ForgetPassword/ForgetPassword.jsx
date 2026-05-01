import axios from 'axios'
import { Alert } from 'flowbite-react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const [isLoading , setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [msgResetCode,setMsgResetCode]= useState("")
  const [msgResetPassword,setMsgResetPassword]= useState("")
  const [step, setStep] = useState("forget")
  let navigate = useNavigate()

    function sendForgetPassword(formValue){
      setIsLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,formValue)
        .then((res) => {
          let {data} = res 
           if(data.statusMsg == "success"){
            // Navigate l content reset Code
            setStep("reset")
            setMsgResetCode(data.message)
          }
          console.log(res);
          
        })
        .catch((err) => {
          console.log(err)
          setApiError(err.response.data.message)
        })
        .finally( ()=> {
          setIsLoading(false)
        } )
    }

    // Validation 
    function validationSchema() {
        return Yup.object({
          email: Yup.string().email("Invalid Email..").required("Required")
        })
    }
    let myForm = useFormik({
      initialValues: {
          email: ""
      },
      validationSchemaa : validationSchema,
      onSubmit : sendForgetPassword
    })

    //  Reset Code
    function sendResetCode(formValue) {
      setIsLoading(true)
      axios.post( `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,formValue )
      .then( (res)=> {
        let {data} = res
        if(data.status == "Success"){
          setStep("resetPassword")
          setMsgResetPassword(data.status)
          console.log(data.status);
          
        }

      } )
      .catch( (err) => {
        setApiError(err.response.data.message)
        console.log(err)
      } )
      .finally( ()=> {
        setIsLoading(false)
      } )
    }
      // Reset Code ==> Virefay
      let myFromReset = useFormik({
        initialValues: {
          resetCode: ""
        },
        onSubmit: sendResetCode
      })

        // New Password
      function sendResetPassword(formValue){
        setIsLoading(true)
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,formValue )
        .then( (res) => {
          let data = res
          if(data.status == 200){
            // navigate l Home
            navigate('/home')
          }
          console.log(data)
          
        } )
        .catch( (err) => {
          setApiError(err.response.data.message)
          console.log(err)
        } )
        .finally( ()=> {
          setIsLoading(false)
        } )
      }
      let myFormResetPass = useFormik({
        initialValues: {
          email: "",
          newPassword: ""
        },
        onSubmit: sendResetPassword
      }) 

  return (
    <>
    
 
    {/* Section ForgetPassword */}
    {step === "forget" &&  (
    <section className='my-10 p-9 container handala mx-auto '>

    {apiError && <Alert className='bg-red-500 my-6 p-3 text-white max-w-lg mx-auto'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {apiError}
    </Alert> }

    <form className="max-w-lg mx-auto py-10" onSubmit={myForm.handleSubmit} >
    <h1 className=' text-xl lg:text-3xl mb-4 font-bold '>Forget Password:</h1>

    <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Your Email:</label>
    <input type="email" id="email"  name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email}  className=" border bg-red-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."  />
    {myForm.errors.email && myForm.touched.email ?   <Alert className='bg-red-500 mt-1 p-3 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myForm.errors.email}
    </Alert> : null}
  </div>

  <button type="submit" disabled={isLoading} className='w-full p-2 px-6 block ms-auto rounded bg-main text-slate-200'>
     {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Forget Password' } 
      </button>


    </form>


    </section>
    )  }

    {/* Section Reset Code And send code at email */}
    {step === "reset" && (
  <section className='my-10 p-9 container handala mx-auto w-3/4 '>

  {apiError && <Alert className='bg-red-500 my-6 p-3 text-white max-w-lg mx-auto'>
    <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {apiError}
  </Alert> }
  
  <form className="max-w-lg mx-auto py-10" onSubmit={myFromReset.handleSubmit} >
  <h1 className=' text-xl lg:text-3xl mb-4 font-bold '>Reset Code:</h1>
  
  <div className="mb-2">
  <input type="text" id="restCode"  name='resetCode' onBlur={myFromReset.handleBlur} onChange={myFromReset.handleChange} value={myFromReset.values.resetCode}  className=" border bg-red-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Verify Code..."  />
  {myFromReset.errors.resetCode && myFromReset.touched.resetCode ?   <Alert className='bg-red-500 mt-1 p-3 text-white'>
    <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myFromReset.errors.resetCode}
  </Alert> : null}
  </div>
  {msgResetCode &&  <Alert className='bg-red-400 my-2 p-3 text-white max-w-lg mx-auto'>
    <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {msgResetCode}
  </Alert>}

  <button type="submit" disabled={isLoading} className='w-full p-2 px-4 block ms-auto rounded bg-main text-slate-200'>
  {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Reset Code' } 
    </button>
  
    
    
  </form>
  
  
  </section>
    ) }

    {/* Section Reset Password */}
    {step === "resetPassword" &&  (
    <section className='my-10 p-9 container handala mx-auto '>

    {apiError && <Alert className='bg-red-500 my-6 p-3 text-white max-w-lg mx-auto'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {apiError}
    </Alert> }

    <form className="max-w-lg mx-auto py-10" onSubmit={myFormResetPass.handleSubmit} >
    <h1 className=' text-xl lg:text-3xl mb-4 font-bold '>Reset Your Password:</h1>

    <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Email:</label>
    <input type="email" id="email"  name='email' onBlur={myFormResetPass.handleBlur} onChange={myFormResetPass.handleChange} value={myFormResetPass.values.email}  className=" border bg-red-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."  />
    {myFormResetPass.errors.email && myFormResetPass.touched.email ?   <Alert className='bg-red-500 mt-1 p-3 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myFormResetPass.errors.email}
    </Alert> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900">Reset Password:</label>
    <input type="password" id="password"  name='newPassword' onChange={myFormResetPass.handleChange} value={myFormResetPass.values.newPassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password..."  />

    {myFormResetPass.errors.newPassword && myFormResetPass.touched.newPassword  ?  <Alert className='bg-red-500 mt-1 p-3 text-white'>
      <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {myFormResetPass.errors.newPassword}
    </Alert> : null} 
  </div>

  {msgResetPassword &&  <Alert className='bg-red-400 my-2 p-3 text-white max-w-lg mx-auto'>
    <span className="font-medium"><i className="fa-solid fa-alarm-clock"> </i></span> {msgResetPassword}
  </Alert>}

  <button type="submit" className='w-full p-2 px-6 block ms-auto rounded bg-main text-slate-200'>
  {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Reset Password' } 
      </button>


    </form>


    </section>
    )  }

  

    </>
  )
}
