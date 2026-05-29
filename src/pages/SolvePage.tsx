import { Link } from 'react-router-dom'
import ProblemSolver from '../components/learning/ProblemSolver'
import styles from './SolvePage.module.css'

export default function SolvePage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>问题求解</span>
        </div>
        <h1 className={styles.title}>问题求解步骤可视化</h1>
        <p className={styles.subtitle}>以流程图形式展示解题思路和步骤，培养系统化的问题求解能力</p>
      </div>

      <ProblemSolver />
    </div>
  )
}
