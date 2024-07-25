import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import UserContextProvider from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import CartContextProvider from './Context/CartContext';
import WishContextProvider from './Context/WishContext';

let queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContextProvider>
    <WishContextProvider>
    <UserContextProvider>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools position='bottom-right'/>
        </QueryClientProvider>
    </UserContextProvider>
    </WishContextProvider>
  </CartContextProvider>
   
);
