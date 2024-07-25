import React from 'react';
import styles from './MainSlider.module.css';
import Slider from 'react-slick';

import slide1 from '../../Assets/images/slider-image-3.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-1.jpeg'

import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'

export default function MainSlider() {

  var settings = {
    dots: false,
    arrows:false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

return <>
  <div className="row my-3 pt-4 mt-5 gx-0">
    <div className="col-md-9">
  <Slider {...settings}>
  <img src={slide1} className='w-100' height={300} alt="imags slider" />
  <img src={slide2} className='w-100' height={300} alt="imags slider" />
  <img src={slide3} className='w-100' height={300} alt="imags slider" />
  </Slider>
    </div>
    <div className="col-md-3">
        <div className="img">
          <img src={img1} height={150} className='w-100' alt="" />
          <img src={img2} height={150} className='w-100' alt="" />
        </div>
    </div>
  </div>

  </>
}
