import '../styles/globals.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import AuthContextProvider from '../context/authcontext'
// import StoreContext from 

import Router from 'next/router'
import { progressBarRef } from '../components/refs';

Router.onRouteChangeStart = () => {
  progressBarRef.current.continuousStart()
};

Router.onRouteChangeComplete = () => {
  progressBarRef.current.complete()
};

function MyApp({ Component, pageProps }) {



  return (

    <AuthContextProvider>

      <Component {...pageProps} />
    </AuthContextProvider>

  )
}

export default MyApp
