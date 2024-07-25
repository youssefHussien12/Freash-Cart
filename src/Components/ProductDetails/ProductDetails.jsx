import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  var settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let {addToWish} = useContext(WishContext)

  let { addToCart } = useContext(CartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
  }
  async function postToWish(id){
    let {data} = await addToWish(id)
    console.log(data);
  if (data.status == 'success') {
  toast.success(data.message , {
    duration:3000,
  })
  }
  }

  let [Loding, setLoding] = useState(true);
  let [details, setDetails] = useState([]);

  let { id } = useParams();

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    setLoding(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <>
      {Loding ? (
        <div className="d-flex justify-content-center mt-5">
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
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{details.title}</title>
          </Helmet>
          <div className="row align-items-center mt-5 py-5">
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((image) => (
                  <img key={details.id} src={image} alt={details.title} />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <div className="details">
                <h3 className="h5">{details.title}</h3>
                <p className="py-3 text-muted">{details.description}</p>
                <span className=" text-main font-sm fw-bolder">
                  {details.category.name}
                </span>
                  <span  className='heart float-end pe-2 cursor-pointer '><i  onClick={()=> postToWish(details.id)} className="fa-solid fa-heart fa-xl text-main"></i></span>
                <div className="d-flex justify-content-between py-2">
                  <span className="font-sm">{details.price} EGP</span>
                  <span className="font-sm">
                    <i className="fas fa-star rating-color me-1"></i>
                    {details.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={() => postToCart(details.id)}
                  className="btn bg-main text-main-light w-100 "
                >
                  +Add To Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
