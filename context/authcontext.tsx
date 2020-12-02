import React, { useEffect, useState } from 'react';
import { AuthRoute, AutoAuthRoute, ENDPOINT, LogoutRoute } from '../utils/constanse';
import Cookie from 'js-cookie'
interface AuthResp {
    success: boolean,
    profile_pic: string
}
interface AuthContextTypes {
    isLogin: boolean,
    AutoAuthFromTokenAsync(): Promise<AuthResp>,
    AuthenticateAsync(tokenId: string): Promise<AuthResp>,
    AuthRespObj: AuthResp,
    LogoutAsync(): Promise<boolean>
}


const AuthContext = React.createContext<AuthContextTypes>(null)

export default function AuthContextProvider(props) {

    const [isLogin, setIsLogin] = useState(false);
    const [AuthRespObj, setAuthRespObj] = useState<AuthResp>(null)

    const getCookieToken = (): string => {
        const token = Cookie.get('token')
        if (!token) return ''
        return token
    }
    const setCookieToken = (token: string, exp: Number) => {
        Cookie.set('token', token, { expires: exp })
    }
    const removeCookieToken = () => {
        Cookie.remove('token')
    }


    const AutoAuthFromTokenAsync = async (): Promise<AuthResp> => {
        try {
            const token = getCookieToken()
            if (!token) return { success: false, profile_pic: '' }
            const { success, profile_pic } = await fetch(ENDPOINT + AutoAuthRoute, { method: 'POST', body: JSON.stringify({ token }) }).then(resp => resp.json())
            setAuthRespObj({ success, profile_pic })
            setIsLogin(success)
            return { success, profile_pic }
        } catch (e) {
            setIsLogin(false)
            return { success: false, profile_pic: '' }
        }
    }

    const AuthenticateAsync = async (tokenId: string): Promise<AuthResp> => {
        try {
            const { token, success, profile_pic } = await fetch(ENDPOINT + AuthRoute, { method: 'POST', body: JSON.stringify({ tokenId }) }).then(resp => resp.json())
            setCookieToken(token, 10)
            setAuthRespObj({ success, profile_pic })
            return { success, profile_pic }
        } catch (e) {
            return { success: false, profile_pic: '' }
        }
    }
    const LogoutAsync = async (): Promise<boolean> => {
        try {
            const { success } = await fetch(ENDPOINT + LogoutRoute, { method: 'POST', body: JSON.stringify({}) }).then(resp => resp.json())
            if (success)
                removeCookieToken()
            return success
        } catch (e) {
            return false
        }
    }


    return (
        <AuthContext.Provider
            value={{
                isLogin,
                AutoAuthFromTokenAsync, AuthenticateAsync,
                AuthRespObj, LogoutAsync
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}



export { AuthContext }