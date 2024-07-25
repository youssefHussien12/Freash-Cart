import React, { useEffect, useState } from 'react';
import styles from './CategorieDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function CategorieDetails() {
 
 
 
  let [Loading, setLoading] = useState(true);
  let [details, setDetails] = useState([]);

 let {id} = useParams()

async function getCategoresDetails(id){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  setDetails(data.data)
  setLoading(false)
 }

 useEffect(()=>{
getCategoresDetails(id)
},[])
 
 return <>
      {Loading? <div className="loading">
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
       :<>
       <Helmet>
         <meta charSet="utf-8" />
         <title>{details.name}</title>
       </Helmet>
       <div className="row justify-content-center m-5 py-4">
          <div className="col-md-4">
            <div className="product overflow-hidden text-center">
              <img src={details.image} className='w-100 rounded' alt={details.name} />
              <h3 className="h6 mt-2 text-main fw-bold">{details.name}</h3>
            </div>
          </div>
        </div>
       </>
       }

  </>
}
