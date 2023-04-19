import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/App/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




const gooleAuthClient= process.env.REACT_APP_GOOGLE_AUTH_CLIENT ?? ''

root.render(
  <React.StrictMode>

 <GoogleOAuthProvider clientId={gooleAuthClient}>
    <Provider store={store}>
    <App />
    </Provider>
 </GoogleOAuthProvider>
  </React.StrictMode>
);
