import React, { useContext, useEffect, useState } from 'react';
import styles from './AllOrders.module.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  
  const[AllOrders , setAllOrders] = useState(null)
  let [Loading , setLoading] = useState(true);

  let token = localStorage.getItem('userToken')
    let {id} = jwtDecode(token)


    async function getUserOrdres(){
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      setAllOrders(data)
      setLoading(false)
  }
 useEffect(()=>{ getUserOrdres() }, [])

  
  return <>
   {Loading?<div className="loading">
    <BallTriangle
                height={120}
                width={120}
                radius={5}
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass="text-main"
                visible={true}
              />
    </div>:<>
    <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders</title>
 </Helmet>
 <h1 className='text-main pt-5 mt-4 text-center'>All Orders</h1>
    <table className='table pt-5 my-5 text-center'>
     <thead className='bg-main text-light'>
      <th>product img</th>
      <th>Prodcut Name</th>
      <th>Category</th>
      <th>Brand</th>
      <th>Rating</th>
      <th>Count</th>
      <th>Price</th>
       </thead>
       <tbody>
        {AllOrders[0]?.cartItems.map((order , idx) => <tr key={idx}>
          <td><img src={order.product.imageCover} width={80} height={80} alt={order.product.title} /></td>
          <td className='fw-bold'>{order.product.title} </td>
          <td className='fw-bold'>{order.product.category.name}</td>
          <td className='fw-bold'>{order.product.brand.name}</td>
          <td className='fw-bold'><i className='fas fa-star rating-color me-1'></i>{order.product.ratingsAverage}</td>
          <td className='fw-bold'>{order.count}</td>
          <td className='fw-bold'>{order.price}</td>
        </tr> )}
          
       </tbody>
    </table>
       <div className=" py-3 d-flex justify-content-between">
        <h2 className=' fw-bold text-main h5'>total Order Price :{AllOrders[0].totalOrderPrice}</h2>
        <h2 className=' fw-bold text-main h5'>payment Method Type :{AllOrders[0].paymentMethodType}</h2>
          </div>
    
    </>}
  </>
}
