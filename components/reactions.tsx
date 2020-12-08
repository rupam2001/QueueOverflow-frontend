import styles from '../styles/Layout.module.css'
export default function Reactions() {
    return (
        <div className={styles.reactionContainer}>
            <div className={styles.eachReaction}>
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </div>
            <div className={styles.eachReaction}>
                <span>12</span>
            </div>
            <div className={styles.eachReaction}>
                <i className="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
        </div>
    )
}