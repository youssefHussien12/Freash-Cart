import React from 'react';
import styles from './CatgoreySlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CatgoreySlider() {
 
  var settings = {
    dots: false,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  function  getCatgorey(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let{data} = useQuery('CatgorySleder' , getCatgorey)

 return <>
  <div className="row py-2">
  <Slider {...settings}>
    {data?.data.data.map(catgory => <div key={catgory._id} className="col-md-2">
      <div className="img">
        <Link to={`/categoriedetails/${catgory._id}`}>
        <img src={catgory.image} className='w-100' height={200} alt={catgory.name} />
        <p className='text-main py-2 fw-bolder '>{catgory.name}</p>
        </Link>
      </div>
    </div> )}
  </Slider>
   
  </div>
  </>
}
