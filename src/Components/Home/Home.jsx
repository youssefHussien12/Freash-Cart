import React from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import MainSlider from '../MainSlider/MainSlider';
import CatgoreySlider from '../CatgoreySlider/CatgoreySlider';
// import styles from './Home.module.css';
import {Helmet} from "react-helmet";
import img from '../../Assets/images/download.png'
export default function Home() {
 return <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
 </Helmet>
 <MainSlider/>
 <CatgoreySlider/>
 <FeaturedProducts/>
  </>
}

