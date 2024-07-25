import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import styles from './Categories.module.css';

export default function Categories() {
  function getCatgoreies() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading } = useQuery("Categores", getCatgoreies);
  return  <>
      {isLoading ? <div className="loading">
          <BallTriangle
            height={120}
            width={120}
            radius={5}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="text-main"
            visible={true}
          />
        </div> : <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Categories</title>
          </Helmet>
          <div className="row mt-5 py-5 gy-3">
          {data?.data.data.map( category => <div key={category._id} className="col-md-3">
              <div className="product overflow-hidden cursor-pointer">
                <Link to={`/categoriedetails/${category._id}`}>
                <img src={category.image} height={300} className="w-100 rounded" alt={category.name} />
                </Link>
              </div>
          </div> )}        
          </div>
        </>
      }
    </>
  
}
