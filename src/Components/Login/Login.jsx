import React, { useContext } from "react";
// import styles from './Login.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let [loding, setLoding] = useState(false);
  let [apiError, setApiError] = useState("");
  let navigate = useNavigate();
  let { setUserToken, setUserData } = useContext(UserContext);
  async function loginsubmuit(values) {
    setLoding(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoding(false);
      });
    if (data.message === "success") {
      setLoding(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }
  

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalied email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "password invalied ex(Ahmed@123)"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginsubmuit
  });

  return (
    <>
      <div className="w-75 mx-auto py-5 mt-5">
        <h2>Login Now</h2>

        <form onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="alert alert-danger py-2">{apiError}</div>
          ) : (
            ""
          )}

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

          {loding ? (
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
              Login
            </button>
          )}
          <Link className="ps-2" to={"/register"}>
            Register Now
          </Link>
        </form>
      </div>
    </>
  );
}
