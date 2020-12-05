import { ENDPOINT } from "../../../utils/constanse"
import router, { useRouter } from 'next/router'
import Layout from "../../../components/layout"
import MarkDown from "../../../components/markdown"
import { useEffect, useState } from "react"
import Loader from 'react-loader-spinner'
import moment from 'moment'
import Answer from "../../../components/answer"
const getQuestion = async (slug: string) => {
    try {

        const res = await fetch(ENDPOINT + "/question/q/" + slug, { method: "GET", headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
        return res
    } catch (e) {
        throw e
    }
}


export const getStaticProps = async ({ params }) => {
    try {

        const res = await getQuestion(params.slug)
        // console.log(res.question.author_id, ".>.")

        return {
            props: { res }
        }
    } catch (e) {
        // throw e
        return {
            redirect: {
                destination: '/404',
                permanent: false,
                revalidate: 60 * 60 * 30  //30mins
            },
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true,


    }
}


const Questions = (props) => {

    const router = useRouter()




    if (router.isFallback) {
        return (
            <Layout>
                <div className="loading">
                    <Loader
                        type="Oval"
                        color="grey"
                        height={50}
                        width={50}
                    // timeout={3000} //3 secs
                    />
                </div>
            </Layout>
        )
    }
    return (
        <Layout>
            <div className="profile-pic">
                <img src={props.res.question.author_id.profile_pic} />
                <span>{props.res.question.author_id.name}</span>
                <p>{moment(props.res.question.time).calendar()}</p>
            </div>
            <div className="cr-preview-2" style={{ height: 'fit-content', padding: '0.5rem', zoom: 0.9, paddingLeft: '5rem' }}>
                <MarkDown
                    markdownText={props.res.question.title + "\n" + props.res.question.body}
                />
                <Answer />
            </div>
        </Layout>
    )
}

export default Questions