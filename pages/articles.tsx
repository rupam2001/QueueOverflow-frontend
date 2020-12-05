import Layout from '../components/layout'
import { Button } from '../components/stateless/stateless'
import styles from '../styles/Home.module.scss'
import router from 'next/router'

export default function Articles() {
    const handleWriteArticle = () => {
        router.push("/create_article")
    }
    return (
        <Layout>
            <div>
                <div className={styles.head}>
                    <h4>Top Articles</h4>
                    <Button text="Write an Article" onclickCallBack={handleWriteArticle} buttonStyle={{ backgroundColor: '#7bc043' }} />
                </div>
            </div>
        </Layout>
    )
}
