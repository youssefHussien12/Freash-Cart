import React from "react";
// import styles from './Register.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";


export default function Register() {
  let [loading, setLoding] = useState(false);
  let [apiError, setApiError] = useState("");
  let navigate = useNavigate();

  async function registersubmuit(values) {
    setLoding(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoding(false);
      });
    if (data.message === "success") {
     loading(false)
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Min lenght is 3")
      .max(10, "Max lenght is 10"),
    email: Yup.string().required("Email is required").email("invalied email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "password invalied ex(Ahmed@123)"),
    rePassword: Yup.string()
      .required("password is required")
      .oneOf([Yup.ref("password")], "password and rePassword not matche"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyption phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registersubmuit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5 mt-5">
        <h2>Register Now</h2>

        <form onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="alert alert-danger py-2">{apiError}</div>
          ) : (
            ""
          )}

          <label htmlFor="name">Name : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : null}

          <label htmlFor="rePassword">rePassword : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <label htmlFor="phone">Phone : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
          ) : null}

          {loading ? (
            <button type="button" className="btn bg-main text-light">
              <BallTriangle
                height={25}
                width={25}
                radius={5}
                color="#fff"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              Register
            </button>
          )}
          <Link className="ps-2" to={'/login'}>Login Now</Link>
        </form>
      </div>
    </>
  );
}
