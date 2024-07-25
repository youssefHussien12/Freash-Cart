import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { WishContext } from '../../Context/WishContext';
// import styles from './Products.module.css';

export default function Products() {
  let {addToWish} = useContext(WishContext)
  
  let {addToCart} = useContext(CartContext);


  async function postToCart(id){
    let {data} = await addToCart(id)
  if (data.status == 'success') {
  toast.success(data.message , {
    duration:3000,
  })
  
  }
  };
  async function postToWish(id){
    let {data} = await addToWish(id)
    console.log(data);
  if (data.status == 'success') {
  toast.success(data.message , {
    duration:3000,
  })
  }
  };
  

  function getProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
};

let {data , isLoading } = useQuery('featuerdProducts' , getProducts);

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
  </div>:
  <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
 </Helmet>
 <div className="row py-4 mt-5 gy-4">
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
    <span className='heart'><i  onClick={()=> postToWish(Product.id)} className="fa-solid fa-heart fa-xl text-main"></i></span>
        <button onClick={()=> postToCart(Product.id)} className='btn bg-main text-main-light w-100 '>Add To Cart</button>
      </div>
    </div>
  )}
  </div>
  </>
  }
   
</>
}
