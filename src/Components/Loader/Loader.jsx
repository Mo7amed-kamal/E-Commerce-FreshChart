import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
  return (
    <>
    <div className="parent bg-white w-full top-0 left-0 bottom-0 right-0  absolute">
    <div className='flex justify-center align-middle items-center absolute top-2/4 left-1/2'>

        <span className={`${styles.loader} bg-slate-700 `}></span>
    </div>
 
    </div>
    
    </>
  )
}
