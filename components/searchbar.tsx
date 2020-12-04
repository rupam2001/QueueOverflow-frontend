import { useEffect, useRef, useState } from 'react'
import style from '../styles/Layout.module.css'
import { NoSearchResImg } from '../utils/constanse'
import { searchRemoteAsync } from '../utils/globalapicalls'
import { progressBarRef } from './refs'
import moment from 'moment'
import { useRouter } from 'next/router'

interface searchDataTypes {
    _id: string,
    title: string,
    time: Date
    //other stuffs
}

export default function Searchbar() {
    const searchResultDropDownRef = useRef(null)

    const [searchData, setSearchData] = useState<Array<searchDataTypes>>([])

    const [skip, setSkip] = useState(0)

    const router = useRouter()

    // useEffect(() => {
    //     var elem = document.getElementById('mdbox');
    //     elem.scrollTop = elem.scrollHeight;
    // }, [markdownText])

    // useEffect(()=>{
    //     $(window).on('scroll', function() { 
    //         if ($(window).scrollTop() >= $( 
    //           '.div').offset().top + $('.div'). 
    //             outerHeight() - window.innerHeight) { 

    //             alert('You reached the end of the DIV'); 
    //         } 
    //     }); 
    // })

    const handleSearch = (e) => {
        let item = e.target.value
        if (e.key === 'Enter' || e.keyCode === 13) {
            //validate 
            if (item.length === 0) return
            //search
            progressBarRef.current.staticStart()
            searchRemoteAsync(item, skip, 10)
                .then(questions => {
                    searchResultDropDownRef.current.style.display = 'block'
                    setSearchData(questions)
                    progressBarRef.current.complete()
                })
                .catch(err => {
                    alert("er")
                    searchResultDropDownRef.current.style.display = 'block'
                    progressBarRef.current.complete();
                    setSearchData([]);
                })
        }
    }
    useEffect(() => {
        const fn = (e) => {
            if (e.target.id !== 'myDropdown' && e.target.id !== "ignore") {
                searchResultDropDownRef.current.style.display = 'none'
            }
        }
        window.addEventListener("mousedown", fn)

        return () => {
            window.removeEventListener("mousedown", fn)
        }
    }, [])




    const handleItemClick = (item) => {
        // alert("clicked")
        router.push("/posts/questions/" + item._id)
    }
    const handelScorll = (e) => {
        // console.log(e)
        // if (e.target.scrollTop() + e.target.innerHeight() >= e.target.scrollHeight) {
        //     alert("reached")
        // }
    }

    return (
        <div className="dropdown">
            <input className={style.searchInput} placeholder="search by title or tags or both" onKeyUp={handleSearch} />
            <div id="myDropdown" onScroll={handelScorll} className={"dropdown-content " + style.searchDropDown} ref={searchResultDropDownRef}>
                {
                    searchData.map(each => (
                        <div className="dd-item" key={each._id} onClick={() => { handleItemClick(each) }} id="ignore">
                            <div className={style.searchItemHead} id="ignore">
                                <span id="ignore">{moment(each.time).calendar()}</span>
                            </div>
                            <span id="ignore">
                                {each.title.substring(2)}
                            </span>
                        </div>
                    ))
                }
                {
                    searchData.length === 0 && <img
                        src={NoSearchResImg} style={{ width: '100%', }}
                    />
                }


            </div>
        </div>
    )
}
