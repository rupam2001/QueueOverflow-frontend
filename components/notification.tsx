import { useContext, useEffect, useReducer, useRef } from 'react'
import { AuthContext } from '../context/authcontext'
import style from '../styles/Layout.module.css'
export default function Notification() {
    const ref = useRef(null)
    const authContext = useContext(AuthContext)

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


    return (
        <div className="dropdown">
            <i className={"fa fa-bell-o " + style.icos} aria-hidden="true" onClick={handleOpen}></i>
            <div className='dropdown-content' style={{ right: 0 }} ref={ref} id="myDropdown">
                <div className="dd-item" id="myDropdown" onClick={() => { }}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Somtihing</span>
                </div>
            </div>
        </div>
    )
}