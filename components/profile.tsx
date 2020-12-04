import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authcontext'
import style from '../styles/Layout.module.css'
import { AutoAuthProgressImg, NotLoginImg } from '../utils/constanse'
import { Button } from './stateless/stateless'
import GoogleLogin from 'react-google-login';



export default function Profile() {
    const authContext = useContext(AuthContext)
    const ref = useRef(null)
    const googleSigninButtonRef = useRef(null)
    const [authInProgress, setAuthInProgress] = useState(true)

    const [isLogin, setIsLogin] = useState(authContext.isLogin)
    const [profile_pic, setProfile_pic] = useState('')

    useEffect(() => {
        setIsLogin(authContext.isLogin)
        setProfile_pic(authContext.AuthRespObj.profile_pic)
    }, [authContext])

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



    useEffect(() => {
        (
            async () => {
                if (!authContext.isLogin)
                    await authContext.AutoAuthFromTokenAsync()
                setAuthInProgress(false)
            }
        )()

    }, [])

    const handleSignin = () => {
        googleSigninButtonRef.current.click()
    }

    const responseSuccessGoogle = (response) => {
        authContext.AuthenticateAsync(response.tokenId)
    }
    const responseErrorGoogle = (response) => {
        // alert("Error")
    }

    const handleLogout = () => {
        setAuthInProgress(true);
        authContext.LogoutAsync()
            .then(success => {
                if (success) {
                    setAuthInProgress(false)
                } else {
                    alert("failed to logout :(")
                }
            })
    }

    return (
        <div className="dropdown" >
            {
                isLogin ? (
                    <img className={style.profile} src={profile_pic} onClick={handleOpen} />
                ) : (
                        <>
                            { !authInProgress && <Button onclickCallBack={handleOpen} text="Signin" buttonStyle={{ backgroundColor: 'transparent', color: "green", fontWeight: 'bolder' }} />}
                            {authInProgress && <img className={style.profile} src={AutoAuthProgressImg} style={{ border: '1px solid grey' }} />}
                        </>
                    )
            }
            <div className="dropdown-content" style={{ right: 0 }} ref={ref} id="myDropdown">
                {
                    isLogin ? (
                        <>
                            <div className="dd-item" id="myDropdown" onClick={handleLogout}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                <span>Logout</span>
                            </div>
                            <div className="dd-item" id="myDropdown" onClick={handleLogout}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                <span>Logout</span>
                            </div>
                        </>
                    ) : (
                            <div id="myDropdown">
                                <GoogleLogin
                                    clientId="432827620544-earre7sba34jptupkvjuinarabmts09e.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseErrorGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    redirectUri="https://localhost:3000/"
                                    // redirectUri="http://localhost:3000/"

                                    render={renderProps => (
                                        <div onClick={renderProps.onClick} ref={googleSigninButtonRef} className="dd-item" > With Google</div>
                                    )}
                                />
                            </div>
                        )
                }
            </div>

        </div>
    )
}