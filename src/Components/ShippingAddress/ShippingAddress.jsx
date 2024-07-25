import React, { useContext } from 'react';
import styles from './ShippingAddress.module.css';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function ShippingAddress() {
  
  let {cartId} = useParams();
 let {checkOutSession} = useContext(CartContext)



 async function checkOut(values){
  let {data} = await checkOutSession(cartId , values)
  if (data.status == 'success') {
    window.location.href = data.session.url
    
  }
}


  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },onSubmit:checkOut
  })
  
  return <>
<div className="w-75 mx-auto py-5 mt-5">
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor="details">Details</label>
    <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3 ' />
    
    <label htmlFor="phone">Phone</label>
    <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3 ' />
    
    <label htmlFor="city">city</label>
    <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3 ' />
  <button type='submit' className='btn bg-main w-100  text-light'>Check Out</button>
  </form>
</div>

  </>
}
