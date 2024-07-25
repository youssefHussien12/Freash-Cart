import React, { useEffect, useState } from 'react';
import styles from './BrandsDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function BrandsDetails() {
 
 
  let [Loading, setLoading] = useState(true);
  let [details, setDetails] = useState([]);

 let {id} = useParams()

async function getBarndsDetails(id){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  setDetails(data.data)
  setLoading(false)
 }

 useEffect(()=>{
 getBarndsDetails(id)
},[])

 
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
            <title>{details.name}</title>
          </Helmet> 
          <div className="row m-5 d-flex justify-content-center">
          <div className="col-md-4 mt-5">
            <div className="product overflow-hidden text-center">
              <img src={details.image} alt={details.name} />
              <h3 className="h6 text-main fw-bold">{details.name}</h3>
            </div>
          </div>
        </div>
        </>
        }
    
  </>
}
