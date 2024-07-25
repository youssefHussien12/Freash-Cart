import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import CategorieDetails from "./Components/CategorieDetails/CategorieDetails";
import WishList from "./Components/WishList/WishList";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import AllOrders from "./Components/AllOrders/AllOrders";

export default function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "Products", element: <ProtectedRoute><Products /></ProtectedRoute>},
        { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
        { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
        { path: "Categories", element: <ProtectedRoute><Categories/></ProtectedRoute> },
        { path: "categoriedetails/:id", element: <ProtectedRoute><CategorieDetails/></ProtectedRoute> },
        { path: "Brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "brandsdetails/:id", element: <ProtectedRoute><BrandsDetails/></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><WishList/></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
        { path: "shippingaddress/:cartId", element: <ProtectedRoute><ShippingAddress/></ProtectedRoute> },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "*", element: < NotFound/> },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
        <RouterProvider router={routes}></RouterProvider>
      <Toaster/>

    </>
  );
}
