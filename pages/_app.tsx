import '../styles/globals.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import AuthContextProvider from '../context/authcontext'


function MyApp({ Component, pageProps }) {
  return (

    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>

  )
}

export default MyApp
