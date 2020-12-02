import { useEffect, useRef, useState } from 'react'
import style from '../styles/Layout.module.css'
import { NoSearchResImg } from '../utils/constanse'
import { progressBarRef } from './refs'

interface searchDataTypes {
    _id: string,
    title: string
    //other stuffs
}

export default function Searchbar() {
    const searchResultDropDownRef = useRef(null)

    const [searchData, setSearchData] = useState<Array<searchDataTypes>>([])

    const handleSearch = (e) => {
        let item = e.target.value
        if (e.key === 'Enter' || e.keyCode === 13) {
            //validate 
            if (item.length === 0) return
            //search
            progressBarRef.current.staticStart()
            searchRemoteAsync(item)
                .then(res => {
                    searchResultDropDownRef.current.style.display = 'block'
                    progressBarRef.current.complete()
                })
                .catch(err => { })
        }
    }
    useEffect(() => {
        const fn = (e) => {
            if (e.target.id !== 'myDropdown' && !e.target.classList.contains('dd-item')) {
                searchResultDropDownRef.current.style.display = 'none'
            }
        }
        window.addEventListener("mousedown", fn)

        return () => {
            window.removeEventListener("mousedown", fn)
        }
    }, [])
    return (
        <div className="dropdown">
            <input className={style.searchInput} placeholder="search" onKeyUp={handleSearch} />
            <div id="myDropdown" className="dropdown-content" ref={searchResultDropDownRef}>
                {
                    searchData.map(each => (
                        <div className="dd-item" key={each._id}>
                            {each.title}
                        </div>
                    ))
                }
                {
                    searchData.length === 0 && <img
                        src={NoSearchResImg} style={{ maxWidth: '100%' }}
                    />
                }

            </div>
        </div>
    )
}
const searchRemoteAsync = async (item: string) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve()
        }, 200)
    })
}