import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import { Button } from './stateless/stateless'
import { useRouter } from 'next/router'
import MarkDown from './markdown'
import { useEffect, useState } from 'react'
import { getDrafts } from './draftPanel'

export default function Home() {
    const router = useRouter()

    const handleAskQuestion = () => {
        router.push("/create")
    }

    const [text, setText] = useState('');
    useEffect(() => {
        let drf = getDrafts({ name: 'some' })[0];
        setText(drf.title + drf.body)
    }, [])

    return (
        <Layout>
            <div>
                <div className={styles.head}>
                    <h4>Top questions</h4>
                    <Button text="Ask a question" onclickCallBack={handleAskQuestion} />
                </div>
                <div className="cr-preview-2" style={{ height: 'fit-content', padding: '0.5rem' }}>
                    <MarkDown markdownText={text} key="ene" />
                </div>
            </div>
        </Layout>
    )
}