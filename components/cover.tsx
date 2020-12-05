import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authcontext"
import { coverPhotoPlacHolder, profilePicPlaceHolder } from "../utils/constanse"
import { calcArticleReadTime } from "../utils/helpers"

interface propTypes {
    coverPhotoUrl: string,
    profile_pic?: string,
    article?: string
}

const Cover = (props: propTypes) => {
    const authContext = useContext(AuthContext)
    const [profile_pic, setProfile_pic] = useState(props.profile_pic || authContext.AuthRespObj.profile_pic || profilePicPlaceHolder)
    useEffect(() => {
        setProfile_pic(props.profile_pic || authContext.AuthRespObj.profile_pic || profilePicPlaceHolder)
    }, [authContext])

    const [article, setArticle] = useState(props.article || null)
    useEffect(() => {
        setArticle(props.article)
    }, [props.article])

    return (
        <div>
            <div className="cover-photo-wrapper">
                <img src={props.coverPhotoUrl || coverPhotoPlacHolder} className="cover-main" />
                <div className="cover-pf-wrapper">
                    <img src={profile_pic} className="cover-profile" />
                    <p>{authContext.AuthRespObj.name}</p>
                </div>
                <p className="cover-read-time">
                    {article && "~" + calcArticleReadTime(article)}
                </p>
            </div>
        </div>
    )
}

export default Cover