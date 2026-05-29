import styles from './PageSkeleton.module.css'

export default function PageSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={`${styles.shimmer} ${styles.breadcrumb}`} />
        <div className={`${styles.shimmer} ${styles.title}`} />
        <div className={`${styles.shimmer} ${styles.subtitle}`} />
      </div>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={`${styles.shimmer} ${styles.panel}`} />
          <div className={`${styles.shimmer} ${styles.canvas}`} />
        </div>
        <div className={styles.sidebar}>
          <div className={`${styles.shimmer} ${styles.card}`} />
          <div className={`${styles.shimmer} ${styles.card}`} />
        </div>
      </div>
    </div>
  )
}
