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
const getAnswers = async (slug: string) => {
    try {
        const { anss } = await fetch(ENDPOINT + "/question/q/ans/" + slug, { method: "GET", headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
        return anss
    } catch (e) {
        return [] //dont throw error
    }
}


export const getStaticProps = async ({ params }) => {
    try {

        const res = await getQuestion(params.slug)
        // console.log(res.question.author_id, ".>.")
        const anss = await getAnswers(params.slug)

        return {
            props: { res, anss },
            revalidate: 60 * 60 * 3  //3mins
        }
    } catch (e) {
        // throw e
        return {
            redirect: {
                destination: '/404',
                permanent: false,

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
                <hr />
                <div className="others-anss-box">
                    <div className="others-anss-header">
                        <span>~Answers</span>
                        <p>{props.anss.length}</p>
                    </div>

                    {
                        props.anss.map(eachAns => (
                            <div>
                                <div className="profile-pic">
                                    <img src={eachAns.author_id.profile_pic} />
                                    <span>{eachAns.author_id.name}</span>
                                    <p>{moment(eachAns.time).calendar()}</p>
                                </div>
                                <MarkDown markdownText={eachAns.body} />
                            </div>
                        ))
                    }
                </div>
                <hr />
                <div>
                    <h4>Add your answer</h4>
                </div>
                <div className="ans-box">
                    <Answer />
                </div>
            </div>
        </Layout>
    )
}

export default Questions