import axios from "axios";
import { createContext } from "react";


export let WishContext =  createContext()

export default function WishContextProvider(props){

let headers = {
    token:localStorage.getItem('userToken')
}



function addToWish(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId
    },{
        headers
    })
    .then((response)=> response)
    .catch((err)=> err)
}
function GetWishItems(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers
    })
    .then((response)=> response)
    .catch((err)=> err)
}

function deleteWishItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers
    })
    .then((response)=> response)
    .catch((err)=> err)
}




    return <WishContext.Provider value={{ addToWish , GetWishItems ,deleteWishItem }}>
        {props.children}
    </WishContext.Provider>
}