import { Link } from 'react-router-dom'
import LearningLoop from '../components/learning/LearningLoop'
import ErrorDiagnosis from '../components/learning/ErrorDiagnosis'
import styles from './LearnPage.module.css'

export default function LearnPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>学习闭环</span>
        </div>
        <h1 className={styles.title}>学习闭环系统</h1>
        <p className={styles.subtitle}>输入 → 讲解 → 尝试 → 反馈 → 强化，完整的个性化学习链路</p>
      </div>

      <LearningLoop />

      <div style={{ marginTop: '32px' }}>
        <ErrorDiagnosis />
      </div>
    </div>
  )
}
