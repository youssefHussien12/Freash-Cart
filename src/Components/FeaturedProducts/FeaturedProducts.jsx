import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';



export default function FeaturedProducts() {
 let {addToWish} = useContext(WishContext)
let {addToCart} = useContext(CartContext);


async function postToCart(id){
  let {data} = await addToCart(id)
if (data.status == 'success') {
toast.success('Product added successfully', {
  duration:2000,
  className:'bg-main text-light',
  position:'top-right'
})
}
}
async function postToWish(id){
  let {data} = await addToWish(id)
  if (data.status == 'success') {
    toast.success('Product added successfully', {
      duration:2000,
      className:'bg-main text-light',
      position:'top-right'
    })
    }
}





  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let {data , isLoading } = useQuery('featuerdProducts' , getProducts)
  
  return <>
     {isLoading?<div className="loading">
    <BallTriangle
                height={120}
                width={120}
                radius={5}
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass="text-main"
                visible={true}
              />
    </div>:<div className="row py-4 gy-4">
    {data?.data.data.map((Product , index) => 
    <div key={index} className="col-lg-2">
      <div className="product position-relative p-2">
      <Link to={`/productdetails/${Product.id}`}>
          <img src={Product.imageCover} className='w-100' alt={Product.title} />
          <span className=' text-main font-sm fw-bolder'>{Product.category.name}</span>
          <h3 className='h6'>{Product.title.split(' ').splice(0,2).join(' ')}</h3>
          <div className="d-flex justify-content-between py-2">
            <span className='font-sm'>{Product.price} EGP</span>
            <span className='font-sm'>
              <i className='fas fa-star rating-color me-1'></i>
              {Product.ratingsAverage}</span>
          </div>
      </Link>
      <span  className='heart'><i  onClick={()=> postToWish(Product.id)} className="fa-solid fa-heart fa-xl text-main"></i></span>
          <button onClick={()=> postToCart(Product.id)} className='btn bg-main text-main-light w-100 '>Add To Cart</button>
        </div>
      </div>
    )}
    </div>}
     
  </>
}
