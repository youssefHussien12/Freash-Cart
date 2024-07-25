import React, { useContext, useEffect, useState } from 'react';
// import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  
  let {UserToken , setUserToken} = useContext(UserContext)
 let navigate = useNavigate()
  function logOut(){
  localStorage.removeItem('userToken')
  setUserToken(null);
  navigate('/login')
 }

 let {getCartItems } = useContext(CartContext);

 const [cart , setCart] = useState(null)
 
 
 async function getItems(){
  let  {data} = await getCartItems()
  setCart(data)
}
useEffect(()=>{ getItems()} , [])
 
 
 
 return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {UserToken != null?<>
              <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/allorders">All Orders</NavLink>
            </li>
      

            </> :''}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 cursor-pointer fa-facebook'></i>
              <i className='fab mx-2 cursor-pointer fa-twitter'></i>
              <i className='fab mx-2 cursor-pointer fa-instagram'></i>
              <i className='fab mx-2 cursor-pointer fa-youtube'></i>
            </li>
            {UserToken!=null?<>
              <li className="nav-item">
              <Link className="nav-link" to={'/wishlist'} ><i className="fa-solid fa-heart fa-xl text-main"></i></Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link position-relative" to="cart"><i class="fa-solid fa-cart-shopping fs-3"></i><span className='bg-main top-0 end-0 position-absolute badge  text-main-light rounded-5 font-sm'>{cart?.numOfCartItems}</span></Link>
            </li>
              <li className="nav-item">
              <Link onClick={logOut} className="nav-link" >Logout</Link>
            </li>
            </>:<>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
