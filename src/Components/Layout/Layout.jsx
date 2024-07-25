import React from 'react';
// import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { Offline } from "react-detect-offline";
import Footer from '../Footer/Footer';
export default function Layout() {
  return <>
  <Navbar/>
<div className="container">

<Offline><div className="loading"><h2 className='fw-bold'>Only shown offline (surprise!)</h2></div></Offline>
 <Outlet></Outlet>
</div>
<Footer/>
 
  </>
}
