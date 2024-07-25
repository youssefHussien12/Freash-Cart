import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import styles from './Brands.module.css';

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading } = useQuery("Brands", getBrands);

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
        </div>
       : <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Brands</title>
          </Helmet>
          <h1 className="text-main py-4 mt-5  text-center">All Brands</h1>
          <div className="row mt-3 pb-4 g-3">
            {data?.data.data.map(brand =>  <div key={brand._id} className="col-md-3 p-2">
                <div className="product overflow-hidden">
                <Link to={`/brandsdetails/${brand._id}`}>
                  <img src={brand.image} className="w-100" alt={brand.name} />
                  <h3 className="h6 px-4">{brand.name}</h3>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      }
    </>
}
