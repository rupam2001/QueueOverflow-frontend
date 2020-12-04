import '../styles/globals.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import AuthContextProvider from '../context/authcontext'
// import StoreContext from 

import Router from 'next/router'
import { progressBarRef } from '../components/refs';
import { useEffect } from 'react';
import { applyCurrentTheme } from '../utils/helpers';

Router.onRouteChangeStart = () => {
  progressBarRef.current.continuousStart()
};

Router.onRouteChangeComplete = () => {
  progressBarRef.current.complete()
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    applyCurrentTheme()
  }, [])


  return (

    <AuthContextProvider>

      <Component {...pageProps} />
    </AuthContextProvider>

  )
}

export default MyApp
