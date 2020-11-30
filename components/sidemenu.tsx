import styels from '../styles/sidemenu.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SideMenu() {
    const router = useRouter()

    return (
        <div className={styels.container}>
            <div className={styels.box}>
                <div>
                    <Link href="/" >
                        <div className={styels.route + (router.pathname == '/' ? " " + styels.active : "")}>
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link href="/tags">
                        <div className={styels.route + (router.pathname == '/tags' ? " " + styels.active : "")}>
                            <span>Tags</span>
                        </div>
                    </Link>
                    <Link href="/peoples">
                        <div className={styels.route + (router.pathname == '/peoples' ? " " + styels.active : "")}>
                            <span>Peoples</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}