import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import { Button } from './stateless/stateless'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()

    const handleAskQuestion = () => {
        router.push("/create")
    }

    return (
        <Layout>
            <div>
                <div className={styles.head}>
                    <h4>Top questions</h4>
                    <Button text="Ask a question" onclickCallBack={handleAskQuestion} />
                </div>
            </div>
        </Layout>
    )
}