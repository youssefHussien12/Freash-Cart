import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { WishContext } from '../../Context/WishContext';
import { BallTriangle } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function WishList() {
 
 
 
  let {addToCart} = useContext(CartContext);
  let {GetWishItems , deleteWishItem} = useContext(WishContext);
  const [Wish , setWish] = useState(null)
  const [Loading , setLoading] = useState(true);


  async function postToCart(id){
    let {data} = await addToCart(id)
  if (data.status == 'success') {
  toast.success(data.message , {
    duration:3000,
  })
  }
  }


async function getItems(){
  let {data} = await GetWishItems()
  setWish(data?.data)
  setLoading(false)
}


async function deleteItem(id){
  setLoading(true)
  let {data} = await deleteWishItem(id)
  if (data.status == 'success') {
    toast.error('Product deleted successfully', {
      duration:2000,
      className:'bg-danger text-light',
      position:'top-right'
    })
    }


     async function getItems(){
      let {data} = await GetWishItems()
      setWish(data?.data)
      setLoading(false)
    }
    getItems()
    setLoading(false)
}

useEffect(()=>{getItems()},[])
 
 
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
            <title>Wish List</title>
          </Helmet>
          <h1 className='text-center text-main pt-5 mt-5'>My Wish List</h1>
    <div className="row py-5 gy-4">
    {Wish.map((Product , index) => 
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
       <span  className='heart'><i  onClick={()=> deleteItem(Product.id)} className="fa-solid fa-heart-broken   fa-xl text-main"></i></span>
          <button onClick={()=> postToCart(Product.id)} className='btn bg-main text-main-light w-100 '>Add To Cart</button>
        </div>
      </div>
    )}
    </div>
    </>
    }
  </>
}
