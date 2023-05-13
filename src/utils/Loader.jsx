import { Backdrop } from '@mui/material';
import React from 'react'
import './Loader.css'
const Loader = () => {
  return (
    <>
        <div className='loader2'>
            <Backdrop sx={{color:'#fff',zIndex:(theme)=>theme.zIndex.drawer+1  }} open={true}>
        <div className='lds-spinner2'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
            </Backdrop>
        </div>
    </>
  )
}

export default Loader;