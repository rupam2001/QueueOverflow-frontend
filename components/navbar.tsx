import style from '../styles/Layout.module.css'
import Link from 'next/link'
export default function NavBar() {
    return (
        <div className={style.navbar}>
            <Link href="/">
                <span className={style.title}>Q-Overflow</span>
            </Link>
            <input className={style.searchInput} placeholder="search" />
            <i className={"fa fa-bell-o " + style.icos} aria-hidden="true"></i>
            <img className={style.profile} src={"https://i.pinimg.com/originals/de/64/80/de64801f0275c1ab2ea5a9e2bb3ce7bc.jpg"} />
        </div>
    )
}