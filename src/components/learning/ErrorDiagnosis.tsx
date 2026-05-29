import { useState } from 'react'
import styles from './ErrorDiagnosis.module.css'

interface DiagnosisResult {
  errorType: 'calculation' | 'understanding' | 'method'
  severity: 'low' | 'medium' | 'high'
  description: string
  guidance: string
  relatedConcept: string
  practiceSuggestion: string
}

const errorPatterns: Record<string, DiagnosisResult[]> = {
  'complexity': [
    {
      errorType: 'calculation', severity: 'high',
      description: '时间复杂度计算错误',
      guidance: '复杂度分析的关键是找到基本操作执行次数与输入规模n的关系。常见错误：\n1. 混淆最好/最坏/平均情况\n2. 忽略嵌套循环的乘法关系\n3. 忘记递归的额外开销',
      relatedConcept: '时间复杂度分析',
      practiceSuggestion: '练习分析以下代码的复杂度：单层循环、嵌套循环、二分查找、递归'
    },
    {
      errorType: 'understanding', severity: 'medium',
      description: '混淆O(1)、O(n)、O(logn)的含义',
      guidance: 'O(1)：与n无关，常数时间\nO(n)：与n成正比，线性时间\nO(logn)：每步问题规模减半\nO(nlogn)：n次logn操作\nO(n²)：双层循环',
      relatedConcept: '渐进复杂度',
      practiceSuggestion: '画出各复杂度随n增长的曲线，直观感受差异'
    }
  ],
  'stack-queue': [
    {
      errorType: 'understanding', severity: 'high',
      description: '混淆栈(LIFO)和队列(FIFO)',
      guidance: '栈=一摞盘子，最后放的先取(LIFO)\n队列=排队买票，先来先服务(FIFO)\n\n关键区别：出元素顺序不同\n栈：最后入的最先出\n队列：最先入的最先出',
      relatedConcept: '栈与队列',
      practiceSuggestion: '手动模拟：将1,2,3依次入栈再全部出栈 vs 依次入队再全部出队'
    },
    {
      errorType: 'method', severity: 'high',
      description: 'BFS用栈、DFS用队列（搞反了）',
      guidance: 'BFS=广度优先=逐层扩展=队列(FIFO)\nDFS=深度优先=深入到底=栈(LIFO)\n\n记忆口诀：\nB→广→层→队(Q)\nD→深→底→栈(S)',
      relatedConcept: '图遍历算法',
      practiceSuggestion: '在图可视化页面分别用BFS和DFS遍历，观察访问顺序差异'
    }
  ],
  'pointer': [
    {
      errorType: 'method', severity: 'high',
      description: '链表插入时指针修改顺序错误',
      guidance: '插入节点的正确顺序：\n1. newNode.next = current.next（先连后）\n2. current.next = newNode（再连前）\n\n如果先执行步骤2，current原来的后继就丢失了！\n\n口诀：先连后，再断前',
      relatedConcept: '链表操作',
      practiceSuggestion: '在链表可视化页面练习插入操作，观察指针变化'
    }
  ],
  'recursion': [
    {
      errorType: 'understanding', severity: 'medium',
      description: '不理解递归调用栈的展开过程',
      guidance: '递归的本质：\n1. 每次调用创建新的栈帧\n2. 参数逐层传递直到基线条件\n3. 返回值逐层回传组合结果\n\n理解递归的关键：\n• 相信递归函数能完成子问题\n• 只关注当前层的逻辑\n• 明确基线条件(何时停止)',
      relatedConcept: '递归与调用栈',
      practiceSuggestion: '手动展开递归调用树，跟踪每层的参数和返回值'
    }
  ],
  'bst': [
    {
      errorType: 'understanding', severity: 'medium',
      description: '不理解BST中序遍历=升序序列',
      guidance: 'BST性质：左子树<根<右子树\n中序遍历：左→根→右\n\n所以中序遍历BST时：\n先访问所有比根小的(左子树)\n再访问根\n最后访问所有比根大的(右子树)\n→ 自然得到升序序列！',
      relatedConcept: '二叉搜索树',
      practiceSuggestion: '在树可视化页面插入几个值，然后执行中序遍历观察结果'
    }
  ],
  'sort-stability': [
    {
      errorType: 'calculation', severity: 'medium',
      description: '快排最坏情况复杂度误判',
      guidance: '快排最坏情况O(n²)发生在：\n• 每次选的基准值都是最大/最小值\n• 例如：已排序数组+选首元素作基准\n\n此时分区极度不平衡：\nT(n) = T(n-1) + O(n) = O(n²)\n\n优化：随机选基准或三数取中',
      relatedConcept: '快速排序',
      practiceSuggestion: '在排序可视化页面观察已排序数组用快排的过程'
    }
  ]
}

const errorTypeLabels: Record<string, { icon: string; label: string; color: string }> = {
  calculation: { icon: '🔢', label: '计算错误', color: '#f59e0b' },
  understanding: { icon: '🧠', label: '理解错误', color: '#8b5cf6' },
  method: { icon: '🔧', label: '方法错误', color: '#ef4444' }
}

const severityLabels: Record<string, { label: string; color: string }> = {
  low: { label: '轻微', color: '#10b981' },
  medium: { label: '中等', color: '#f59e0b' },
  high: { label: '严重', color: '#ef4444' }
}

export default function ErrorDiagnosis() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedError, setExpandedError] = useState<number | null>(null)

  const categories = [
    { key: 'complexity', label: '复杂度分析', icon: '📊' },
    { key: 'stack-queue', label: '栈与队列', icon: '📚' },
    { key: 'pointer', label: '指针操作', icon: '🔗' },
    { key: 'recursion', label: '递归理解', icon: '🔄' },
    { key: 'bst', label: '二叉搜索树', icon: '🌳' },
    { key: 'sort-stability', label: '排序算法', icon: '📈' }
  ]

  const errors = selectedCategory ? errorPatterns[selectedCategory] || [] : []

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🔍 错误诊断中心</h3>
      <p className={styles.desc}>选择你遇到困难的领域，查看常见错误类型和针对性指导</p>

      <div className={styles.categoryGrid}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.categoryBtn} ${selectedCategory === cat.key ? styles.categoryBtnActive : ''}`}
            onClick={() => { setSelectedCategory(cat.key); setExpandedError(null) }}
          >
            <span className={styles.catIcon}>{cat.icon}</span>
            <span className={styles.catLabel}>{cat.label}</span>
          </button>
        ))}
      </div>

      {selectedCategory && errors.length > 0 && (
        <div className={styles.errorList}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorCard}>
              <button
                className={styles.errorHeader}
                onClick={() => setExpandedError(expandedError === index ? null : index)}
              >
                <div className={styles.errorMeta}>
                  <span className={styles.errorType} style={{ color: errorTypeLabels[error.errorType].color }}>
                    {errorTypeLabels[error.errorType].icon} {errorTypeLabels[error.errorType].label}
                  </span>
                  <span className={styles.severity} style={{ color: severityLabels[error.severity].color }}>
                    {severityLabels[error.severity].label}
                  </span>
                </div>
                <h4 className={styles.errorDesc}>{error.description}</h4>
                <span className={styles.expandIcon}>{expandedError === index ? '▲' : '▼'}</span>
              </button>

              {expandedError === index && (
                <div className={styles.errorBody}>
                  <div className={styles.guidance}>
                    <h5>💡 纠正指导</h5>
                    <div className={styles.guidanceText}>
                      {error.guidance.split('\n').map((line, i) => (
                        <div key={i}>{line || <br />}</div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.relatedConcept}>
                    <h5>📚 相关概念</h5>
                    <span>{error.relatedConcept}</span>
                  </div>
                  <div className={styles.practice}>
                    <h5>🎯 练习建议</h5>
                    <span>{error.practiceSuggestion}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
