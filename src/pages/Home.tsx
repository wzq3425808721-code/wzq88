import { Link } from 'react-router-dom'
import { dsaKnowledgeMap, categoryLabels, categoryColors } from '../data/knowledgeMap'
import styles from './Home.module.css'

const categories = Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>

export default function Home() {
  const groupedByCategory = categories.map(cat => ({
    key: cat,
    label: categoryLabels[cat],
    color: categoryColors[cat],
    nodes: dsaKnowledgeMap.filter(n => n.category === cat).sort((a, b) => a.level - b.level)
  }))

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            建立直觉，理解算法，<br />掌握数据结构
          </h1>
          <p className={styles.heroSub}>
            通过交互式可视化，将抽象的数据结构与算法概念转化为直观的图形体验
          </p>
          <div className={styles.heroActions}>
            <Link to="/learn" className={styles.heroBtnPrimary}>
              🚀 开始学习
            </Link>
            <Link to="/sort/bubble" className={styles.heroBtnGhost}>
              🔬 探索可视化
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{dsaKnowledgeMap.length}</span>
              <span className={styles.statLabel}>知识节点</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{categories.length}</span>
              <span className={styles.statLabel}>知识类别</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>难度等级</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.knowledgeGraph}>
        <h2 className={styles.sectionTitle}>知识图谱</h2>
        <p className={styles.sectionDesc}>从基础到进阶，按类别探索数据结构与算法的核心概念</p>
        
        <div className={styles.categoryGrid}>
          {groupedByCategory.map(category => (
            <div key={category.key} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <div
                  className={styles.categoryDot}
                  style={{ background: category.color }}
                />
                <h3 className={styles.categoryName}>{category.label}</h3>
                <span className={styles.categoryCount}>{category.nodes.length}</span>
              </div>
              <div className={styles.nodeList}>
                {category.nodes.map(node => (
                  <Link
                    key={node.id}
                    to={node.path}
                    className={styles.nodeCard}
                    style={{
                      borderLeftColor: category.color,
                      '--node-color': category.color
                    } as React.CSSProperties}
                  >
                    <div className={styles.nodeHeader}>
                      <span className={styles.nodeLabel}>{node.label}</span>
                      <span
                        className={styles.nodeLevel}
                        style={{ background: `${category.color}20`, color: category.color }}
                      >
                        Lv{node.level}
                      </span>
                    </div>
                    <p className={styles.nodeDesc}>{node.description}</p>
                    {node.prerequisites.length > 0 && (
                      <div className={styles.nodePrereqs}>
                        <span className={styles.prereqLabel}>前置：</span>
                        {node.prerequisites.map(p => {
                          const prereqNode = dsaKnowledgeMap.find(n => n.id === p)
                          return (
                            <span key={p} className={styles.prereqTag}>
                              {prereqNode?.label || p}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>核心特性</h2>
        <div className={styles.featureGrid}>
          <Link to="/learn" className={styles.featureCard} style={{ textDecoration: 'none' }}>
            <div className={styles.featureIcon} style={{ background: 'rgba(59,130,246,0.15)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>学习闭环</h3>
            <p>输入→讲解→尝试→反馈→强化，完整的个性化学习链路</p>
          </Link>
          <Link to="/solve" className={styles.featureCard} style={{ textDecoration: 'none' }}>
            <div className={styles.featureIcon} style={{ background: 'rgba(16,185,129,0.15)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>问题求解</h3>
            <p>流程图式解题思路展示，培养系统化的问题求解能力</p>
          </Link>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'rgba(245,158,11,0.15)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
                <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/>
              </svg>
            </div>
            <h3>AI学习助手</h3>
            <p>多角色AI陪伴学习：讲解者、提问者、纠错者、规划者</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'rgba(139,92,246,0.15)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3>错误诊断</h3>
            <p>智能识别计算错误、理解错误和方法错误，精准反馈</p>
          </div>
        </div>
      </section>
    </div>
  )
}
