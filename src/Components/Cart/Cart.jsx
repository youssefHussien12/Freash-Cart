import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import styles from './Cart.module.css';

export default function Cart() {
  let {getCartItems , deleteCartItem ,updateCartItem} = useContext(CartContext);

const [cart , setCart] = useState(null)
let [Loading , setLoading] = useState(true);

async function getItems(){
  let {data} = await getCartItems()
  setCart(data)
  setLoading(false)
}

async function deleteItem(id){
  setLoading(true)
  let {data} = await deleteCartItem(id)
  setCart(data)
  setLoading(false)
}


async function UpdateItem(id ,count){
  if (count < 1) {
    setLoading(true)
  let {data} = await deleteCartItem(id)
  setCart(data)
  setLoading(false)
  }else{
    let {data} = await updateCartItem(id , count)
    setCart(data)
    setLoading(false)
  }
}

useEffect(()=>{ getItems()},[])

 return <>
<div className="bg-main-light p-2 pt-5 mt-5 mb-5">
  <h2>Shop Cart :</h2>
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
    </div>:cart?<>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
 </Helmet>
    <div className="d-flex justify-content-between ">
    <p className='text-main fw-bold'> Total Cart Price : {cart?.data.totalCartPrice} EGP</p>
    <p className='text-main fw-bold'> Number Of Cart Items : {cart?.numOfCartItems}</p>
    </div>
    {cart.data.products.map(product => <div key={product.product.id} className="row p-2  py-3 align-items-center border-1 border-bottom mx-0">
      <div className="col-md-1">
        <div className="img">
          <img src={product.product.imageCover} className='w-100' alt={product.product.name} />
        </div>
      </div>
      <div className="col-md-10">
        <div className="content">
          <h3 className='h5'>{product.product.title.split(' ').splice(0,3).join(' ')}</h3>
          <p className='text-main fw-bold'>price : {product.price}</p>
          <button onClick={()=>deleteItem(product.product.id)} className='btn'><i className='fas fa-trash-can text-danger me-1'></i> Remove</button>
        </div>
      </div>
      <div className="col-md-1">
        <div className="count">
          <button onClick={()=>UpdateItem(product.product.id , product.count +1)} className='brdr btn p-1'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=>UpdateItem(product.product.id , product.count -1)} className='brdr btn p-1'>-</button>
        </div>
      </div>
    </div>)}
<Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-primary text-light m-4'>Online Payment</Link>
   </>: <h2> your Cart is Empty.......</h2>}
  
</div>
  </>
}
