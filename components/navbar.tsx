import style from '../styles/Layout.module.css'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { progressBarRef } from './refs'
import Profile from './profile'
import Searchbar from './searchbar'

export default function NavBar() {

    return (
        <div className={style.navbar}>
            <LoadingBar color='#f11946' ref={progressBarRef} />
            <Link href="/">
                <span className={style.title}>Q-Overflow</span>
            </Link>
            <Searchbar />
            <i className={"fa fa-bell-o " + style.icos} aria-hidden="true"></i>
            <Profile />
            {/* <img className={style.profile} src={"https://i.pinimg.com/originals/de/64/80/de64801f0275c1ab2ea5a9e2bb3ce7bc.jpg"} /> */}
        </div>
    )
}
