import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authcontext'
import style from '../styles/Layout.module.css'
import { AutoAuthProgressImg, NotLoginImg } from '../utils/constanse'
import { Button } from './stateless/stateless'
import GoogleLogin from 'react-google-login';

export default function Profile() {

    const ref = useRef(null)
    const googleSigninButtonRef = useRef(null)
    const [authInProgress, setAuthInProgress] = useState(true)

    const handleOpen = (e) => {
        //to open the main menu body
        if (ref.current.style.display === 'none') {
            //open
            ref.current.style.display = 'block'

        } else {
            ref.current.style.display = 'none'
        }

    }
    useEffect(() => {
        //for enter press search
        const fn = (e) => {
            if (e.target.id !== 'myDropdown' && !e.target.classList.contains('dd-item')) {
                // alert("i")
                console.log(e.target)
                ref.current.style.display = 'none'
            }
        }
        window.addEventListener("mousedown", fn)
        return () => {
            window.removeEventListener("mousedown", fn)
        }
    }, [])

    const authContext = useContext(AuthContext)

    useEffect(() => {
        (
            async () => {
                const { success } = await authContext.AutoAuthFromTokenAsync()
                setAuthInProgress(false)
            }
        )()

    }, [])

    const handleSignin = () => {
        googleSigninButtonRef.current.click()
    }

    const responseSuccessGoogle = (response) => {

    }
    const responseErrorGoogle = (response) => {

    }


    return (
        <div className="dropdown" >
            {
                authContext.isLogin ? (
                    <img className={style.profile} src={authContext.AuthRespObj.profile_pic} onClick={handleOpen} />
                ) : (
                        <>
                            { !authInProgress && <Button onclickCallBack={handleOpen} text="Signin" buttonStyle={{ backgroundColor: 'transparent', color: "green", fontWeight: 'bolder' }} />}
                            {authInProgress && <img className={style.profile} src={AutoAuthProgressImg} style={{ border: '1px solid grey' }} />}
                        </>
                    )
            }
            <div className="dropdown-content" style={{ right: 0 }} ref={ref} id="myDropdown">
                {
                    authContext.isLogin ? (
                        <div className="dd-item" id="myDropdown">
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span>Logout</span>
                        </div>
                    ) : (
                            <div id="myDropdown">
                                <GoogleLogin
                                    clientId="432827620544-30kf3nvnnqtadjuqd9as4l92j0qam71f.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseErrorGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    redirectUri="https://...../"
                                    // redirectUri="http://localhost:3000/"

                                    render={renderProps => (
                                        <div onClick={renderProps.onClick} ref={googleSigninButtonRef} className="dd-item" >Google</div>
                                    )}
                                />
                            </div>
                        )
                }
            </div>

        </div>
    )
}